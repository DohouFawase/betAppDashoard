"use client"

import { useState, useEffect, useMemo } from "react"
import { ColumnDef, FilterFn } from "@tanstack/react-table" // Import de FilterFn
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender, SortingState, ColumnFiltersState, createColumnHelper } from "@tanstack/react-table"
import { ArrowUpDown, Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// ... (Les types UserForTable, columns, et mockUsers restent les mêmes) ...

// **********************************************
// * NOUVELLES FONCTIONS DE FILTRAGE PERSONNALISÉES
// **********************************************

// Fonction de filtre pour la date de début (from)
const dateFromFilterFn: FilterFn<any> = (row, columnId, value) => {
  if (!value) return true; // Pas de filtre si la valeur est vide
  const userDate = new Date(row.getValue(columnId));
  const fromDate = new Date(value);
  return userDate >= fromDate;
};

// Fonction de filtre pour la date de fin (to)
const dateToFilterFn: FilterFn<any> = (row, columnId, value) => {
  if (!value) return true; // Pas de filtre si la valeur est vide
  const userDate = new Date(row.getValue(columnId));
  const toDate = new Date(value);
  // Pour inclure toute la journée, on met l'heure à 23:59:59.999
  toDate.setHours(23, 59, 59, 999); 
  return userDate <= toDate;
};

// Définir les noms d'alias pour les fonctions de filtre
// pour qu'elles soient disponibles dans useReactTable
declare module "@tanstack/react-table" {
  interface FilterFns {
    dateFrom: typeof dateFromFilterFn
    dateTo: typeof dateToFilterFn
  }
  interface ColumnFiltersState {
    push: any
    dateFrom?: string;
    dateTo?: string;
  }
}

// **********************************************
// * DÉFINITION DES COLONNES AVEC FILTRES PERSONNALISÉS
// **********************************************
// * NOTE : J'ai gardé la structure de vos colonnes mais ajouté les 'filterFn'
// * et marqué 'createdAt' comme pouvant être filtré.
// **********************************************

// Créer un helper pour la définition des colonnes (utile avec les custom filters)
const columnHelper = createColumnHelper<UserForTable>();

export const columns: ColumnDef<UserForTable>[] = [
  // Colonne Nom & Prénoms (Reste inchangée, utilise accessorFn et est filtrable globalement)
  columnHelper.accessor((row) => `${row.firstName || ''} ${row.lastName || ''}`, {
    id: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom & Prénoms
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const firstName = row.original.firstName || "-"
      const lastName = row.original.lastName || "-"
      return `${firstName} ${lastName}`
    },
  }),
  // Colonnes Email, Téléphone (Restent inchangées)
  columnHelper.accessor("email", { header: "Email", cell: ({ row }) => row.getValue("email") || "-" }),
  columnHelper.accessor("phone", { header: "Numéro de Tél.", cell: ({ row }) => row.getValue("phone") || "-" }),
  
  // Colonne Rôle (Ajout de 'enableColumnFilter: true' pour le filtre select)
  columnHelper.accessor("role", {
    header: "Rôle",
    cell: ({ row }) => {
      const role = row.getValue("role") as { name: string }
      return role.name
    },
    filterFn: "equalsString", // Utiliser un filtre d'égalité standard
  }),
  
  // Colonne Statut KYC (Ajout de 'enableColumnFilter: true' pour le filtre select)
  columnHelper.accessor("kycStatus", {
    header: "Statut KYC",
    cell: ({ row }) => {
      const status = row.getValue("kycStatus") as string
      const variant = 
        status === "APPROVED" || status === "approved" ? "default" : 
        status === "PENDING" || status === "pending" ? "secondary" : 
        "destructive"
      return (
        <Badge variant={variant} className="capitalize">
          {status.toLowerCase()}
        </Badge>
      )
    },
    filterFn: "equalsString", // Utiliser un filtre d'égalité standard
  }),
  
  // Colonne Actif (Ajout de 'enableColumnFilter: true' pour le filtre select)
  columnHelper.accessor("isActive", {
    header: "Actif",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Actif" : "Inactif"}
        </Badge>
      )
    },
    filterFn: "equals", // Utiliser un filtre d'égalité pour les booléens
  }),
  
  // Colonne Inscription/createdAt (Utilise les fonctions de filtre par date)
  columnHelper.accessor("createdAt", {
    header: "Inscription",
    cell: ({ row }) => {
      const date = row.getValue("createdAt")
      if (date instanceof Date) {
        return new Date(date).toLocaleDateString('fr-FR')
      }
      return "N/A"
    },
    // On n'ajoute pas de filterFn ici, car on gère cela avec les IDs 'dateFrom' et 'dateTo'
    // dans useReactTable, ciblant cette colonne.
  }),
  
  // Colonne Actions (Reste inchangée)
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => console.log('Modifier user:', row.original.id)}
        >
          Modifier
        </Button>
      )
    },
  }),
];

