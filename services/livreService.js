// services/livreService.js
import { livreRepository } from '../repositories/livreRepository.js';
import { Livre } from '../models/Livre.js';

export const livreService = {
  getAllLivres() {
    try{
      // Récuperation de tous les livres de la BBDD
      return livreRepository.findAllLivres();      
    }
    catch(error){
      throw new Error('Error || livreService || getAllLivres' + error);
    }
  },


  getAllLivresByTitre(titre) {
    try{   
      // Récuperation de tous les livres de la BBDD incluynt le texte 'titre' dans son titre
      return livreRepository.findAllLivresByTitre(titre);      
    }
    catch(error){
      throw new Error('Error || livreService || getAllLivresByTitre' + error);
    }
  },

  getAllLivresByCategorie(categorie){
    try{
      // Récuperation de tous les livres de la BBDD par la categorie 'categorie'
      return livreRepository.findAllLivresByCategorie(categorie);      
    }
    catch(error){
      throw new Error('Error || livreService ||  getLivresByCategorie' + error);
    } 
  },

  
  getAllLivresByAuteur(auteur){
    try{
      // Récuperation de tous les livres de la BBDD par l'auteur 'auteur'
      return livreRepository.findAllLivresByAuteur(auteur);      
    }
    catch(error){
      throw new Error('Error || livreService ||  getLivresByAuteur' + error);
    } 
  },

  
  getAllLivresByPageLimit(page, limit){
    try{
      // Récuperation de tous les livres de la BBDD par l'auteur 'auteur'
      return livreRepository.findAllLivresByPageLilmit(page, limit);      
    }
    catch(error){
      throw new Error('Error || livreService ||  getLivresByAuteur' + error);
    } 
  },
  
  getLivreById(id) {
    try{
    // Récuperation d'un livre de la BBDD par son id
    return livreRepository.findLivreById(id);
    }
    catch(error){
      throw new Error('Error || livreService || getAllLivres' + error);
    }
  },

  createLivre(livreData) {
    try{
      const nouveauLivre = new Livre(
        null, // ID sera généré par la base de données
        livreData.titre,
        livreData.ISBN,
        livreData.annee_Publication || null,
        livreData.nb_Pages || null,
        livreData.editeur
      );
  
      // Validation via la méthode du modèle
      const validation = nouveauLivre.estValide();
      if (!validation.valide) {
        throw new Error(validation.erreur);
      }
  
      // Sauvegarde via repository
      return livreRepository.createLivre(nouveauLivre);    
    }
    catch(error){
      throw new Error('Error || livreService || createLivre' + error);
    }
  },

  deleteLivre(id){
    try{
      // Suppresion du livre avec id = id
      return livreRepository.deleteLivre(id);
    }
    catch(error){
      throw new Error('Error || livreService || deleteLivre' + error);
    }
  },

  updateLivre(livreData, id) {
    try{
      const nouveauLivre = new Livre(
        null,
        livreData.titre,
        livreData.ISBN,
        livreData.annee_Publication || null,
        livreData.nb_Pages || null,
        livreData.editeur
      );
  
      // Validation via la méthode du modèle
      const validation = nouveauLivre.estValide();
      if (!validation.valide) {
        throw new Error(validation.erreur);
      }
  
      // Sauvegarde via repository
      return livreRepository.updateLivre(nouveauLivre, id);     
    }
    catch(error)
    {
      throw new Error('Error || livreService || updateLivre' + error);
    }
  }
};
