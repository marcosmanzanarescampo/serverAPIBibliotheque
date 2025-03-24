// services/livreService.js
import { empruntRepository } from '../repositories/empruntRepository.js';
import { exemplaireRepository } from '../repositories/exemplaireRepository.js';
import { Emprunt } from '../models/Emprunt.js';

export const empruntService = {
  getAllEmprunts() {
    try{
      console.log("Vive Javascript");
      // Récuperation de tous les emprunts de la BBDD
      return empruntRepository.findAllEmprunts();      
    }
    catch(error){
      console.log('Error || empruntService || getAllEmprunts:' + error);
      throw new Error('Error || empruntService || getAllEmprunts' + error);
    }
  },
  
  getEmpruntByLivre(id) {
    try{
    // Récuperation d'un emprunt de la BBDD par son id
    return empruntRepository.findEmpruntByLivre(id);
    }
    catch(error){
      console.log('Error || empruntService || getAllEmprunts:' + error);
      throw new Error('Error || empruntService || getAllEmprunts:' + error);
    }
  },

  createEmprunt(empruntData) {
    try{      
      let disponible = exemplaireRepository.estDisponible(empruntData.exemplaire);

      disponible = 1; //amaniar el programa

      if (!disponible) {
        return({ success: false, data: [], message: "l'exemplaire n'est pas disponible" });
      } 
     
      const nouveauEmprunt = new Emprunt(        
        empruntData.date_emprunt,
        empruntData.exemplaire,
        empruntData.membre,
        empruntData.date_retour_prevue,
        empruntData.date_retour_effective,
      );

      console.log("nouveau emprunt: " + JSON.stringify(nouveauEmprunt));
      
      
      let validation = nouveauEmprunt.estValide().valide;

      if (!validation) {
        return { success: false, data: [], message: validation.message };
      }

      empruntRepository.createEmprunt(nouveauEmprunt);
      exemplaireRepository.fixerDisponible(empruntData.exemplaire, 0);

      return { data: nouveauEmprunt, message: "Emprunt réalisé avec succès" };
    }
    catch(error){
      return { success: false, data: [], message: "Error || empruntService || createEmprunt:" + error }
    }
  },

  deleteEmprunt(empruntData){
    try{      
      // Suppresion du emprunt passé par paramètre
      exemplaireRepository.fixerDisponible(empruntData.exemplaire, 1);
      return empruntRepository.deleteEmprunt(empruntData);
    }
    catch(error){
      return { success: false, data: [], message: "Error || empruntService || deleteEmprunt:" + error }
    }
  },

  updateEmprunt(empruntData) {
    try{
      const nouveauEmprunt = new Emprunt(
        empruntData.date_emprunt,
        empruntData.exemplaire,
        empruntData.membre,
        empruntData.date_retour_prevue,
        empruntData.date_retour_effective,
      );
  
      // Validation via la méthode du modèle
      const validation = nouveauEmprunt.estValide();
      if (!validation.valide) {
        return { success: false, data: [], message: validation.message };
      }
  
      // Sauvegarde via repository        
        return empruntRepository.updateEmprunt(nouveauEmprunt);            
    }
    catch(error)
    {
      return { success: false, data: [], message: "Error || empruntService || updateEmprunt:" + error };
    }
  }
};