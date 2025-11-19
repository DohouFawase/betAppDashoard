'use client'
import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Trophy,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Eye,
  MapPin
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AdminDashboard() {
  // Données statistiques
  const stats = [
    {
      title: "Revenus Aujourd'hui",
      value: "285,000 FCFA",
      change: "+15.8%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500"
    },
    {
      title: "Paris Actifs",
      value: "456",
      change: "+22.4%",
      trend: "up",
      icon: Activity,
      color: "bg-blue-500"
    },
    {
      title: "Utilisateurs en Ligne",
      value: "234",
      change: "+18.5%",
      trend: "up",
      icon: Users,
      color: "bg-purple-500"
    },
    {
      title: "Matchs Aujourd'hui",
      value: "12",
      change: "+3",
      trend: "up",
      icon: Trophy,
      color: "bg-orange-500"
    }
  ];

  // Données pour le graphique des revenus (semaine)
  const revenueData = [
    { name: 'Lun', revenus: 180000, paris: 180 },
    { name: 'Mar', revenus: 165000, paris: 145 },
    { name: 'Mer', revenus: 225000, paris: 220 },
    { name: 'Jeu', revenus: 195000, paris: 185 },
    { name: 'Ven', revenus: 310000, paris: 285 },
    { name: 'Sam', revenus: 425000, paris: 390 },
    { name: 'Dim', revenus: 380000, paris: 350 }
  ];

  // Données pour le graphique des compétitions
  const competitionsData = [
    { name: 'Ligue Pro', value: 42, color: '#3b82f6' },
    { name: 'Tournoi des Rues', value: 28, color: '#f59e0b' },
    { name: 'Coupe du Bénin', value: 18, color: '#10b981' },
    { name: 'Matchs Amicaux', value: 12, color: '#8b5cf6' }
  ];

  // Paris récents sur compétitions locales
  const recentBets = [
    { id: '#BJ5678', user: 'Koffi A.', match: 'ASPAC vs Dragons FC', montant: '15,000 FCFA', statut: 'en cours', heure: 'Il y a 3 min', lieu: 'Cotonou' },
    { id: '#BJ5677', user: 'Yannick T.', match: 'Buffles vs Adjidja', montant: '25,000 FCFA', statut: 'gagné', heure: 'Il y a 8 min', lieu: 'Porto-Novo' },
    { id: '#BJ5676', user: 'Rachelle S.', match: 'Tonnerre Bohicon vs Modèle', montant: '8,000 FCFA', statut: 'perdu', heure: 'Il y a 12 min', lieu: 'Bohicon' },
    { id: '#BJ5675', user: 'Serge M.', match: 'AS Comon vs Soleil FC', montant: '12,000 FCFA', statut: 'en cours', heure: 'Il y a 15 min', lieu: 'Parakou' },
    { id: '#BJ5674', user: 'Flora D.', match: 'Panthères vs Béké FC', montant: '20,000 FCFA', statut: 'gagné', heure: 'Il y a 18 min', lieu: 'Abomey-Calavi' }
  ];

  // Alertes système
  const alerts = [
    { type: 'warning', message: '8 validations de paiement Mobile Money en attente', action: 'Vérifier' },
    { type: 'info', message: 'Pic d\'activité sur le match ASPAC vs Dragons FC (Tournoi des Rues)', action: 'Voir' },
    { type: 'success', message: '15 retraits MTN Money approuvés ce matin', action: 'Détails' }
  ];

  // Top événements - Championnats et tournois locaux
  const topEvents = [
    { 
      match: 'ASPAC FC vs Dragons de l\'Ouémé', 
      paris: 234, 
      mise: '285,000 FCFA', 
      live: true,
      competition: 'Ligue Pro Bénin',
      lieu: 'Stade René Pleven, Cotonou'
    },
    { 
      match: 'Buffles du Borgou vs AS Adjidja', 
      paris: 189, 
      mise: '198,000 FCFA', 
      live: false,
      competition: 'Ligue Pro Bénin',
      lieu: 'Stade de Parakou'
    },
    { 
      match: 'Tonnerre Bohicon vs AS Modèle', 
      paris: 156, 
      mise: '165,000 FCFA', 
      live: true,
      competition: 'Tournoi des Rues 2024',
      lieu: 'Terrain Ganhi, Porto-Novo'
    },
    { 
      match: 'Panthères FC vs Béké FC', 
      paris: 142, 
      mise: '145,000 FCFA', 
      live: false,
      competition: 'Coupe du Bénin',
      lieu: 'Stade de l\'Amitié, Cotonou'
    },
    { 
      match: 'AS Comon vs Soleil FC', 
      paris: 128, 
      mise: '132,000 FCFA', 
      live: false,
      competition: 'Tournoi Inter-Quartiers',
      lieu: 'Terrain Jonquet, Cotonou'
    }
  ];

  // Tournois de vacances populaires
  const tournoiVacances = [
    { nom: 'Tournoi des Rues - Cotonou', equipes: 16, paris: 345, statut: 'En cours' },
    { nom: 'Coupe des Vacances - Porto-Novo', equipes: 12, paris: 234, statut: 'En cours' },
    { nom: 'Tournoi Inter-Quartiers - Parakou', equipes: 8, paris: 156, statut: 'Terminé' },
    { nom: 'Challenge des Jeunes - Abomey', equipes: 10, paris: 187, statut: 'À venir' }
  ];

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'gagné': return 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400';
      case 'perdu': return 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400';
      case 'en cours': return 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getTournoiStatusColor = (statut) => {
    switch (statut) {
      case 'En cours': return 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400';
      case 'Terminé': return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
      case 'À venir': return 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tableau de Bord
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Paris sportifs - Championnats et Tournois Béninois
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Derniers 7 jours
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Rapport complet
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500">vs hier</span>
                </div>
              </div>
              <div className={`${stat.color} p-4 rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alertes */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Alertes Importantes
          </h2>
        </div>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getAlertIcon(alert.type)}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {alert.message}
                </span>
              </div>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                {alert.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenus hebdomadaires */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenus et Paris - 7 Derniers Jours
            </h2>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value, name) => [
                  name === 'revenus' ? `${value.toLocaleString()} FCFA` : value,
                  name === 'revenus' ? 'Revenus' : 'Nombre de Paris'
                ]}
              />
              <Legend />
              <Bar dataKey="revenus" fill="#3b82f6" name="Revenus (FCFA)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="paris" fill="#8b5cf6" name="Nombre de Paris" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par compétition */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Paris par Compétition
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={competitionsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {competitionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {competitionsData.map((comp, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: comp.color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {comp.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {comp.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paris récents */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Paris Récents
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {recentBets.map((bet, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                      {bet.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {bet.match}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        {bet.lieu}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                      {bet.montant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          bet.statut
                        )}`}
                      >
                        {bet.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top événements */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Matchs Populaires
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {topEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {event.match}
                    </span>
                    {event.live && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                    {event.competition}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3" />
                    {event.lieu}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <span>{event.paris} paris</span>
                    <span>•</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {event.mise}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <Eye className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tournois de Vacances */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tournois de Vacances & Compétitions de Rue
            </h2>
            <Trophy className="h-5 w-5 text-orange-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Tournoi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Équipes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Paris Actifs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {tournoiVacances.map((tournoi, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {tournoi.nom}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {tournoi.equipes} équipes
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {tournoi.paris} paris
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getTournoiStatusColor(
                        tournoi.statut
                      )}`}
                    >
                      {tournoi.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}