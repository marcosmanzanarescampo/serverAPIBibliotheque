//../repositories/exemplaireRepository.js
import { openDB } from '../config/database.js';
// import { Exemplaire } from '../models/Exemplaire.js';

const bd = await openDB();

export const exemplaireRepository = {
//   async findAllExemplaires() {

//     try{
//       console.log("livres / repository");
//       let stmt = await bd.prepare(`
//          SELECT L.id, L.titre, L.ISBN, L.annee_Publication, L.nb_Pages, L.editeur
//          FROM livre AS L
//       `);
   
//       const rows = await stmt.all(); 
      
//       // Transformation en instances de classe    
//       return rows.map(row => new Livre(
//         row.id,
//         row.titre,
//         row.ISBN,
//         row.annee_Publication,
//         row.nb_Pages,
//         row.editeur
//       ));      
//     }
//     catch{
//       console.log('Error fonction livreRepository' + error);
//       throw new Error('Error fonction livreRepository' + error);
//     };  
//   },

  
//   async findAllLivresByLivre(livre) {

//     try{
//       let stmt = await bd.prepare(`
//       SELECT L.*
//       FROM livre_categorie AS LC
//       JOIN livre AS L ON LC.livre = L.id
//       WHERE LC.categorie = ?;
//       `);
   
//       const rows = await stmt.all(categorie); 
      
//       // Transformation en instances de classe    
//       return rows.map(row => new Livre(
//         row.id,
//         row.titre,
//         row.ISBN,
//         row.annee_Publication,
//         row.nb_Pages,
//         row.editeur
//       ));      
//     }
//     catch{
//       console.log('Error fonction livreRepository' + error);
//       throw new Error('Error fonction livreRepository' + error);
//     };  
//   },

  
//   async findAllExemplaireByEtat(etat) {

//     try{
//       let stmt = await bd.prepare(`
//       SELECT L.*
//       FROM livre AS L
//       JOIN livre_auteur AS LA ON L.id = LA.livre
//         WHERE LA.auteur = ?
//       ;
//       `);
   
//       const rows = await stmt.all(auteur); 
      
//       // Transformation en instances de classe    
//       return rows.map(row => new Livre(
//         row.id,
//         row.titre,
//         row.ISBN,
//         row.annee_Publication,
//         row.nb_Pages,
//         row.editeur
//       ));      
//     }
//     catch{
//       console.log('Error fonction livreRepository' + error);
//       throw new Error('Error fonction livreRepository' + error);
//     };  
//   },
  
//   async findExemplaireById(id) {
//       try{
//         const stmt = await bd.prepare(`
//           SELECT L.id, L.titre, L.ISBN, L.annee_Publication, nb_Pages, editeur
//           FROM LIVRE L WHERE id = ?;
//         `);
//         const result = await stmt.get(id);
  
//        // Transformation en instances de classe
//         return new Livre(
//             result.id,
//             result.titre,
//             result.ISBN,
//             result.annee_Publication,
//             result.nb_Pages,
//             result.editeur
//         ); 
//       }
//       catch{
//         console.log('Error fonction livreRepository' + error);
//         throw new Error('Error fonction livreRepository' + error);
//       }      
//   },

//   async createExemplaire(exemplaire) {
//     try{
//       const stmt = await bd.prepare(`
//         INSERT INTO livre (titre, ISBN, annee_Publication, nb_Pages, editeur)
//         VALUES (?, ?, ?, ?, ?)
//       `);
  
//       const result = await stmt.run(
//         livre.titre,
//         livre.ISBN,
//         livre.annee_Publication,
//         livre.nb_Pages,
//         livre.editeur
//       );
  
//       return {
//         id: result.lastInsertRowid,
//         changes: result.changes
//       };

//     }
//     catch(error){
//       console.log('Error fonction livreRepository' + error);
//       throw new Error('Error fonction livreRepository' + error);
//     }
//   },

//   async deleteExemplaire(id){
//     try{
//       let stmt = await bd.prepare(`
//          DELETE 
//          FROM livre
//          WHERE id = ?
//       `);
   
//       const rows = await stmt.run(id); 

//       return {
//         id: rows.lastInsertRowid,
//         changes: rows.changes
//       };  
//     }
//     catch{
//       console.log('Error fonction livreRepository' + error);
//       throw new Error('Error fonction livreRepository' + error);
//     }; 
//   },
  
//   async updateExemplaire(exemplaire, id) {
//     try{
//       const stmt = await bd.prepare(`
//         UPDATE livre SET titre = ?, ISBN = ?, annee_Publication = ?, nb_Pages = ?, editeur = ?
//         WHERE id = ?
//       `);
  
//       const result = await stmt.run(
//         livre.titre,
//         livre.ISBN,
//         livre.annee_Publication,
//         livre.nb_Pages,
//         livre.editeur,
//         id
//       );
  
//       return {
//         id: result.lastInsertRowid,
//         changes: result.changes
//       };

//     }
//     catch(error){
//       console.log('Error fonction livreRepository' + error);
//       throw new Error('Error fonction livreRepository' + error);
//     }
//   }

async estDisponible(id){
    try{
    const stmt = await bd.prepare(`
        SELECT *
        FROM exemplaire        
        WHERE disponible = 1
        AND id = ?
    `);
    const result = await stmt.all(id);

    if (result.length > 0) return true
    else false;

    }
    catch(error){
        throw new Error("Error: exemplaireRepository | estDisponible:" + error);
    }
},

async fixerDisponible(id, value){
    try{
    const stmt = await bd.prepare(`
        UPDATE exemplaire
        SET disponible = ?
        WHERE id = ?
    `);
    const result = await stmt.run(value, id);
        
    return (result.changes > 0);
    }
    catch(error){
        return { success: false, data: [], message: "Error || exmplaireRepository || fixerDisponible:" + error };
    }       
}
};