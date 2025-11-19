'use client'
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { 
  User2, ChevronUp, ChevronDown, Settings,
  Users, Dices, Calendar, Globe, Trophy, DollarSign, Gift, Zap, 
  ListChecks, Receipt, ShieldCheck, LayoutDashboard, Bookmark, BarChart,
  TrendingUp, Bell, LogOut, UserCircle
} from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Structure de données optimisée avec badges et descriptions
const adminItems = [
  {
    label: "Vue Générale",
    items: [
      {
        title: "Tableau de Bord",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
        badge: "3",
        badgeVariant: "default"
      },
      {
        title: "Statistiques",
        url: "/admin/analytics",
        icon: TrendingUp,
      },
    ],
  },
  {
    label: "Utilisateurs",
    items: [
      { title: "Liste Utilisateurs", url: "/admin/users", icon: Users },
      { title: "Rôles & Permissions", url: "/admin/roles", icon: ShieldCheck },
      { title: "Validation KYC", url: "/admin/kyc", icon: ListChecks, badge: "12", badgeVariant: "destructive" },
    ],
  },
  {
    label: "Contenu Sportif",
    items: [
      { title: "Sports", url: "/admin/sports", icon: Trophy },
      { title: "Pays & Régions", url: "/admin/regions", icon: Globe },
      { title: "Ligues", url: "/admin/leagues", icon: Dices },
      { title: "Équipes", url: "/admin/teams", icon: Users },
    ],
  },
  {
    label: "Paris",
    items: [
      { title: "Événements", url: "/admin/events", icon: Calendar, badge: "5", badgeVariant: "default" },
      { title: "Marchés & Cotes", url: "/admin/markets", icon: BarChart },
      { title: "Tickets", url: "/admin/betslips", icon: Receipt },
      { title: "Limites", url: "/admin/limits", icon: ShieldCheck },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Transactions", url: "/admin/transactions", icon: DollarSign },
      { title: "Paiements", url: "/admin/payments", icon: Receipt },
      { title: "Bonus", url: "/admin/bonuses", icon: Gift },
    ],
  },
  {
    label: "Système",
    items: [
      { title: "Sports Virtuels", url: "/admin/virtual", icon: Zap },
      { title: "Notifications", url: "/admin/notifications", icon: Bell, badge: "8", badgeVariant: "default" },
      { title: "Paramètres", url: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AppSidebar() {
  const [activeItem, setActiveItem] = React.useState("/admin/dashboard");

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-gray-200 dark:border-gray-800">
      {/* Header avec branding */}
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-sm flex-shrink-0">
                      BP
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="font-semibold text-sm truncate">BetPro Admin</div>
                      <div className="text-xs text-gray-500 truncate">v2.1.0</div>
                    </div>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 text-gray-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[240px]">
                <DropdownMenuItem className="cursor-pointer">
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Site Public</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Changer de Compte</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      {/* Contenu avec scroll optimisé */}
      <SidebarContent className="px-2 py-4">
        {adminItems.map((group, groupIndex) => (
          <SidebarGroup key={group.label} className={groupIndex > 0 ? "mt-4" : ""}>
            <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeItem === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`
                          group relative rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                          }
                        `}
                      >
                        <a 
                          href={item.url} 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveItem(item.url);
                          }}
                          className="flex items-center gap-3 px-3 py-2"
                        >
                          {/* Indicateur actif */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                          )}
                          
                          <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`} />
                          
                          <span className="flex-1 truncate">{item.title}</span>
                          
                          {/* Badge de notification */}
                          {item.badge && (
                            <span className={`
                              flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full
                              ${item.badgeVariant === 'destructive' 
                                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' 
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                              }
                            `}>
                              {item.badge}
                            </span>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer avec profil utilisateur */}
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg">
                  <div className="flex items-center gap-3 flex-1 min-w-0 px-2 py-2">
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="font-medium text-sm truncate">John Doe</div>
                      <div className="text-xs text-gray-500 truncate">Super Admin</div>
                    </div>
                  </div>
                  <ChevronUp className="ml-2 h-4 w-4 flex-shrink-0 text-gray-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[240px] mb-2"
              >
                <DropdownMenuItem className="cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Mon Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}