// **********************************************
// * COMPOSANT DATATABLE MIS À JOUR
// **********************************************

interface DataTableProps {
  columns: ColumnDef<UserForTable>[]
  data: UserForTable[]
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  
  // Ces états locaux deviennent des "proxies" pour mettre à jour `columnFilters`
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedKyc, setSelectedKyc] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Met à jour columnFilters lorsque les états locaux changent (le cœur de l'optimisation)
  useEffect(() => {
    const newFilters: ColumnFiltersState = [];

    // Filtre par date de début
    if (dateFrom) {
        newFilters.push({ id: "createdAt", value: dateFrom, filterFn: "dateFrom" });
    }
    // Filtre par date de fin
    if (dateTo) {
        newFilters.push({ id: "createdAt", value: dateTo, filterFn: "dateTo" });
    }
    // Filtre par rôle
    if (selectedRole !== "all") {
        // La colonne role a un accesseur d'objet, on filtre sur role.name
        newFilters.push({ id: "role", value: { name: selectedRole } });
    }
    // Filtre par statut KYC
    if (selectedKyc !== "all") {
        newFilters.push({ id: "kycStatus", value: selectedKyc });
    }
    // Filtre par statut actif
    if (selectedStatus === "active") {
        newFilters.push({ id: "isActive", value: true });
    } else if (selectedStatus === "inactive") {
        newFilters.push({ id: "isActive", value: false });
    }

    setColumnFilters(newFilters);
  }, [dateFrom, dateTo, selectedRole, selectedKyc, selectedStatus]);


  // TanStack Table utilise maintenant l'intégralité des données et gère tous les filtres
  const table = useReactTable({
    data, // On passe directement 'data' (non filtré manuellement)
    columns,
    // Ajout des fonctions de filtre personnalisées
    filterFns: {
        dateFrom: dateFromFilterFn,
        dateTo: dateToFilterFn,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
    // Global filter recherche sur toutes les colonnes par défaut
    globalFilterFn: "includesString", 
  });
  
  // Extraire les rôles uniques (peut être mis en useMemo si 'data' est très grand et change souvent)
  const uniqueRoles = useMemo(() => 
    Array.from(new Set(data.map(u => u.role.name))), 
    [data]
  );
  
  // Utiliser table.getFilteredRowModel().rows.length pour le nombre d'utilisateurs
  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="space-y-4">
      {/* Section des filtres (Le JSX reste pratiquement identique) */}
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <h3 className="font-semibold text-lg mb-3">Filtres</h3>
        
        {/* Recherche globale */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, email, téléphone..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtres en ligne */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Date de début */}
          <div>
            <label className="text-sm font-medium mb-1 block">Date de début</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Date de fin */}
          <div>
            <label className="text-sm font-medium mb-1 block">Date de fin</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtre par rôle */}
          <div>
            <label className="text-sm font-medium mb-1 block">Rôle</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les rôles</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Filtre par statut KYC */}
          <div>
            <label className="text-sm font-medium mb-1 block">Statut KYC</label>
            <select
              value={selectedKyc}
              onChange={(e) => setSelectedKyc(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous</option>
              <option value="approved">Approuvé</option>
              <option value="pending">En attente</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>

          {/* Filtre par statut actif */}
          <div>
            <label className="text-sm font-medium mb-1 block">Statut</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>

        {/* Bouton réinitialiser */}
        <Button
          variant="outline"
          onClick={() => {
            setGlobalFilter("")
            setDateFrom("")
            setDateTo("")
            setSelectedRole("all")
            setSelectedKyc("all")
            setSelectedStatus("all")
            // setColumnFilters([]) // Non nécessaire si les états locaux se réinitialisent à "all" ou ""
          }}
          className="w-full md:w-auto"
        >
          Réinitialiser les filtres
        </Button>
      </div>
      
      {/* Résultats */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <p className="text-sm text-gray-600">
            {filteredCount} utilisateur{filteredCount > 1 ? 's' : ''} trouvé{filteredCount > 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Tableau (Reste inchangé) */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center text-gray-500">
                    Aucun résultat trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (Reste inchangée) */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-600">
            Page {table.getState().pagination.pageIndex + 1} sur{" "}
            {table.getPageCount()}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}