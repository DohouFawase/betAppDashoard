"use client"

import { useState, useMemo, useEffect } from "react" // Import de useMemo et useEffect
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

import { ArrowUpDown, Eye, Search, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
// J'enlève le DropdownMenu car on utilisera une balise <select> simple pour les filtres

// ====================================================================
// 1. TYPES NÉCESSAIRES (Inchangé)
// ====================================================================
// ... (Vos types PlayerStatsDetail, PlayerInTeamDetail, TeamForTable restent ici) ...

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
    country: string; 
    league: {
      id: string
      name: string
      sport: { name: string } // Champ clé pour le filtre Sport
    }
    playersCount: number
}

// ====================================================================
// 2. DONNÉES MOCK AFRICAINES ÉTENDUES (Inchangé)
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
// Pour les filtres sur les objets imbriqués, on utilisera des fonctions d'accès
// ou un filtre personnalisé. Ici, nous allons utiliser des états.
export const columnsTeam: ColumnDef<TeamForTable>[] = [
  // Colonne Pays
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
    cell: ({ row }) => row.getValue("country") as string,
    filterFn: "equalsString", // Permet d'utiliser cette colonne pour filtrer si on le souhaite
  },
  // Colonne Nom de l'Équipe
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
  // Colonne Ligue / Sport
  {
    // Accès aux données de la Ligue et du Sport pour le filtre global
    accessorFn: (row) => `${row.league.name} ${row.league.sport.name}`, 
    id: "leagueAndSport", // ID pour le tri et le filtre
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
  // Colonne Actions (Inchagngée)
  {
    id: "actions",
    header: "Détails",
    cell: ({ row }) => {
        const teamId = row.original.id
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
// 4. LE MOTEUR DU TABLEAU : COMPOSANT DATATABLE AVEC FILTRES ET GROUPEMENT
// ====================================================================

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends TeamForTable, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]) // Ajout de columnFilters
    const [globalFilter, setGlobalFilter] = useState("")
    const [grouping, setGrouping] = useState<string[]>(['country']) 

    // Nouveaux états locaux pour les filtres de sélection
    const [selectedLeague, setSelectedLeague] = useState("all")
    const [selectedSport, setSelectedSport] = useState("all")


    // 💡 Définition des options de filtres uniques (Optimisation avec useMemo)
    const uniqueFilterOptions = useMemo(() => {
        const leagues = new Set<string>();
        const sports = new Set<string>();

        data.forEach(team => {
            leagues.add(team.league.name);
            sports.add(team.league.sport.name);
        });

        return {
            leagues: Array.from(leagues).sort(),
            sports: Array.from(sports).sort(),
        };
    }, [data]);


    // 💡 Mise à jour de columnFilters lorsque les états locaux des selects changent
    useEffect(() => {
        const newFilters: ColumnFiltersState = [];
        
        // Filtre par Ligue (utilise le champ 'leagueAndSport' qui contient le nom de la ligue)
        if (selectedLeague !== "all") {
            // Le filtre global "includesString" fonctionne bien si on cible le champ complet
            // car 'leagueAndSport' contient le nom de la ligue.
            newFilters.push({ id: "leagueAndSport", value: selectedLeague });
        }
        
        // Filtre par Sport
        if (selectedSport !== "all") {
             // Utilisation d'un filtre personnalisé simple pour cibler le nom du sport
             // Je crée un ID virtuel 'sportName' pour le filtre de sport
             newFilters.push({ id: "sportName", value: selectedSport, filterFn: "equalsString" });
        }

        // IMPORTANT: TanStack Table gère les filtres de colonnes.
        // On fusionne les nouveaux filtres avec les filtres existants si nécessaire.
        // Ici, on écrase car selectedLeague/Sport sont les seuls filtres de colonne gérés
        // par cette fonction.
        setColumnFilters(newFilters);
        
    }, [selectedLeague, selectedSport]);


    // 💡 Création d'une fonction de filtre personnalisée pour le Sport
    // Nécessaire car 'sportName' n'est pas un accessorKey direct.
    const customFilterFns = useMemo(() => {
        const sportNameFilter: any = (row: any, columnId: string, filterValue: string) => {
            if (filterValue === 'all') return true;
            return row.original.league.sport.name === filterValue;
        };
        return {
            sportName: sportNameFilter,
        };
    }, []);


    const table = useReactTable({
        data,
        columns,
        filterFns: customFilterFns, 
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getGroupedRowModel: getGroupedRowModel(), 
        getExpandedRowModel: getExpandedRowModel(),

        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onGroupingChange: setGrouping, 
        onColumnFiltersChange: setColumnFilters, // Ajout de l'écoute des changements de filtres de colonne

        state: {
            sorting,
            globalFilter,
            grouping,
            columnFilters, // Ajout de l'état des filtres de colonne
        },
        initialState: {
          pagination: {
            pageSize: 10,
          },
          expanded: true, 
        },
        getRowCanExpand: () => true, 
    })
    
    
    // Fonctionnalité de Regroupement par Pays (Inchagngée)
    const handleToggleCountryGroup = () => {
        setGrouping(oldGrouping => 
            oldGrouping.includes('country') ? [] : ['country']
        );
    }
    const isGroupedByCountry = grouping.includes('country');
    const filteredCount = table.getFilteredRowModel().rows.length;


    return (
        <div className="space-y-4">
            
            {/* Section des FILTRES et ACTIONS */}
            <div className="bg-white p-4 rounded-lg border space-y-4">
                <h3 className="font-semibold text-lg mb-3">Filtres et Options</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    
                    {/* Filtre Global (Recherche) */}
                    <div className="relative col-span-1 md:col-span-2 lg:col-span-4">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder={`Rechercher parmi ${filteredCount} équipes...`}
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    
                    {/* Filtre par Ligue */}
                    <div>
                        <label className="text-sm font-medium mb-1 block">Ligue</label>
                        <select
                            value={selectedLeague}
                            onChange={(e) => setSelectedLeague(e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Toutes les Ligues</option>
                            {uniqueFilterOptions.leagues.map((league) => (
                                <option key={league} value={league}>{league}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtre par Sport */}
                    <div>
                        <label className="text-sm font-medium mb-1 block">Sport</label>
                        <select
                            value={selectedSport}
                            onChange={(e) => setSelectedSport(e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tous les Sports</option>
                            {uniqueFilterOptions.sports.map((sport) => (
                                <option key={sport} value={sport}>{sport}</option>
                            ))}
                        </select>
                    </div>

                    {/* Bouton de Regroupement par Pays */}
                    <div className="flex items-end">
                        <Button 
                            variant={isGroupedByCountry ? "default" : "outline"} 
                            onClick={handleToggleCountryGroup}
                            className="w-full"
                        >
                            {isGroupedByCountry ? "❌ Afficher toutes" : "✅ Regrouper par Pays"}
                        </Button>
                    </div>

                     {/* Bouton Réinitialiser les Filtres */}
                     <div className="flex items-end">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setGlobalFilter("");
                                setSelectedLeague("all");
                                setSelectedSport("all");
                                setColumnFilters([]); // Réinitialise les filtres de colonne
                            }}
                            className="w-full"
                        >
                            Réinitialiser
                        </Button>
                    </div>
                </div>
            </div>


            {/* TABLEAU */}
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
                                                    style={{ 
                                                        // Ajoute l'indentation pour les lignes groupées
                                                        paddingLeft: isGroupedCell ? `${row.depth * 20 + 16}px` : undefined,
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