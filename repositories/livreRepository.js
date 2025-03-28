// repositories/livreRepository.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const livreRepository = {
  async findAllLivres() {
    try {
      return await prisma.livre.findMany({
        include: {
          editeur: true,
          livre_auteur: {
            include: {
              auteur: true
            }
          },
          livre_categorie: {
            include: {
              categorie: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error finding all livres:', error);
      throw new Error('Failed to retrieve books: ' + error.message);
    }
  },

  async findAllLivresByTitre(titre) {
    try {
      return await prisma.livre.findMany({
        where: {
          titre: {
            contains: titre,
            mode: 'insensitive'
          }
        },
        include: {
          editeur: true
        }
      });
    } catch (error) {
      console.error('Error finding livres by titre:', error);
      throw new Error('Failed to retrieve books by title: ' + error.message);
    }
  },

  async findLivreById(id) {
    try {
      return await prisma.livre.findUnique({
        where: { id },
        include: {
          editeur: true,
          livre_auteur: {
            include: {
              auteur: true
            }
          },
          livre_categorie: {
            include: {
              categorie: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error finding livre by id:', error);
      throw new Error('Failed to retrieve book: ' + error.message);
    }
  },

  async createLivre(livreData) {
    try {
      return await prisma.livre.create({
        data: {
          titre: livreData.titre,
          ISBN: livreData.ISBN,
          annee_Publication: livreData.annee_Publication,
          nb_Pages: livreData.nb_Pages,
          editeur_id: livreData.editeur_id
        }
      });
    } catch (error) {
      console.error('Error creating livre:', error);
      throw new Error('Failed to create book: ' + error.message);
    }
  },

  async updateLivre(id, livreData) {
    try {
      return await prisma.livre.update({
        where: { id },
        data: {
          titre: livreData.titre,
          ISBN: livreData.ISBN,
          annee_Publication: livreData.annee_Publication,
          nb_Pages: livreData.nb_Pages,
          editeur_id: livreData.editeur_id
        }
      });
    } catch (error) {
      console.error('Error updating livre:', error);
      throw new Error('Failed to update book: ' + error.message);
    }
  },

  async deleteLivre(id) {
    try {
      return await prisma.livre.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting livre:', error);
      throw new Error('Failed to delete book: ' + error.message);
    }
  },

  async findAllLivresByCategorie(categorieId) {
    try {
      return await prisma.livre.findMany({
        where: {
          livre_categorie: {
            some: {
              categorie_id: categorieId
            }
          }
        },
        include: {
          editeur: true
        }
      });
    } catch (error) {
      console.error('Error finding livres by categorie:', error);
      throw new Error('Failed to retrieve books by category: ' + error.message);
    }
  },

  async findAllLivresByAuteur(auteurId) {
    try {
      return await prisma.livre.findMany({
        where: {
          livre_auteur: {
            some: {
              auteur_id: auteurId
            }
          }
        },
        include: {
          editeur: true
        }
      });
    } catch (error) {
      console.error('Error finding livres by auteur:', error);
      throw new Error('Failed to retrieve books by author: ' + error.message);
    }
  },

  async findAllLivresByPageLimit(page, limit) {
    try {
      const skip = (page - 1) * limit;
      return await prisma.livre.findMany({
        skip,
        take: limit,
        include: {
          editeur: true
        }
      });
    } catch (error) {
      console.error('Error finding livres by page and limit:', error);
      throw new Error('Failed to retrieve books with pagination: ' + error.message);
    }
  }
};