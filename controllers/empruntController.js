// controllers/livreController.js
import { empruntService } from '../services/empruntService.js';
import { parseRequestBody } from '../utils/httpHelper.js';

export const empruntController = {
  /**
   * Récupère tous les emprunts
   */
  async getAllEmprunts(req, res) {
    try {
      const emprunts = await empruntService.getAllEmprunts();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: emprunts }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

   /**
   * Récupère un emprunt par son id
   */
    async getEmpruntByLivre(req, res, id){
     try {      
       const emprunts = await empruntService.getEmpruntByLivre(id);
      console.log('Je suis espagnole')
       console.log("CONTROLLER: Emprunt reçu: " + JSON.stringify(emprunts));//mais l'emprunt est vide!!!       
  
       res.writeHead(200, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ success: true, data: emprunts }));
     } catch (error) {
       res.writeHead(500, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
     }
  },

  /**
   * Crée un emprunt
   */
  async createEmprunt(req, res) {
    try {
      const empruntData = await parseRequestBody(req);
      const result = empruntService.createEmprunt(empruntData);      
           
      res.writeHead(201, { 'Content-Type': 'application/json' });
           
      res.end(JSON.stringify({
        success: result.success,
        message: result.message,
        data: result.data
      }));
    }
    catch (error) {
      const statusCode = error.message.includes('requis') ? 400 : 500;

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  },

  /**
  * delete un emprunt de la base de données
  */
  async deleteEmprunt(req, res){    
    try {
      const empruntData = await parseRequestBody(req);     
      const emprunt = await empruntService.deleteEmprunt(empruntData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: emprunt }));
    }
    catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message}));
    }
 },

   /**
  * met à jour un emprunt de la base de données (seulemenet la date de retour effective!)
  */
   async updateEmprunt(req, res, id){
    try {
      const empruntData = await parseRequestBody(req);
      const result = await empruntService.updateEmprunt(empruntData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: empruntData }));
    }
    catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message}));
    }
 }
}


