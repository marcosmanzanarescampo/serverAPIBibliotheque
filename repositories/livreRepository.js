// repositories/livreRepository.js
import { openDB } from '../config/database.js';
import { Livre } from '../models/Livre.js';

const bd = await openDB();

export const livreRepository = {
  async findAllLivres() {

    try{
      let stmt = await bd.prepare(`
         SELECT L.id, L.titre, L.ISBN, L.annee_Publication, L.nb_Pages, L.editeur
         FROM livre AS L
      `);
   
      const rows = await stmt.all(); 
      
      // Transformation en instances de classe    
      return rows.map(row => new Livre(
        row.id,
        row.titre,
        row.ISBN,
        row.annee_Publication,
        row.nb_Pages,
        row.editeur
      ));      
    }
    catch{
      console.log('Error fonction livreRepository' + error);
      throw new Error('Error fonction livreRepository' + error);
    };  
  },

  async findAllLivresByTitre(titre) {
    try{
      let stmt = await bd.prepare(`
         SELECT *
         FROM livre
         WHERE titre LIKE ?
      `);
   
      const rows = await stmt.all(`%${titre}%`); 
      
      // Transformation en instances de classe    
      return rows.map(row => new Livre(
        row.id,
        row.titre,
        row.ISBN,
        row.annee_Publication,
        row.nb_Pages,
        row.editeur
      ));      
    }
    catch{
      console.log('Error fonction livreRepository' + error);
      throw new Error('Error fonction livreRepository' + error);
    };  
  },

  
  async findAllLivresByCategorie(categorie) {

    try{
      let stmt = await bd.prepare(`
      SELECT L.*
      FROM livre_categorie AS LC
      JOIN livre AS L ON LC.livre = L.id
      WHERE LC.categorie = ?;
      `);
   
      const rows = await stmt.all(categorie); 
      
      // Transformation en instances de classe    
      return rows.map(row => new Livre(
        row.id,
        row.titre,
        row.ISBN,
        row.annee_Publication,
        row.nb_Pages,
        row.editeur
      ));      
    }
    catch{
      console.log('Error fonction livreRepository' + error);
      throw new Error('Error fonction livreRepository' + error);
    };  
  },

  
  async findAllLivresByAuteur(auteur) {

    try{
      let stmt = await bd.prepare(`
      SELECT L.*
      FROM livre AS L
      JOIN livre_auteur AS LA ON L.id = LA.livre
        WHERE LA.auteur = ?
      ;
      `);
   
      const rows = await stmt.all(auteur); 
      
      // Transformation en instances de classe    
      return rows.map(row => new Livre(
        row.id,
        row.titre,
        row.ISBN,
        row.annee_Publication,
        row.nb_Pages,
        row.editeur
      ));      
    }
    catch{
      console.log('Error fonction livreRepository' + error);
      throw new Error('Error fonction livreRepository' + error);
    };  
  },

  
  async findAllLivresByPageLilmit(page, limit) {
    try{
      let stmt = await bd.prepare(`
      SELECT L.*
      FROM livre AS L
      LIMIT ?,?      
      `);

      // console.log(`LIMIT ${parseInt((page)-1)*parseInt(limit)}, ${limit}`);      
   
      const rows = await stmt.all((page-1)*limit, limit);       

      console.log("resultat: " + JSON.stringify(rows));
      
      // Transformation en instances de classe    
      return rows.map(row => new Livre(
        row.id,
        row.titre,
        row.ISBN,
        row.annee_Publication,
        row.nb_Pages,
        row.editeur
      ));      
    }
    catch{
      console.log('Error fonction livreRepository' + error);
      throw new Error('Error fonction livreRepository' + error);
    };  
  },
  
  async findLivreById(id) {
      try{
        const stmt = await bd.prepare(`
          SELECT L.id, L.titre, L.ISBN, L.annee_Publication, nb_Pages, editeur
          FROM LIVRE L WHERE id = ?;
        `);
        const result = await stmt.get(id);
  
       // Transformation en instances de classe
        return new Livre(
            result.id,
            result.titre,
            result.ISBN,
            result.annee_Publication,
            result.nb_Pages,
            result.editeur
        ); 
      }
      catch{
        console.log('Error fonction livreRepository' + error);
        throw new Error('Error fonction livreRepository' + error);
      }      
  },

  async createLivre(livre) {
    try{
      const stmt = await bd.prepare(`
        INSERT INTO livre (titre, ISBN, annee_Publication, nb_Pages, editeur)
        VALUES (?, ?, ?, ?, ?)
      `);
  
      const result = await stmt.run(
        livre.titre,
        livre.ISBN,
        livre.annee_Publication,
        livre.nb_Pages,
        livre.editeur
      );
  
      return {
        id: result.lastInsertRowid,
        changes: result.changes
      };

    }
    catch(error){
      console.log('Error fonction livreRepository' + error);
      throw new Error('Error fonction livreRepository' + error);
    }
  },

  async deleteLivre(id){
    try{
      let stmt = await bd.prepare(`
         DELETE 
         FROM livre
         WHERE id = ?
      `);
   
      const rows = await stmt.run(id); 

      return {
        id: rows.lastInsertRowid,
        changes: rows.changes
      };  
    }
    catch{
      console.log('Error fonction livreRepository' + error);
      throw new Error('Error fonction livreRepository' + error);
    }; 
  },
  
  async updateLivre(livre, id) {
    try{
      const stmt = await bd.prepare(`
        UPDATE livre SET titre = ?, ISBN = ?, annee_Publication = ?, nb_Pages = ?, editeur = ?
        WHERE id = ?
      `);
  
      const result = await stmt.run(
        livre.titre,
        livre.ISBN,
        livre.annee_Publication,
        livre.nb_Pages,
        livre.editeur,
        id
      );
  
      return {
        id: result.lastInsertRowid,
        changes: result.changes
      };

    }
    catch(error){
      console.log('Error fonction livreRepository' + error);
      throw new Error('Error fonction livreRepository' + error);
    }
  }
};