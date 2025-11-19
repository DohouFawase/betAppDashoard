export type PlayerStatsDetail = {
    matchesPlayed: number;
    minutesPlayed: number;
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
    league: {
      id: string
      name: string
      sport: { name: string }
    }
    playersCount: number
    country: string;
}

export type TeamStatsData = {
    season: string;
    position: number;
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
    form: string | null;
}

export type TeamDetailData = {
    id: string;
    name: string;
    logoUrl: string | null;
    leagueName: string;
    sportName: string;
    teamStats: TeamStatsData;
    players: PlayerInTeamDetail[];
}

