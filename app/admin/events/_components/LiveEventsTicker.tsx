// LiveEventsTicker.tsx
"use client"
import React from 'react';
// Adaptez ce chemin à votre structure de projet
import { mockLiveEvents } from '@/mock/allMock'; 
import { LiveEventMock } from '@/types/type'; // Assurez-vous d'importer le type

// --- Composant pour un seul événement en direct (Le "Widget" ou "Bandeau") ---
const LiveEventWidget: React.FC<{ event: LiveEventMock }> = ({ event }) => {
  const isLive = event.status === 'Live';
  // Affiche la minute ou "MT" (Mi-temps)
  const timeDisplay = isLive ? `${event.minute}'` : 'MT'; 
  // Couleur selon le statut (Rouge pour Live, Jaune/Orange pour Mi-temps)
  const timeColor = isLive ? 'bg-red-600 text-white' : 'bg-yellow-500 text-gray-900'; 

  return (
    // Carte compacte sur fond sombre
    <div className="flex-shrink-0 bg-gray-900 rounded-lg p-2.5 mr-3 border border-gray-700 hover:border-red-500 cursor-pointer">
      <div className="flex items-center space-x-3 w-72">
        
        {/* Colonne 1 : Indicateur de Temps/Statut */}
        <div className={`flex flex-col items-center justify-center p-1 rounded-md text-xs font-bold ${timeColor}`}>
            {timeDisplay}
        </div>
        
        {/* Colonne 2 : Infos Match (Ligue, Équipes et Scores) */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 truncate mb-0.5">{event.leagueName}</p>
          {/* Équipe Domicile / Score */}
          <div className="flex justify-between items-center text-sm font-semibold text-white">
            <span className="truncate">{event.teamHome}</span>
            {/* Score en rouge vif pour attirer l'attention */}
            <span className="text-red-400">{event.scoreHome}</span> 
          </div>
          {/* Équipe Extérieur / Score */}
          <div className="flex justify-between items-center text-sm font-semibold text-white">
            <span className="truncate">{event.teamAway}</span>
            <span className="text-red-400">{event.scoreAway}</span>
          </div>
        </div>
        
        {/* Colonne 3 : Icône (Optionnel : pour aller aux cotes) */}
        <div className="text-sm font-bold text-gray-500">
            &rsaquo;
        </div>
      </div>
    </div>
  );
};

// --- Composant Carrousel Principal ---
const LiveEventsTicker: React.FC = () => {
  const liveEvents = mockLiveEvents;

  if (liveEvents.length === 0) {
    return null; 
  }

  return (
    <div className="max-w-7xl mx-auto pt-2 pb-6"> 
      {/* Titre "En Direct" et Bouton "Voir tous" */}
      <div className="flex justify-between items-center mb-3 px-4 sm:px-0">
          <h2 className="text-lg font-bold text-red-500 flex items-center">
            <span className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            EN DIRECT (LIVE)
          </h2>
          <button className="text-sm text-gray-400 hover:text-white transition duration-150">
            Voir tous les Lives
          </button>
      </div>
      
      {/* Conteneur du Carrousel des Lives */}
      <div className="flex overflow-x-auto scrollbar-hide px-4 sm:px-0"> 
        {liveEvents.map((event) => (
          <LiveEventWidget key={event.id} event={event} /> 
        ))}
        {/* Espace à la fin du carrousel */}
        <div className="flex-shrink-0 w-4"></div> 
      </div>
      
      {/* Styles pour cacher la barre de défilement (nécessite l'intégration dans votre fichier CSS global ou le composant parent) */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default LiveEventsTicker;