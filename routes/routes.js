// routes/routes.js
import { livreController } from '../controllers/livreController.js';
import { editeurController } from '../controllers/editeurControler.js';
import { auteurController } from '../controllers/auteurController.js';
import { empruntController } from '../controllers/empruntController.js';
import { logger } from '../utils/logger.js';

// functions additionales
const getPages = (str) => {
  return str.substring(str.indexOf("=")+1, str.indexOf('&'))
}
const getLimit = (str) => {
  return str.substring(str.lastIndexOf("=")+1);
}

const getTitle = (str) => {
  // return replace('/api/livres/titre/', '').replace(/%20/g, ' ');
  return str.substring(str.lastIndexOf("/")+1);
};
// **********************

export const routes = (req, res) => {
  const url = req.url.replace(/%20/g, ' ');
  const method = req.method;

  // Routes pour les livres
  if (url === '/api/livres' && method === 'GET') {//ok
    livreController.getAllLivres(req, res);
  }
  else if (url === '/api/livres' && method === 'POST') {//ok
    livreController.createLivre(req, res);
  }
  else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === 'GET') {//ok
    const id = url.split('/')[3];
    livreController.getLivreById(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === 'PUT') {//ok
    const id = url.split('/')[3];
    livreController.updateLivre(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === 'DELETE') {//ok
    const id = url.split('/')[3];
    livreController.deleteLivre(req, res, parseInt(id));
  }

  // Routes pour les auteurs (à implémenter)
  else  if (url === '/api/auteurs' && method === 'GET') { //ok
    auteurController.getAllAuteurs(req, res);
  }
  else if (url === '/api/auteurs' && method === 'POST') { //ok
    auteurController.createAuteur(req, res);
  }
  else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === 'GET') {//ok
    const id = url.split('/')[3];
    auteurController.getAuteurById(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === 'PUT') {//ok
    const id = url.split('/')[3];
    auteurController.updateAuteur(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === 'DELETE') {//ok
    const id = url.split('/')[3];
    auteurController.deleteAuteur(req, res, parseInt(id));
  }  
  // Routes pour les auteurs (à implémenter) *******************************
  else  if (url === '/api/emprunts' && method === 'GET') {//ok
    empruntController.getAllEmprunts(req, res);
  }
  else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === 'GET') { //ok
    const id = url.split('/')[3];    
    empruntController.getEmpruntByLivre(req, res, parseInt(id));
  }
  else if (url === '/api/emprunts' && method === 'POST') { 
    empruntController.createEmprunt(req, res);
  }
  else if (url === '/api/emprunts' && method === 'PATCH') { //ok
    const id = url.split('/')[3];
    empruntController.updateEmprunt(req, res, parseInt(id));
  }
  else if ('/api/emprunts' && method === 'DELETE') { //ok
    const id = url.split('/')[3];
    empruntController.deleteEmprunt(req, res);
  }
  // Routes pour les emprunts **********************************

   // Routes pour les editeurs*********************************
  else  if (url === '/api/editeurs' && method === 'GET') { //ok
    editeurController.getAllEditeurs(req, res);
  }
  // Routes pour les editeurs*********************************

   // Routes pour la recherche de livres ***********************
   else  if (url.match(/^\/api\/livres\/titre\/([a-zA-Z0-9- ]+)$/) && method === 'GET') { //ok
    const titre = getTitle(url);
    livreController.getAllLivresByTitre(req, res, titre);    
  }
  // Routes pour la recherche de livre ************************
  
  else if(url.match(/^\/api\/livres\?categorie=\d+$/) && method === 'GET'){ //ok
    const categorie = url.split('=')[1];
    livreController.getAllLivresByCategorie(req, res, parseInt(categorie));       
  }
  else if(url.match(/^\/api\/livres\?auteur=\d+$/) && method === 'GET'){ //ok
    const auteur = url.split('=')[1];
    livreController.getAllLivresByAuteur(req, res, parseInt(auteur));       
  }
  else if(url.match(/^\/api\/livres\?page=\d+&limit=\d+$/) && method === 'GET'){ //ok
    const page = getPages(url);
    const limit = getLimit(url);

    livreController.getAllLivresByPageLimit(req, res, parseInt(page), parseInt(limit));       
  }
    // Routes les fonctionalitées avancées **********************************    

  // Route non trouvée
  else {
    logger.warn(`Route non trouvée: ${method} ${url}`);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Route non trouvée' }));
  }
};
