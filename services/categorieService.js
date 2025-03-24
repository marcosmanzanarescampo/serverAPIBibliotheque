// services/categorieService.js
import { categorieRepository } from '../repositories/categorieRepository.js';
import { Categorie } from '../models/Categorie.js';

export const categorieService = {
  getAllCategories() {
    try{
      // Récuperation de tous les categorie de la BBDD
      return categorieRepository.findAllCategories();
    }
    catch(error){
      throw new Error('Error || categorieService || getAllCategories:' + error);
    }
  },
  
  getCategorieById(id) {
    try{    
    // Récuperation d'une categorie de la BBDD par son id
    return categorieRepository.findCategorieById(id);
    }
    catch(error){
      throw new Error('Error || categorieService || getAllCategories:' + error);
    }
  },

  createCategorie(categorieData) {
    try{
      const nouveleCategorie = new Categorie(
        null, // ID sera généré par la base de données
        categorieData.categorie
      );
  
      // Validation via la méthode du modèle
      const validation = nouveleCategorie.estValide();
      if (!validation.valide) {
        throw new Error(validation.erreur);
      }
  
      // Sauvegarde via repository
      return categorieRepository.createCategorie(nouveleCategorie);    
    }
    catch(error){
      throw new Error('Error || categorieService || createCategorie' + error);
    }
  },

  deleteCategorie(id){
    try{
      // Suppresion d'une categorie avec id = id
      return categorieRepository.deleteCategorire(id);
    }
    catch(error){
      throw new Error('Error || categorieService || deleteCategorie:' + error);
    }
  },

  updateCategorie(categorieData, id) {
    try{
      const nouveleCategorie = new Categorie(
        null, // ID sera généré par la base de données
        categorieData.categorie
      );
  
      // Validation via la méthode du modèle
      const validation = nouveleCategorie.estValide();
      if (!validation.valide) {
        throw new Error(validation.erreur);
      }
  
      // Sauvegarde via repository
      return categorieRepository.updateCategorie(nouveleCategorie, id);     
    }
    catch(error)
    {
      throw new Error('Error || categorieService || updateCategorie:' + error);
    }
  }
};
