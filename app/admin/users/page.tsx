import React from 'react';
import { columns, DataTable, UserForTable } from './_components/user-table';
export const mockUsers: UserForTable[] = [
  {
    id: "1",
    email: "jean.dupont@example.com",
    phone: "+229 97 12 34 56",
    firstName: "Jean",
    lastName: "Dupont",
    role: { name: "Administrateur" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-01-15")
  },
  {
    id: "2",
    email: "marie.kouassi@example.com",
    phone: "+229 96 23 45 67",
    firstName: "Marie",
    lastName: "Kouassi",
    role: { name: "Utilisateur" },
    kycStatus: "pending",
    isActive: true,
    createdAt: new Date("2024-02-20")
  },
  {
    id: "3",
    email: "pierre.agbo@example.com",
    phone: "+229 95 34 56 78",
    firstName: "Pierre",
    lastName: "Agbo",
    role: { name: "Modérateur" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-03-10")
  },
  {
    id: "4",
    email: "fatima.diallo@example.com",
    phone: null,
    firstName: "Fatima",
    lastName: "Diallo",
    role: { name: "Utilisateur" },
    kycStatus: "rejected",
    isActive: false,
    createdAt: new Date("2024-04-05")
  },
  {
    id: "5",
    email: null,
    phone: "+229 94 45 67 89",
    firstName: "Ahmed",
    lastName: "Bello",
    role: { name: "Utilisateur" },
    kycStatus: "pending",
    isActive: true,
    createdAt: new Date("2024-05-12")
  },
  {
    id: "6",
    email: "sophie.martin@example.com",
    phone: "+229 93 56 78 90",
    firstName: "Sophie",
    lastName: "Martin",
    role: { name: "Gestionnaire" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-06-18")
  },
  {
    id: "7",
    email: "yao.kouame@example.com",
    phone: "+229 92 67 89 01",
    firstName: null,
    lastName: "Kouamé",
    role: { name: "Utilisateur" },
    kycStatus: "pending",
    isActive: true,
    createdAt: new Date("2024-07-22")
  },
  {
    id: "8",
    email: "aminata.sow@example.com",
    phone: "+229 91 78 90 12",
    firstName: "Aminata",
    lastName: "Sow",
    role: { name: "Administrateur" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-08-30")
  },
  {
    id: "9",
    email: "kevin.dossa@example.com",
    phone: null,
    firstName: "Kevin",
    lastName: "Dossa",
    role: { name: "Utilisateur" },
    kycStatus: "rejected",
    isActive: false,
    createdAt: new Date("2024-09-14")
  },
  {
    id: "10",
    email: "grace.adjovi@example.com",
    phone: "+229 90 89 01 23",
    firstName: "Grace",
    lastName: "Adjovi",
    role: { name: "Modérateur" },
    kycStatus: "approved",
    isActive: true,
    createdAt: new Date("2024-10-08")
  },
  {
    id: "11",
    email: "david.tognon@example.com",
    phone: "+229 97 90 12 34",
    firstName: "David",
    lastName: null,
    role: { name: "Utilisateur" },
    kycStatus: "pending",
    isActive: true,
    createdAt: new Date("2024-11-01")
  },
  {
    id: "12",
    email: null,
    phone: null,
    firstName: "Isabelle",
    lastName: "Koko",
    role: { name: "Utilisateur" },
    kycStatus: "rejected",
    isActive: false,
    createdAt: new Date("2024-11-15")
  }
]
const Page = () => {
    return (
        <div>


<DataTable columns={columns} data={mockUsers} />
        </div>
    );
}

export default Page;
