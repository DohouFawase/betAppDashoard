"use client"

import { useState, useMemo, useEffect } from "react"
import { 
    ColumnDef, 
    useReactTable, 
    getCoreRowModel, 
    getFilteredRowModel, 
    getSortedRowModel, 
    getPaginationRowModel, 
    flexRender, 
    SortingState, 
    ColumnFiltersState 
} from "@tanstack/react-table"

import { ArrowUpDown, Eye, Search, Calendar, Landmark, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator" 
import { LeagueForTable } from "@/types/type"



export const columnsLeague: ColumnDef<LeagueForTable>[] = [
  // Colonne Nom
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Nom de la Ligue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <span className="font-semibold text-gray-800">{row.original.name}</span>
  },
  // Colonne Sport
  {
    accessorFn: (row) => row.sport.name, 
    id: "sportName", 
    header: "Sport",
    cell: ({ row }) => {
        const sport = row.original.sport.name;
        // Styles de badge plus distincts
        const variant = sport === "Football" ? "default" : (sport === "Basketball" ? "outline" : "secondary");
        return <Badge variant={variant} className="min-w-[80px] justify-center">{sport}</Badge>
    },
    filterFn: "equalsString",
  },
  // Colonne Région / Pays
  {
    accessorFn: (row) => `${row.region.name} (${row.region.country.name})`, 
    id: "regionAndCountry", 
    header: "Région / Pays",
    cell: ({ row }) => {
        const region = row.original.region
        return (
            <div className="flex items-center space-x-2">
                <Landmark className="h-4 w-4 text-blue-500" />
                <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{region.country.name}</span>
                    <span className="text-xs text-gray-500">{region.name}</span>
                </div>
            </div>
        )
    },
  },
  // Colonne Format (League ou Tournament)
  {
    accessorKey: "format",
    header: "Format",
    cell: ({ row }) => {
        const format = row.getValue("format") as "league" | "tournament";
        const text = format === "league" ? "Championnat" : "Tournoi/Coupe";
        const icon = format === "league" ? <Trophy className="h-4 w-4 mr-1" /> : <Landmark className="h-4 w-4 mr-1" />;
        return (
            <div className={`flex items-center text-sm ${format === "league" ? 'text-green-600' : 'text-purple-600'}`}>
                {icon}
                <span className="font-medium">{text}</span>
            </div>
        )
    },
    filterFn: "equalsString",
  },
  // Colonne Dates
  {
    accessorKey: "startDate",
    header: "Période",
    cell: ({ row }) => {
        // --- CORRECTION APPLIQUÉE ICI ---
        // Utilisation de l'enchaînement optionnel (?.): Appelle la méthode si la date existe.
        // Utilisation de l'opérateur de fusion nulle (??): Fournit une valeur de secours si le résultat est null/undefined.
        const startDate = row.original.startDate?.toLocaleDateString() ?? 'N/A';
        const endDate = row.original.endDate?.toLocaleDateString() ?? 'En cours'; // 'En cours' remplace null/undefined pour les dates de fin
        // -------------------------------
        return (
            <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{startDate} - {endDate}</span>
            </div>
        )
    },
  },
  // Colonne Actions
  {
    id: "actions",
    header: "Événements",
    cell: ({ row }) => {
        const leagueId = row.original.id
        const count = row.original.eventsCount

        const handleViewEvents = () => {
            alert(`Simulation: Navigation vers les événements de la ligue: /leagues/${leagueId}/events`)
        }
      return (
        <Button 
          variant="outline"
          size="sm" 
          onClick={handleViewEvents}
          className="hover:bg-blue-500 hover:text-white transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" /> {count} Événements
        </Button>
      )
    },
  },
]


