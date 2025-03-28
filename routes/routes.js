// routes/routes.js
import { livreController } from '../controllers/livreController.js';
import { editeurController } from '../controllers/editeurControler.js';
import { auteurController } from '../controllers/auteurController.js';
import { empruntController } from '../controllers/empruntController.js';

export const routes = (app) => {
  // Routes pour les livres
  app.get('/api/livres', livreController.getAllLivres);
  app.post('/api/livres', livreController.createLivre);
  app.get('/api/livres/:id', livreController.getLivreById);
  app.put('/api/livres/:id', livreController.updateLivre);
  app.delete('/api/livres/:id', livreController.deleteLivre);

  // Routes pour les auteurs
  app.post('/api/auteurs', auteurController.createAuteur);
  app.get('/api/auteurs/:id', auteurController.getAuteurById);
  app.put('/api/auteurs/:id', auteurController.updateAuteur);
  app.delete('/api/auteurs/:id', auteurController.deleteAuteur);

  // Routes pour les emprunts
  app.get('/api/emprunts', empruntController.getAllEmprunts);
  app.get('/api/emprunts/:id', empruntController.getEmpruntByLivre);
  app.post('/api/emprunts', empruntController.createEmprunt);
  app.patch('/api/emprunts', empruntController.updateEmprunt);
  app.delete('/api/emprunts', empruntController.deleteEmprunt);

  // Routes pour les editeurs
  app.get('/api/editeurs', editeurController.getAllEditeurs);

  // Routes pour la recherche de livres
  app.get('/api/livres/titre/:titre', livreController.getAllLivresByTitre);
};