import { mockTeams } from '@/mock/allMock';
import { columnsTeam, DataTable } from './_components/teams-table';

export default function TeamOverviewPage() {
  return (
     <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Gestion des Équipes Africaines 🌍</h1>
      <p className="text-gray-600 mb-6">Liste complète des équipes, regroupées par pays par défaut.</p>
      
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <DataTable 
          columns={columnsTeam} 
          data={mockTeams } 
        />
      </div>
    </div>
  );
}