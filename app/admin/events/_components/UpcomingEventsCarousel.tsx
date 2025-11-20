// LiveMatchesGrid.tsx
"use client"
import React from 'react';
// Adaptez ce chemin à votre structure de projet
import { mockLiveEvents } from '@/mock/allMock'; 
import { LiveEventMock } from '@/types/type'; 

// --- Composant pour une seule carte de match en direct (Verticale) ---
const LiveMatchCard: React.FC<{ event: LiveEventMock }> = ({ event }) => {
  const isLive = event.status === 'Live';
  const timeDisplay = isLive ? `${event.minute}'` : 'MT'; 
  const timeColor = isLive ? 'bg-red-600' : 'bg-yellow-500'; 

  return (
    // Carte verticale, grande, fond sombre et coins arrondis
    <div className="w-full bg-purple-900 rounded-xl shadow-lg p-5 transition duration-200 hover:shadow-indigo-500/50">
      
      {/* Ligne Supérieure : Compétition et Statut */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          {/* Logo Ligue */}
          <span className="text-xl text-yellow-300">⚽</span> 
          <span className="text-sm font-semibold text-white truncate">{event.leagueName}</span>
        </div>
        {/* Indicateur de Statut/Minute */}
        <div className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${timeColor}`}>
            {timeDisplay}
        </div>
        {/* Icône Favorite/Follow */}
        <span className="text-xl text-gray-400 cursor-pointer">☆</span> 
      </div>

      {/* Centre : Noms des Équipes et Logos */}
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        {/* Ligne Équipe Domicile */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-gray-700 block"></span> {/* Logo Domicile */}
            <span className="text-lg font-semibold text-white">{event.teamHome}</span>
          </div>
          {/* Score Domicile */}
          <span className="text-xl font-extrabold text-white">{event.scoreHome}</span> 
        </div>

        {/* Ligne "VS" */}
        <div className="text-sm font-bold text-gray-500 uppercase">
          vs
        </div>

        {/* Ligne Équipe Extérieur */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-gray-700 block"></span> {/* Logo Extérieur */}
            <span className="text-lg font-semibold text-white">{event.teamAway}</span>
          </div>
          {/* Score Extérieur */}
          <span className="text-xl font-extrabold text-white">{event.scoreAway}</span> 
        </div>
      </div>
      
      {/* Pied de page : Statistiques et Public */}
      <div className="flex items-center mt-6 pt-3 border-t border-purple-700 text-sm text-gray-400 space-x-4">
        {/* Avatars des Suiveurs */}
        <div className="flex -space-x-1 overflow-hidden">
          {/* Remplacer par des images d'avatars réelles */}
          <span className="h-5 w-5 rounded-full bg-gray-500 border border-purple-900"></span>
          <span className="h-5 w-5 rounded-full bg-gray-500 border border-purple-900"></span>
          <span className="h-5 w-5 rounded-full bg-gray-500 border border-purple-900"></span>
        </div>
        <span className="text-xs font-bold flex items-center">
            👀 <span className="ml-1">20K</span>
        </span>
        
        {/* Bouton Cotes/Marchés - pour attirer l'action */}
        <button className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1 rounded-full">
            Parier
        </button>
      </div>
    </div>
  );
};

// --- Composant Grille des Matchs en Direct ---
const LiveMatchesGrid: React.FC = () => {
  const liveEvents = mockLiveEvents;

  if (liveEvents.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-0">
      
      {/* Entête avec les filtres ("All Match", "Live Match", "Finished") */}
      <div className="flex justify-end space-x-2 mb-6">
        <button className=" font-semibold px-4 py-2">All Match</button>
        <button className="bg-indigo-700 text-white font-bold px-4 py-2 rounded-full shadow-lg">Live Match</button>
        <button className=" font-semibold px-4 py-2">Finished</button>
      </div>

      {/* Conteneur de la Grille (Affichage sur 2 ou 3 colonnes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveEvents.map((event) => (
          // Nous utilisons les événements "live" pour simuler la grille des matchs en cours
          <LiveMatchCard key={event.id} event={event} /> 
        ))}
      </div>
    </div>
  );
};

export default LiveMatchesGrid;