// models/Livre.js

export class Livre {
    constructor(id, titre, ISBN, annee_Publication, nb_Pages, editeur) {
        this.id = id
        this.titre = titre;
        this.ISBN = ISBN;
        this.annee_Publication = annee_Publication;
        this.nb_Pages = nb_Pages;
        this.editeur = editeur;
    }
    
    // Validation
    estValide() {
        if (this.titre && isNaN(this.titre) || this.titre <= 0) {   
            return { valide: false, erreur: "Le titre n'est pas valide" };
        }
        
        if (this.ISBN && isNaN(this.ISBN) || this.ISBN <= 0) {        
            return { valide: false, erreur: "L'ISBN n'est pas valide" };
        }

        if (this.annee_Publication && isNaN(this.annee_Publication) || this.annee_Publication <= 0) {        
            return { valide: false, erreur: "L'année de publication n'est pas valide" };
        }

        if (this.nb_Pages && isNaN(this.nb_Pages) || this.membre <= 0) {        
            return { valide: false, erreur: "Le numèro de pages n'est pas valide" };
        }

        if (this.editeur && isNaN(this.editeur) || this.editeur <= 0) {        
            return { valide: false, erreur: "L'éditeur n'est pas valide" };
        }
        return { valide: true };
        }
      }
  