import React from 'react';
import { columnsLeague, LeagueDataTable } from './_components/leagues-tables';
import { mockLeagues } from '@/mock/allMock';

const Page = () => {
    return (
        <div>
            <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Gestion des Ligues</h1>
      <LeagueDataTable columns={columnsLeague} data={mockLeagues} />
    </div>
        </div>
    );
}

export default Page;
