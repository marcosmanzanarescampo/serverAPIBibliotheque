// controllers/AuteurController.js
import { auteurService } from '../services/auteurService.js';
import { parseRequestBody } from '../utils/httpHelper.js';

export const auteurController = {
  /**
   * Récupère tous les auteurs
   */
  async getAllAuteur(req, res) {
    try {
      const auteurs = await auteurService.getAllAuteur();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: auteurs }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },
    /**
   * Récupère tous les auteurs
   */
    async   getAllAuteurByTitre(req, res, titre){
      try {
        const auteurs = await auteurService.getAllAuteurByTitre(titre);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: auteur }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
      }
    },
  
  /**
   * Récupère les auteur par une categorie
   */
  async getAllAuteursByCategorie(req, res, categorie) {
    try {
      const auteurs = await auteurService.getAllAuteurByCategorie(categorie);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: auteur }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },
  
    /**
   * Récupère les auteur par une categorie
   */
    async getAllAuteursByAuteur(req, res, auteur) {
      try {
        const auteurs = await auteurService.getAllAuteursByAuteur(auteur);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: auteur }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
      }
    },
    
   /**
   * Récupère les auteur par une page et avec une limite
   */
  async getAllAuteursByPageLimit(req, res, page, limit){
    try {
      const auteurs = await auteurService.getAllAuteursByPageLimit(page, limit);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: auteurs }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },
  
   /**
   * Récupère un auteur par son id
   */
    async getAuteurById(req, res, id){
     try {
       const auteur = await auteurService.getAuteurById(id);
  
       res.writeHead(200, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ success: true, data: auteur }));
     } catch (error) {
       res.writeHead(500, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
     }
  },

  /**
   * Crée un auteur
   */
  async createAuteur(req, res) {
    try {
      const auteurData = await parseRequestBody(req);
      const result = await auteurService.createAuteur(auteurData);          
           
      res.writeHead(201, { 'Content-Type': 'application/json' });
           
      res.end(JSON.stringify({
        success: true,
        message: 'auteur créé avec succès',
        data: { id: result.id }
      }));
    }
    catch (error) {
      const statusCode = error.message.includes('requis') ? 400 : 500;

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  },

  /**
  * delete un auteur de la base de données
  */
  async deleteAuteur(req, res, id){
    try {
      const auteur = await auteurService.deleteAuteur(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: auteur }));
    }
    catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message}));
    }
 },

   /**
  * met à jour un auteur de la base de données
  */
   async updateAuteur(req, res, id){
    try {
      const auteurData = await parseRequestBody(req);
      const result = await auteurService.updateAuteur(auteurData, id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: auteurData }));
    }
    catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message}));
    }
 }
}


