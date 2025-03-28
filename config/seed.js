// prisma/seed.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Editeurs (Publishers)
  const editeurs = await prisma.editeur.createMany({
    data: [
      { editeur: 'Grasset' },
      { editeur: 'Gallimard' },
      { editeur: 'Flammarion' },
      { editeur: 'Albin Michel' },
      { editeur: 'Robert Laffont' }
    ]
  });

  // Seed Nationalites (Nationalities)
  const nationalites = await prisma.nationalite.createMany({
    data: [
      { nationalite: 'Française' },
      { nationalite: 'Anglaise' },
      { nationalite: 'Américaine' },
      { nationalite: 'Britannique' }
    ]
  });

  // Seed Auteurs (Authors)
  const auteurs = await prisma.auteur.createMany({
    data: [
      { 
        nom: 'Orwell', 
        prenom: 'George', 
        date_naissance: new Date('1903-06-25'),
        nationalite_id: 4 
      },
      { 
        nom: 'de Saint-Exupéry', 
        prenom: 'Antoine', 
        date_naissance: new Date('1900-06-29'),
        nationalite_id: 1 
      }
      // Add more authors as needed
    ]
  });

  // Seed Categories
  const categories = await prisma.categorie.createMany({
    data: [
      { categorie: 'Science Fiction' },
      { categorie: 'Fantasy' },
      { categorie: 'Roman Classique' }
    ]
  });

  // Seed Etats (Book States)
  const etats = await prisma.etat.createMany({
    data: [
      { etat: 'Neuf' },
      { etat: 'Bon état' },
      { etat: 'Usé' }
    ]
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;