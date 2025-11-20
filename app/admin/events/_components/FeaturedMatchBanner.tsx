// FeaturedMatchBanner.tsx
"use client"
import React from 'react';

// Structure simplifiée pour l'exemple de design
const featuredMatch = {
    leagueLogo: '⚽', // Simule le logo de la Champions League
    matchTitle: 'Ligue des Champions CAF - Phase de Groupe',
    teamHomeName: 'AS VITA CLUB',
    teamAwayName: 'RAJA CASABLANCA',
    playerHomePhoto: 'https://via.placeholder.com/200x300/6A1B9A/FFFFFF?text=JOUEUR_DOM', // Placeholder
    playerAwayPhoto: 'https://via.placeholder.com/200x300/D81B60/FFFFFF?text=JOUEUR_EXT', // Placeholder
    odds: { home: 1.8, draw: 3.5, away: 4.5 },
};

const FeaturedMatchBanner: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto mb-6 px-4 sm:px-0">
      {/* Conteneur principal (Couleur violette comme dans l'image) */}
      <div className="relative overflow-hidden bg-purple-800 rounded-xl shadow-2xl p-6 md:p-10 text-white">
        
        {/* Images de fond pour le style (optionnel) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: `url(${featuredMatch.playerHomePhoto}), url(${featuredMatch.playerAwayPhoto})`, backgroundPosition: 'left, right' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-700 opacity-90"></div>

        {/* Contenu Centré (au-dessus du fond) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          
          {/* Logo et titre de la Ligue */}
          <div className="mb-4">
            <span className="text-4xl">{featuredMatch.leagueLogo}</span>
            <p className="text-sm font-light text-purple-300 uppercase">{featuredMatch.matchTitle}</p>
          </div>

          {/* Noms des Équipes (Grand Titre) */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            {featuredMatch.teamHomeName}
            <br />
            {featuredMatch.teamAwayName}
          </h1>

          {/* VS et Logos des équipes */}
          <div className="flex items-center space-x-6 mb-6">
            {/* Remplacez les spans par des <img /> pour les logos */}
            <span className="text-3xl bg-white p-2 rounded-full text-purple-800">🏠</span> 
            <span className="text-4xl font-extrabold text-white">VS</span>
            <span className="text-3xl bg-white p-2 rounded-full text-purple-800">✈️</span>
          </div>

          {/* Cotes Rapides (Bas du bandeau, adapté au contexte de paris) */}
          <div className="flex space-x-4">
            <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-full font-bold text-lg transition duration-150 shadow-md">
              1: {featuredMatch.odds.home.toFixed(2)}
            </button>
            <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-bold text-lg transition duration-150 shadow-md">
              X: {featuredMatch.odds.draw.toFixed(2)}
            </button>
            <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-full font-bold text-lg transition duration-150 shadow-md">
              2: {featuredMatch.odds.away.toFixed(2)}
            </button>
          </div>
          
          {/* Affichage des joueurs pour le style visuel (en bas de la bannière) */}
          {/* Tu devras positionner ces images avec du CSS absolu pour qu'elles s'alignent correctement aux bords */}

        </div>
      </div>
    </div>
  );
};

export default FeaturedMatchBanner;