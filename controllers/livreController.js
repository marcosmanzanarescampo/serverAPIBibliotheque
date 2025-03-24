// controllers/livreController.js
import { livreService } from '../services/livreService.js';
import { parseRequestBody } from '../utils/httpHelper.js';

export const livreController = {
  /**
   * Récupère tous les livres
   */
  async getAllLivres(req, res) {
    try {
      const livres = await livreService.getAllLivres();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livres }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },
    /**
   * Récupère tous les livres
   */
    async   getAllLivresByTitre(req, res, titre){
      try {
        const livres = await livreService.getAllLivresByTitre(titre);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: livres }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
      }
    },
  
  /**
   * Récupère les livres par une categorie
   */
  async getAllLivresByCategorie(req, res, categorie) {
    try {
      const livres = await livreService.getAllLivresByCategorie(categorie);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livres }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },
  
    /**
   * Récupère les livres par une categorie
   */
    async getAllLivresByAuteur(req, res, auteur) {
      try {
        const livres = await livreService.getAllLivresByAuteur(auteur);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: livres }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
      }
    },
    
   /**
   * Récupère les livres par une page et avec une limite
   */
  async getAllLivresByPageLimit(req, res, page, limit){
    try {
      const livres = await livreService.getAllLivresByPageLimit(page, limit);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livres }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },
  
   /**
   * Récupère un livre par son id
   */
    async getLivreById(req, res, id){
     try {
       const livre = await livreService.getLivreById(id);
  
       res.writeHead(200, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ success: true, data: livre }));
     } catch (error) {
       res.writeHead(500, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
     }
  },

  /**
   * Crée un livre
   */
  async createLivre(req, res) {
    try {
      const livreData = await parseRequestBody(req);
      const result = await livreService.createLivre(livreData);          
           
      res.writeHead(201, { 'Content-Type': 'application/json' });
           
      res.end(JSON.stringify({
        success: true,
        message: 'Livre créé avec succès',
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
  * delete un livre de la base de données
  */
  async deleteLivre(req, res, id){
    try {
      const livre = await livreService.deleteLivre(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livre }));
    }
    catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message}));
    }
 },

   /**
  * met à jour un livre de la base de données
  */
   async updateLivre(req, res, id){
    try {
      const livreData = await parseRequestBody(req);
      const result = await livreService.updateLivre(livreData, id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livreData }));
    }
    catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message}));
    }
 }
}


