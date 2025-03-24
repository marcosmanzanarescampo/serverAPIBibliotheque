// controllers/categorieController.js
import { categorieService } from '../services/categorieService.js';
import { parseRequestBody } from '../utils/httpHelper.js';

export const categorieController = {
  /**
   * Récupère tous les categories
   */
  async getAllCategories(req, res) {
    try {
      const categories = await categorieService.getAllCategories();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: categories }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

   /**
   * Récupère une categorie par son id
   */
    async getCategorieById(req, res, id){
     try {      
       const categorie = await categorieService.getCategorieById(id);
       res.writeHead(200, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ success: true, data: categorie }));
     } catch (error) {
       res.writeHead(500, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
     }
  },

  /**
   * Crée une categorie
   */
  async createCategorie(req, res) {
    try {
      const categorieData = await parseRequestBody(req);
      const result = empruntService.createCategorie(categorieData);      
           
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
  * delete une categorie de la base de données
  */
  async deleteCategorie(req, res){    
    try {
      const categorieData = await parseRequestBody(req);     
      const emprunt = await empruntService.deleteCategorie(categorieData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: categorie }));
    }
    catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message}));
    }
 },

   /**
  * met à jour une categorie de la base de données
  */
   async updateCategorie(req, res, id){
    try {
      const categorieData = await parseRequestBody(req);
      const result = await categorieService.updateCategorie(categorieData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: categorieData }));
    }
    catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message}));
    }
 }
}


