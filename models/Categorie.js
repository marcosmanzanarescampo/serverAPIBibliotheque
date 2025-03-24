// models/Categorie.js

  export class Categorie {
      constructor(categorie) {
        this.categorie = categorie
      }
    
      // Validation
      estValide() {  
        if (this.categorie && isNaN(this.categorie)) {        
          return { valide: false, erreur: "La categorie n'est pas valide" };
        }
    
        return { valide: true };
      }
    }
    