import { PlayerStatsDetail, TeamDetailData, TeamForTable } from "@/types/type"
const baseStats: PlayerStatsDetail = {
    matchesPlayed: 20,
    minutesPlayed: 1500,
    goals: 15,
    assists: 5,
    yellowCards: 2,
    redCards: 0,
    shotsTotal: 60,
    shotsOnTarget: 35,
    passCompletionRate: 85,
};
export const mockTeamDetailA: TeamDetailData = {
    id: "t1",
    name: "Dragons de Cotonou",
    logoUrl: "https://example.com/logo/dragons.png",
    leagueName: "Ligue 1 Bénin (Saison 2024)",
    sportName: "Football",
    teamStats: {
        season: "2024",
        position: 1,
        matchesPlayed: 20,
        wins: 15,
        draws: 3,
        losses: 2,
        goalsFor: 45,
        goalsAgainst: 15,
        points: 48,
        form: "V-V-D-V-N",
    },
    players: [
        { id: "p1", firstName: "Jean", lastName: "Koko", position: "Attaquant", jerseyNumber: 9, isActive: true, stats: baseStats },
        { id: "p2", firstName: "Ismael", lastName: "Soto", position: "Milieu", jerseyNumber: 10, isActive: true, stats: { ...baseStats, goals: 3, assists: 10, shotsTotal: 40, shotsOnTarget: 15, passCompletionRate: 92 } },
        { id: "p3", firstName: "Paul", lastName: "Agon", position: "Défenseur", jerseyNumber: 4, isActive: true, stats: { ...baseStats, goals: 1, assists: 0, shotsTotal: 5, shotsOnTarget: 2, yellowCards: 5, redCards: 1, passCompletionRate: 95 } },
        { id: "p4", firstName: "Marcel", lastName: "Zing", position: "Gardien", jerseyNumber: 1, isActive: true, stats: { ...baseStats, goals: 0, assists: 0, matchesPlayed: 20, minutesPlayed: 1800 } },
        { id: "p5", firstName: "Ahmed", lastName: "Bako", position: "Attaquant", jerseyNumber: 7, isActive: false, stats: { ...baseStats, matchesPlayed: 5, goals: 0, assists: 1 } },
    ]
}

// Données pour le tableau principal des équipes
export const mockTeams: TeamForTable[] = [
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
]