"use client"

import { useState } from "react"
import { 
    ColumnDef, 
    useReactTable, 
    getCoreRowModel, 
    getFilteredRowModel, 
    getSortedRowModel, 
    getPaginationRowModel, 
    getGroupedRowModel, 
    getExpandedRowModel, 
    flexRender, 
    SortingState, 
    ColumnFiltersState 
} from "@tanstack/react-table"

// Assurez-vous que ces composants Shadcn/ui sont installés dans votre projet
import { ArrowUpDown, Eye, Search, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu" 

// ====================================================================
// 1. TYPES NÉCESSAIRES (Équivalent de votre "@/types/type")
// ====================================================================

export type PlayerStatsDetail = {
    matchesPlayed: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    shotsTotal: number;
    shotsOnTarget: number;
    passCompletionRate: number;
}

export type PlayerInTeamDetail = {
    id: string;
    firstName: string | null;
    lastName: string | null;
    position: string | null;
    jerseyNumber: number | null;
    isActive: boolean;
    stats: PlayerStatsDetail; 
}

export type TeamForTable = {
    id: string
    name: string
    logoUrl: string | null
    country: string; // Champ clé pour le regroupement
    league: {
      id: string
      name: string
      sport: { name: string }
    }
    playersCount: number
}

// ====================================================================
// 2. DONNÉES MOCK AFRICAINES ÉTENDUES
// ====================================================================

export const mockTeams: TeamForTable[] = [
    // 🇧🇯 BÉNIN
    { id: "t1", name: "Dragons de Cotonou", logoUrl: null, country: "Bénin", league: { id: "l1", name: "Ligue 1 Bénin", sport: { name: "Football" } }, playersCount: 25 },
    { id: "t2", name: "Requins de l'Atlantique", logoUrl: null, country: "Bénin", league: { id: "l1", name: "Ligue 1 Bénin", sport: { name: "Football" } }, playersCount: 22 },
    
    // 🇲🇦 MAROC
    { id: "t10", name: "Raja Casablanca", logoUrl: "https://example.com/rca.png", country: "Maroc", league: { id: "l10", name: "Botola Pro", sport: { name: "Football" } }, playersCount: 28 },
    { id: "t11", name: "Wydad AC", logoUrl: "https://example.com/wac.png", country: "Maroc", league: { id: "l10", name: "Botola Pro", sport: { name: "Football" } }, playersCount: 27 },

    // 🇪🇬 ÉGYPTE
    { id: "t20", name: "Al Ahly SC", logoUrl: "https://example.com/alahly.png", country: "Égypte", league: { id: "l20", name: "Premier League Ég.", sport: { name: "Football" } }, playersCount: 30 },
    { id: "t21", name: "Zamalek SC", logoUrl: "https://example.com/zamalek.png", country: "Égypte", league: { id: "l20", name: "Premier League Ég.", sport: { name: "Football" } }, playersCount: 29 },

    // 🇳🇬 NIGERIA
    { id: "t30", name: "Enyimba FC", logoUrl: "https://example.com/enyimba.png", country: "Nigéria", league: { id: "l30", name: "NPFL", sport: { name: "Football" } }, playersCount: 26 },
    
    // 🇿🇦 AFRIQUE DU SUD
    { id: "t40", name: "Kaizer Chiefs", logoUrl: "https://example.com/kaizer.png", country: "Afrique du Sud", league: { id: "l40", name: "DStv Premiership", sport: { name: "Football" } }, playersCount: 32 },
    
    // 🇨🇮 CÔTE D'IVOIRE
    { id: "t50", name: "ASEC Mimosas", logoUrl: "https://example.com/asec.png", country: "Côte d'Ivoire", league: { id: "l50", name: "Ligue 1 Ivoirienne", sport: { name: "Football" } }, playersCount: 27 },

    // 🇹🇳 TUNISIE
    { id: "t60", name: "Espérance Tunis", logoUrl: "https://example.com/est.png", country: "Tunisie", league: { id: "l60", name: "Ligue I", sport: { name: "Football" } }, playersCount: 31 },
];

// ====================================================================
// 3. DÉFINITIONS DE COLONNES (Mise à jour pour le pays)
// ====================================================================

export const columnsTeam: ColumnDef<TeamForTable>[] = [
  // 💡 NOUVELLE COLONNE : Pays, essentielle pour le regroupement
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pays
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        // Gère l'affichage du nom du groupe/pays (sera géré par le DataTable)
        return row.getValue("country") as string;
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Équipe
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <span>{row.original.name}</span>
  },
  {
    accessorKey: "league",
    header: "Ligue / Sport",
    cell: ({ row }) => {
        const league = row.original.league
        return (
            <div className="flex flex-col">
                <span className="font-medium">{league.name}</span>
                <Badge variant="secondary" className="w-fit mt-1 text-xs">{league.sport.name}</Badge>
            </div>
        )
    },
  },
  {
    accessorKey: "playersCount",
    header: "Joueurs",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("playersCount")} joueurs</Badge>,
  },
  {
    id: "actions",
    header: "Détails",
    cell: ({ row }) => {
        const teamId = row.original.id
        // Vérifie si c'est une ligne groupée (le bouton n'apparaît pas sur les lignes de groupe)
        if (row.getIsGrouped()) return null; 

        const handleViewDetails = () => {
            alert(`Simulation : Navigation vers les détails de l'équipe: /teams/${teamId}`)
        }
      return (
        <Button 
          variant="default"
          size="sm" 
          onClick={handleViewDetails}
        >
          <Eye className="h-4 w-4 mr-2" /> Voir l&apos;effectif
        </Button>
      )
    },
  },
]


