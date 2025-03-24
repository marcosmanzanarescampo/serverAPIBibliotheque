// models/Editeur.js
  export class Editeur {
      constructor(id, editeur) {
        this.id = id;
        this.editeur = editeur;
      }
    
      // Validation
      estValide() {
        if (!this.editeur || this.editeur.trim() === '') {
          return { valide: false, erreur: "L'editeur n'est pas valide" };
        }
  
        return { valide: true };
      }

      getEditeur(){
        return this.editeur;
      }
    }
    