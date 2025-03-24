// models/Exemplaire.js

  export class Exemplaire {
      constructor(id, livre, etat, rare, disponible) {
        this.id = id;
        this.livre = livre;
        this.etat = etat;
        this.rare = rare;
        this.disponible = disponible;      
      }
    
    Validation
      estValide() {
        if (this.livre && isNaN(this.livre)) {        
            return { valide: false, erreur: "Le livre n'est pas valide" };
          }

        if (!this.etat  && isNaN(this.etat)) { 
          return { valide: false, erreur: "l'etat n'est pas valide" };
        }
  
        if (!this.rare || !([0, 1].includes(this.rare))) {
          return { valide: false, erreur: "L'atribut 'rare' n'est pas valide" };
        }

        if (!this.disponible || !([0, 1].includes(this.disponible))) {
            return { valide: false, erreur: "L'atribut 'disponible' n'est pas valide" };
        }

        return { valide: true, erreur: "" };
      }
    }
    