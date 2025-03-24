// controllers/editeurController.js
import { editeurService } from '../services/editeurService.js';
import { parseRequestBody } from '../utils/httpHelper.js';

export const editeurController = {
  /**
   * Récupère tous les editeurs
   */
  async getAllEditeurs(req, res) {
    try {      
      const editeurs = await editeurService.getAllEditeurs();
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: editeurs }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

//    /**
//    * Récupère un auteur par son id
//    */
//     async getAuteurById(req, res, id){
//      try {      
//        const auteur = await auteurService.getAuteurById(id);
  
//        res.writeHead(200, { 'Content-Type': 'application/json' });
//        res.end(JSON.stringify({ success: true, data: auteur }));
//      } catch (error) {
//        res.writeHead(500, { 'Content-Type': 'application/json' });
//        res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
//      }
//   },

//   /**
//    * Crée un auteur
//    */
//   async createAuteur(req, res) {
//     try {
//       const auteurData = await parseRequestBody(req);
//       const result = await auteurService.createAuteur(auteurData);          
           
//       res.writeHead(201, { 'Content-Type': 'application/json' });
           
//       res.end(JSON.stringify({
//         success: true,
//         message: 'auteur créé avec succès',
//         data: { id: result.id }
//       }));
//     }
//     catch (error) {
//       const statusCode = error.message.includes('requis') ? 400 : 500;

//       res.writeHead(statusCode, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ success: false, error: error.message }));
//     }
//   },

//   /**
//   * delete un auteur de la base de données
//   */
//   async deleteAuteur(req, res, id){
//     try {
//       const auteur = await auteurService.deleteAuteur(id);

//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ success: true, data: auteur }));
//     }
//     catch (error) {
//       res.writeHead(500, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ success: false, error: error.message}));
//     }
//  },

//    /**
//   * met à jour un auteur de la base de données
//   */
//    async updateAuteur(req, res, id){
//     try {
//       const auteurData = await parseRequestBody(req);
//       const result = await auteurService.updateAuteur(auteurData, id);

//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ success: true, data: auteurData }));
//     }
//     catch (error) {
//       res.writeHead(500, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ success: false, error: error.message}));
//     }
//  }
}