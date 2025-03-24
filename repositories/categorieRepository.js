// repositories/auteurRepository.js
import { openDB } from '../config/database.js';
import { Categorie } from '../models/Categorie.js';

const bd = await openDB();

export const categorieRepository = {
  async findAllCategories() {

    try{
      let stmt = await bd.prepare(`
         SELECT *
         FROM categorie
      `);
   
      const rows = await stmt.all(); 
      // Transformation en instances de classe    
      return rows.map(row => new Categorie(
        row.id,
        row.categorie      
      ));      
    }
    catch{
      return { success: false, data: [], message: "Error || categorieRepository || findAllCategories:" + error };
    };  
  },
  
  async findCategorieById(id) {
      try{
        const stmt = await bd.prepare(`
        SELECT *
         FROM categorie
         WHERE id = ?;
        `);
        const result = await stmt.get(id);
  
       // Transformation en instances de classe
        return new Categorie(
            result.id,
            result.categorie  
        ); 
      }
      catch{
        return { success: false, data: id, message: "Error || categorieRepository || findCategorieById:" + error };
      }      
  },

  async createCategorie(categorie) {
    try{
      const stmt = await bd.prepare(`
        INSERT INTO categorie (categorie)
        VALUES (?)
      `);
  
      const result = await stmt.run(
        categorie.categorie
      );
  
      return { success: true, data: categorie, message: "Categorie créée avec succès" };
    }
    catch(error){
      return { success: false, data: [], message: "Error || categorieRepository || createCategorie:" + error };
    }
  },

  async deleteCategorie(id){
    try{
      let stmt = await bd.prepare(`
         DELETE 
         FROM categorie
         WHERE id = ?
      `);
   
      const rows = await stmt.run(id); 

      return { success: true, data: id, message: "categorie supprimée avec succès" };
    }
    catch{
      return { success: false, data: [], message: "Error || categorieRepository || deleteCategorie:" + error };
    }; 
  },
  
  async updateCategorie(categorie, id) {
    try{
      const stmt = await bd.prepare(`
        UPDATE categorie
        SET categorie = ?
        WHERE id = ?
      `);
  
      const result = await stmt.run(
        categorie.categorie,
        id
      );
  
      return { success: true, data: auteur, message: "categorie misé à jour avec succès" };

    }
    catch(error){
      return { success: false, data: [], message: "Error || categorieRepository || updateCategorire:" + error };
    }
  }
};