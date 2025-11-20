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

export type LeagueForTable = {
    id: string
    name: string
    format: "league" | "tournament"
    startDate: Date
    endDate: Date
    sport: { name: string }
    region: { 
        name: string,
        country: { name: string }
    }
    eventsCount: number
}


export type EventMock = {
  id: string;
  startTime: string; 
  league: {
    name: string;
    logo: string;
    regionCode: string; 
  };
  teamHome: {
    name: string;
    logo: string;
  };
  teamAway: {
    name: string;
    logo: string;
  };
  odds: {
    home: number; 
    draw: number; 
    away: number; 
  };

   playerHomePhoto?: string; // URL photo joueur domicile
    playerAwayPhoto?: string; // URL photo joueur extérieur
    matchTitle?: string; // Ex: "Champions League Match 7"
};


export type LiveEventMock = {
    id: string;
    leagueName: string;
    teamHome: string;
    teamAway: string;
    scoreHome: number;
    scoreAway: number;
    minute: number; // Minute du match (ex: 45)
    status: 'HT' | 'Live'; // Mi-temps ou En cours
};