// ====================================================================
// 4. LE MOTEUR DU TABLEAU : COMPOSANT DATATABLE AVEC GROUPEMENT
// ====================================================================

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [grouping, setGrouping] = useState<string[]>(['country']) // 💡 Initialisé pour regrouper par défaut

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        
        // Activation des modèles de regroupement et d'expansion
        getGroupedRowModel: getGroupedRowModel(), 
        getExpandedRowModel: getExpandedRowModel(),

        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onGroupingChange: setGrouping, 

        state: {
            sorting,
            globalFilter,
            grouping,
        },
        initialState: {
          pagination: {
            pageSize: 10,
          },
          // 💡 Développer les lignes groupées par défaut
          expanded: true, 
        },
        getRowCanExpand: () => true, 
    })
    
    // Fonction pour basculer le regroupement par pays
    const handleToggleCountryGroup = () => {
        // Si 'country' est déjà le groupe, on le retire. Sinon, on le met.
        setGrouping(oldGrouping => 
            oldGrouping.includes('country') ? [] : ['country']
        );
    }

    const isGroupedByCountry = grouping.includes('country');

    return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
              {/* Filtre Global (Recherche) */}
              <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                      placeholder={`Rechercher parmi ${table.getFilteredRowModel().rows.length} équipes...`}
                      value={globalFilter ?? ""}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      className="pl-10"
                  />
              </div>
              
              {/* Bouton de Regroupement par Pays */}
              <Button 
                variant={isGroupedByCountry ? "default" : "outline"} 
                onClick={handleToggleCountryGroup}
              >
                  {isGroupedByCountry ? "❌ Afficher toutes les Équipes" : "✅ Regrouper par Pays"}
              </Button>
          </div>

          <div className="bg-white rounded-lg border">
              <div className="overflow-x-auto">
                  <table className="w-full">
                      <thead className="bg-gray-50">
                          {table.getHeaderGroups().map((headerGroup) => (
                              <tr key={headerGroup.id}>
                                  {headerGroup.headers.map((header) => (
                                      <th key={header.id} className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                          {header.isPlaceholder
                                              ? null
                                              : flexRender(header.column.columnDef.header, header.getContext())}
                                      </th>
                                  ))}
                              </tr>
                          ))}
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                          {table.getRowModel().rows?.length ? (
                              table.getRowModel().rows.map((row) => (
                                  <tr 
                                      key={row.id} 
                                      className={`hover:bg-gray-50 ${row.getIsGrouped() ? 'bg-gray-100 font-semibold' : ''}`}
                                  >
                                      {row.getVisibleCells().map((cell) => {
                                          const isGroupedCell = cell.getIsGrouped();
                                          
                                          return (
                                              <td 
                                                  key={cell.id} 
                                                  className="px-4 py-3 text-sm"
                                                  // Retrait du padding gauche sur la première colonne des lignes non groupées
                                                  style={{ 
                                                      paddingLeft: isGroupedCell ? `${row.depth * 20}px` : undefined,
                                                  }}
                                              >
                                                  {isGroupedCell ? (
                                                      // Affichage de la ligne groupée
                                                      <div className="flex items-center space-x-2 cursor-pointer" onClick={row.getToggleExpandedHandler()}>
                                                          {row.getIsExpanded() ? <ChevronDown className="h-4 w-4 text-blue-600" /> : <ChevronRight className="h-4 w-4" />}
                                                          <span className="text-blue-600">
                                                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                          </span>
                                                          <span className="ml-2 text-xs font-normal text-gray-500">
                                                              ({row.subRows.length} équipe{row.subRows.length > 1 ? 's' : ''})
                                                          </span>
                                                      </div>
                                                  ) : (
                                                      // Affichage des données normales
                                                      flexRender(cell.column.columnDef.cell, cell.getContext())
                                                  )}
                                              </td>
                                          )
                                      })}
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
              <div className="flex items-center justify-end px-4 py-3 border-t gap-2">
                  <span className="text-sm text-gray-600 mr-4">
                      Page {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                  </span>
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
    )
}

