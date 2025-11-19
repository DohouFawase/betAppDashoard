"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender, SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { ArrowUpDown, Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Type pour les utilisateurs dans le tableau
export type UserForTable = {
  id: string
  email: string | null
  phone: string | null
  firstName: string | null
  lastName: string | null
  role: { name: string }
  kycStatus: string
  isActive: boolean
  createdAt: Date
}

// Définition des colonnes améliorées
export const columns: ColumnDef<UserForTable>[] = [
  {
    accessorFn: (row) => `${row.firstName || ''} ${row.lastName || ''}`,
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
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email") || "-",
  },
  {
    accessorKey: "phone",
    header: "Numéro de Tél.",
    cell: ({ row }) => row.getValue("phone") || "-",
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => {
      const role = row.getValue("role") as { name: string }
      return role.name
    },
  },
  {
    accessorKey: "kycStatus",
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
  },
  {
    accessorKey: "isActive",
    header: "Actif",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Actif" : "Inactif"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Inscription",
    cell: ({ row }) => {
      const date = row.getValue("createdAt")
      if (date instanceof Date) {
        return new Date(date).toLocaleDateString('fr-FR')
      }
      return "N/A"
    }
  },
  {
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
  },
]

// Données mock pour tester le tableau
export const mockUsers: UserForTable[] = [
  {
    id: "1",
    email: "jean.dupont@example.com",
    phone: "+229 97 12 34 56",
    firstName: "Jean",
    lastName: "Dupont",
    role: { name: "Administrateur" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-01-15")
  },
  {
    id: "2",
    email: "marie.kouassi@example.com",
    phone: "+229 96 23 45 67",
    firstName: "Marie",
    lastName: "Kouassi",
    role: { name: "Utilisateur" },
    kycStatus: "pending",
    isActive: true,
    createdAt: new Date("2024-02-20")
  },
  {
    id: "3",
    email: "pierre.agbo@example.com",
    phone: "+229 95 34 56 78",
    firstName: "Pierre",
    lastName: "Agbo",
    role: { name: "Modérateur" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-03-10")
  },
  {
    id: "4",
    email: "fatima.diallo@example.com",
    phone: null,
    firstName: "Fatima",
    lastName: "Diallo",
    role: { name: "Utilisateur" },
    kycStatus: "rejected",
    isActive: false,
    createdAt: new Date("2024-04-05")
  },
  {
    id: "5",
    email: null,
    phone: "+229 94 45 67 89",
    firstName: "Ahmed",
    lastName: "Bello",
    role: { name: "Utilisateur" },
    kycStatus: "pending",
    isActive: true,
    createdAt: new Date("2024-05-12")
  },
  {
    id: "6",
    email: "sophie.martin@example.com",
    phone: "+229 93 56 78 90",
    firstName: "Sophie",
    lastName: "Martin",
    role: { name: "Gestionnaire" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-06-18")
  },
  {
    id: "7",
    email: "yao.kouame@example.com",
    phone: "+229 92 67 89 01",
    firstName: null,
    lastName: "Kouamé",
    role: { name: "Utilisateur" },
    kycStatus: "pending",
    isActive: true,
    createdAt: new Date("2024-07-22")
  },
  {
    id: "8",
    email: "aminata.sow@example.com",
    phone: "+229 91 78 90 12",
    firstName: "Aminata",
    lastName: "Sow",
    role: { name: "Administrateur" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-08-30")
  },
  {
    id: "9",
    email: "kevin.dossa@example.com",
    phone: null,
    firstName: "Kevin",
    lastName: "Dossa",
    role: { name: "Utilisateur" },
    kycStatus: "rejected",
    isActive: false,
    createdAt: new Date("2024-09-14")
  },
  {
    id: "10",
    email: "grace.adjovi@example.com",
    phone: "+229 90 89 01 23",
    firstName: "Grace",
    lastName: "Adjovi",
    role: { name: "Modérateur" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-10-08")
  },
  {
    id: "11",
    email: "david.tognon@example.com",
    phone: "+229 97 90 12 34",
    firstName: "David",
    lastName: null,
    role: { name: "Utilisateur" },
    kycStatus: "pending",
    isActive: true,
    createdAt: new Date("2024-11-01")
  },
  {
    id: "12",
    email: null,
    phone: null,
    firstName: "Isabelle",
    lastName: "Koko",
    role: { name: "Utilisateur" },
    kycStatus: "rejected",
    isActive: false,
    createdAt: new Date("2024-11-15")
  }
]

// Composant DataTable avec filtres et pagination
interface DataTableProps {
  columns: ColumnDef<UserForTable>[]
  data: UserForTable[]
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedKyc, setSelectedKyc] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Filtrer les données selon les critères
  const filteredData = data.filter((user) => {
    // Filtre par date
    if (dateFrom) {
      const userDate = new Date(user.createdAt)
      const fromDate = new Date(dateFrom)
      if (userDate < fromDate) return false
    }
    if (dateTo) {
      const userDate = new Date(user.createdAt)
      const toDate = new Date(dateTo)
      toDate.setHours(23, 59, 59, 999)
      if (userDate > toDate) return false
    }

    // Filtre par rôle
    if (selectedRole !== "all" && user.role.name !== selectedRole) return false

    // Filtre par statut KYC
    if (selectedKyc !== "all" && user.kycStatus.toLowerCase() !== selectedKyc.toLowerCase()) return false

    // Filtre par statut actif
    if (selectedStatus === "active" && !user.isActive) return false
    if (selectedStatus === "inactive" && user.isActive) return false

    return true
  })

  const table = useReactTable({
    data: filteredData,
    columns,
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
  })

  // Extraire les rôles uniques
  const uniqueRoles = Array.from(new Set(data.map(u => u.role.name)))

  return (
    <div className="space-y-4">
      {/* Section des filtres */}
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
            {filteredData.length} utilisateur{filteredData.length > 1 ? 's' : ''} trouvé{filteredData.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Tableau */}
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

        {/* Pagination */}
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