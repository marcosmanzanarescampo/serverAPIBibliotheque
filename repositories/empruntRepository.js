import { openDB } from '../config/database.js';
import { Emprunt } from '../models/Emprunt.js';

const bd = await openDB();

export const empruntRepository = {
  async findAllEmprunts() {

    try{
      let stmt = await bd.prepare(`
         SELECT E.date_emprunt, E.exemplaire, E.membre, E.date_retour_prevue, E.date_retour_effective
         FROM emprunt AS E
      `);
   
      const rows = await stmt.all(); 
      // Transformation en instances de classe    
      return rows.map(row => new Emprunt(        
        row.date_emprunt,
        row.exemplaire,
        row.membre,
        row.date_retour_prevue,
        row.date_retour_effective        
      ));      
    }
    catch{
      console.log('Error fonction empruntRepository' + error);
      throw new Error('Error fonction empruntRepository' + error);
    };  
  },
  
  async findEmpruntByLivre(id) { //Obtenir les exemplaires empruntés d'un livre avec id = id
      try{
        console.log("REPOSITORY: findEmpruntByLivre");
        
        const stmt = await bd.prepare(`
        SELECT L.titre, EM.date_emprunt, EM.exemplaire, EM.membre, EM.date_retour_prevue, EM.date_retour_effective 
        FROM emprunt AS EM
        JOIN exemplaire AS EX ON EX.id = EM.exemplaire
        JOIN livre AS L ON EX.livre = L.id
        WHERE L.id = ?
        `);

        const result = await stmt.get(id);
       // Transformation en instances de classe

        return new Emprunt(
            result.date_emprunt,
            result.exemplaire,
            result.prenom,
            result.membre,
            result.date_retour_prevue,
            result.date_retour_effective
        ); 
      }
      catch{
        console.log('Error fonction auteurRepository' + error);
        throw new Error('Error fonction auteurRepository' + error);
      }      
  },

  async createEmprunt(emprunt) {
    try{
      const stmt = await bd.prepare(`
        INSERT INTO emprunt (date_emprunt, exemplaire, membre, date_retour_prevue, date_retour_effective)
        VALUES (?, ?, ?, ?, ?)
      `);
  
      const result = await stmt.run(
        emprunt.date_emprunt,
        emprunt.exemplaire,
        emprunt.membre,
        emprunt.date_retour_prevue,
        emprunt.date_retour_effective
      );

      const nouveauEmprunt = new Emprunt(        
        emprunt.date_emprunt,
        emprunt.exemplaire,
        emprunt.membre,
        emprunt.date_retour_prevue,
        emprunt.date_retour_effective,
      );
  
      return {
        data: JSON.stringify(nouveauEmprunt)
      };

    }
    catch(error){
      console.log("Error: Imposible de enregistrer l'emprunt: " + error);
      throw new Error("Error: Imposible de enregistrer l'emprunt: !:");
    }
  },

  async deleteEmprunt(emprunt){
    try{
      let stmt = await bd.prepare(`
      DELETE FROM emprunt
      WHERE date_emprunt = ? 
        AND exemplaire = ? 
        AND membre = ?;
      `);

      const rows = await stmt.run(
        emprunt.date_emprunt,
        emprunt.exemplaire,
        emprunt.membre
      ); 

      return {
        id: rows.lastInsertRowid,
        changes: rows.changes
      };  
    }
    catch{
      console.log('Error fonction auteurRepository' + error);
      throw new Error('Error fonction auteurRepository' + error);
    }; 
  },
  
  async updateEmprunt(emprunt) {
    try{
      const stmt = await bd.prepare(`
      UPDATE emprunt 
      SET date_retour_prevue = ? 
      WHERE date_emprunt = ? 
      AND exemplaire = ? 
      AND membre = ?;
      `);
  
      const result = await stmt.run(
        emprunt.date_retour_prevue,
        emprunt.date_emprunt,
        emprunt.exemplaire,
        emprunt.membre,
      );
  
      return {
c
      };

    }
    catch(error){
      console.log("Error: L'opération de modification de l'emprunt a échouée");
      throw new Error("Error: L'opération de modification de l'emprunt a échouée");
    }
  },
};