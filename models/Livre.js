// models/Livre.js
export class Livre {
    constructor(id, titre, ISBN, annee_Publication, nb_Pages, editeur_id) {
        this.id = id;
        this.titre = titre;
        this.ISBN = ISBN;
        this.annee_Publication = annee_Publication;
        this.nb_Pages = nb_Pages;
        this.editeur_id = editeur_id;
    }
    
    // Validation method
    estValide() {
        // Validation logic remains similar
        if (!this.titre || typeof this.titre !== 'string') {   
            return { valide: false, erreur: "Le titre n'est pas valide" };
        }
        
        if (!this.ISBN || typeof this.ISBN !== 'string') {        
            return { valide: false, erreur: "L'ISBN n'est pas valide" };
        }

        if (this.annee_Publication && (isNaN(this.annee_Publication) || this.annee_Publication <= 0)) {        
            return { valide: false, erreur: "L'année de publication n'est pas valide" };
        }

        if (this.nb_Pages && (isNaN(this.nb_Pages) || this.nb_Pages <= 0)) {        
            return { valide: false, erreur: "Le nombre de pages n'est pas valide" };
        }

        if (!this.editeur_id || isNaN(this.editeur_id) || this.editeur_id <= 0) {        
            return { valide: false, erreur: "L'éditeur n'est pas valide" };
        }

        return { valide: true };
    }
}