// ====================================================================
// 4. LE MOTEUR DU TABLEAU : COMPOSANT DATATABLE POUR LES LIGUES (Mise à jour du design)
// ====================================================================

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function LeagueDataTable<TData extends LeagueForTable, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    
    const [selectedSport, setSelectedSport] = useState("all")
    const [selectedFormat, setSelectedFormat] = useState("all")
    const [selectedCountry, setSelectedCountry] = useState("all")


    // 💡 Définition des options de filtres uniques (Inchangé)
    const uniqueFilterOptions = useMemo(() => {
        const sports = new Set<string>();
        const formats = new Set<string>();
        const countries = new Set<string>();

        data.forEach(league => {
            sports.add(league.sport.name);
            formats.add(league.format);
            countries.add(league.region.country.name);
        });

        return {
            sports: Array.from(sports).sort(),
            formats: Array.from(formats).sort(),
            countries: Array.from(countries).sort(),
        };
    }, [data]);


    // 💡 Mise à jour de columnFilters (Inchangé)
    useEffect(() => {
        const newFilters: ColumnFiltersState = [];
        
        if (selectedSport !== "all") {
            newFilters.push({ id: "sportName", value: selectedSport });
        }
        
        if (selectedFormat !== "all") {
             newFilters.push({ id: "format", value: selectedFormat });
        }
        
        if (selectedCountry !== "all") {
             newFilters.push({ id: "countryName", value: selectedCountry });
        }

        setColumnFilters(newFilters);
        
    }, [selectedSport, selectedFormat, selectedCountry]);


    // 💡 Fonction de filtre personnalisée pour le Pays (Inchangé)
    const customFilterFns = useMemo(() => {
        const countryNameFilter: any = (row: any, columnId: string, filterValue: string) => {
            if (filterValue === 'all') return true;
            return row.original.region.country.name === filterValue;
        };
        return {
             countryName: countryNameFilter, 
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

        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters, 

        state: {
            sorting,
            globalFilter,
            columnFilters,
        },
        initialState: {
          pagination: {
            pageSize: 10,
          },
        },
    })
    
    
    const filteredCount = table.getFilteredRowModel().rows.length;


    return (
        <div className="space-y-6">
            
            {/* Section des FILTRES et ACTIONS (Design amélioré) */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center">
                    <Search className="h-5 w-5 mr-3 text-blue-600" />
                    Options de Filtrage
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Filtre Global (Recherche) */}
                    <div className="relative col-span-1 md:col-span-2 lg:col-span-4">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder={`Rechercher parmi ${filteredCount} ligues... (Nom, Région, Pays, Sport)`}
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="pl-10 h-10 border-gray-300 focus:border-blue-500"
                        />
                    </div>

                    <Separator className="col-span-4 my-2" />
                    
                    {/* Filtre par Sport */}
                    <div>
                        <label className="text-sm font-medium mb-1 block text-gray-700">Sport</label>
                        <select
                            value={selectedSport}
                            onChange={(e) => setSelectedSport(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            <option value="all">Tous les Sports</option>
                            {uniqueFilterOptions.sports.map((sport) => (
                                <option key={sport} value={sport}>{sport}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtre par Pays */}
                    <div>
                        <label className="text-sm font-medium mb-1 block text-gray-700">Pays</label>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            <option value="all">Tous les Pays</option>
                            {uniqueFilterOptions.countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtre par Format */}
                    <div>
                        <label className="text-sm font-medium mb-1 block text-gray-700">Format</label>
                        <select
                            value={selectedFormat}
                            onChange={(e) => setSelectedFormat(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            <option value="all">Tous les Formats</option>
                            <option value="league">Championnat</option>
                            <option value="tournament">Tournoi/Coupe</option>
                        </select>
                    </div>

                     {/* Bouton Réinitialiser les Filtres */}
                     <div className="flex items-end">
                        <Button
                            variant="outline" // Changement de variante pour mieux s'intégrer
                            onClick={() => {
                                setGlobalFilter("");
                                setSelectedSport("all");
                                setSelectedFormat("all");
                                setSelectedCountry("all");
                                setColumnFilters([]); 
                            }}
                            className="w-full h-10 border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                            Réinitialiser
                        </Button>
                    </div>
                </div>
            </div>


            {/* TABLEAU (Design amélioré) */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th 
                                            key={header.id} 
                                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, index) => (
                                    <tr 
                                        key={row.id} 
                                        // Effet zébré
                                        className={`text-gray-900 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="h-24 text-center text-gray-500 py-6">
                                        <div className="p-4 bg-yellow-50/50 border border-yellow-200 rounded-lg mx-auto w-fit">
                                            ⚠️ Aucun résultat de ligue trouvé correspondant aux filtres.
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Design amélioré) */}
                <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50">
                    <span className="text-sm text-gray-600 font-medium">
                        Affichage de {table.getRowModel().rows.length} résultats.
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 mr-2">
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
        </div>
    )
}