// utils/db.js
import { openDB } from '../config/database.js';

/**
 * Ouvre une connexion à la base de données SQLite.
 * @returns {Promise<import('sqlite').Database>} Instance de la base de données.
*/
async function initDb() {
    try {
       const db = await openDB();  
       
       await db.exec("PRAGMA foreign_keys = ON;");
        
        //sérializer les opérations avec la base de données
        db.getDatabaseInstance().serialize(() => {
        
            // 2. Creation of tables
          createTables(db);
     
            // 3. Population of tables
           populeTables(db);
        });

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
 };


/**
 * Initialise la structure de la base de données.
 * @param {import('sqlite').Database} db - Instance de la base de données.
 */
async function createTables(db) {
    try {
        console.log('1. Creating tables...');

        db.getDatabaseInstance().serialize(() => {

            // création de la table LIVRE
            db.exec(`DROP TABLE IF EXISTS livre;`);
            db.run(`CREATE TABLE IF NOT EXISTS livre (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titre VARCHAR(100) NOT NULL,
                ISBN VARCHAR(17) UNIQUE NOT NULL,
                annee_Publication INTEGER,
                nb_Pages INTEGER,
                editeur INTEGER NOT NULL,
                FOREIGN KEY (editeur) REFERENCES editeur(id))`);
            console.log('table livre created.'); 

            // création de la table EDITEUR
            db.exec(`DROP TABLE IF EXISTS editeur;`);
            db.run(`CREATE TABLE IF NOT EXISTS editeur (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            editeur varchar(100) UNIQUE NOT NULL)`
        );
        console.log('table editeur created.'); 

        // création de la table NATIONALITE 
        db.exec(`DROP TABLE IF EXISTS nationalite;`);      
        db.run(`CREATE TABLE IF NOT EXISTS nationalite (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nationalite varchar(100) NOT NULL
            )
        `);
        console.log('table nationalite created.'); 

        // création de la table AUTEUR
        db.exec(`DROP TABLE IF EXISTS auteur;`);
        db.run(`CREATE TABLE IF NOT EXISTS auteur (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom varchar(100) NOT NULL,
                prenom varchar(17) NOT NULL,
                date_naissance DATE,
                nationalite INTEGER NOT NULL,
                FOREIGN KEY (nationalite) REFERENCES nationalite(id)
                )
            `);
        console.log('table auteur created.');    

        // création de la table CATEGORIE
        db.exec(`DROP TABLE IF EXISTS categorie;`);
        db.run(`CREATE TABLE IF NOT EXISTS categorie (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            categorie varchar(100) NOT NULL
            )`
        );
        console.log('table categorie created.'); 


        // création de la table ETAT
        db.exec(`DROP TABLE IF EXISTS etat;`);
        db.run(`CREATE TABLE IF NOT EXISTS etat (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                etat varchar(50)
              )
        `);
        console.log('table etat created.'); 

        // création de la table EXEMPLAIRE        
        db.exec(`DROP TABLE IF EXISTS exemplaire;`);
        db.run(`CREATE TABLE IF NOT EXISTS exemplaire (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                livre INTEGER NOT NULL,
                etat INTEGER NOT NULL,
                rare BOOLEAN DEFAULT FALSE,
                disponible BOOLEAN DEFAULT TRUE,
                FOREIGN KEY (livre) REFERENCES livre(id),
                FOREIGN KEY (etat) REFERENCES etat(id))`
        );
        console.log('table exemplaire created.'); 

                // création de la table MEMBRE  
        db.exec(`DROP TABLE IF EXISTS membre;`);
        db.run(`CREATE TABLE IF NOT EXISTS membre (
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 nom VARCHAR(50),
                 prenom VARCHAR(50),
                 mail VARCHAR(100) UNIQUE,
                 telephone VARCHAR(10),
                 date_inscription DATE DEFAULT (now()))`
            );
        console.log('table  membre created.');

        // création de la table LIVRE-AUTEUR
        db.exec(`DROP TABLE IF EXISTS livre_auteur;`);
        db.run(`CREATE TABLE IF NOT EXISTS livre_auteur (
            livre INTEGER NOT NULL,
            auteur INTEGER NOT NULL,
            PRIMARY KEY (livre, auteur),
            FOREIGN KEY (livre) REFERENCES livre(id),
            FOREIGN KEY (auteur) REFERENCES auteur(id)            
            )
        `);
        console.log('table  livre_auteur created.');


        // création de la table LIVRE-CATEGORIE
        db.exec(`DROP TABLE IF EXISTS livre_categorie;`);
        db.run(`CREATE TABLE IF NOT EXISTS livre_categorie (
        livre INTEGER,
        categorie INTEGER,
        PRIMARY KEY (livre, categorie),
        FOREIGN KEY (livre) REFERENCES livre(id),
        FOREIGN KEY (categorie) REFERENCES categorie(id)
        )`
        );
        console.log('table  livre-categorie created.');  

        // création de la table EMPRUNT
        db.exec(`DROP TABLE IF EXISTS emprunt;`);    
        db.run(`CREATE TABLE IF NOT EXISTS emprunt (
        date_emprunt DATE NOT NULL DEFAULT (now()),
        exemplaire NTEGER NOT NULL,
        membre INTEGER NOT NULL,
        date_retour_prevue DATE NOT NULL,
        date_retour_effective DATE,
        PRIMARY KEY (date_emprunt, exemplaire, membre),
        FOREIGN KEY (exemplaire) REFERENCES exemplaire(id),
        FOREIGN KEY (membre) REFERENCES membre(id))`
        );
        console.log('table  emprunt created.');

        });
 
    } catch (error) {
        throw new Error(error);
    }
};

export async function populeTables(db) {
    try {
        console.log('2. Populating tables...');

        db.getDatabaseInstance().serialize(() => {

            // population de la table editeur
            db.run(`INSERT INTO editeur (editeur) VALUES
            ('Grasset'),
            ('Gallimard'),
            ('Flammarion'),
            ('Albin Michel'),
            ('Robert Laffont'),
            ('Livre de Poche'),
            ('Denoël'),
            ('Actes Sud'),
            ('Pocket'),
            ('Hachette'),
            ('Anaya')          
            `);
            console.log('table editeur populated.');

           //population de la table livre
           db.run(`INSERT INTO livre (titre, ISBN, annee_Publication, nb_Pages, editeur) VALUES
            ('1984', '9780451524935', 1949, 328, 2),
            ('Le Petit Prince', '9782070612758', 1943, 96, 3),
            ("Harry Potter à l'école des sorciers", '9782070584628', 1997, 320, 4),
            ('La Nuit des temps', '9782253006329', 1968, 438, 5),
            ('Les Misérables', '9782080700921', 1862, 1488, 6),
            ('Fondation', '9782070360533', 1951, 432, 7),
            ('LÉtranger', '9782070360021', 1942, 184, 8),
            ('Da Vinci Code', '9780307474278', 2003, 689, 9),
            ('Le Seigneur des Anneaux', '9782266121021', 1954, 1137, 10)`
            );
            // ************ donnéesss *****************

            // ************ donnéesss *****************

           console.log('table livre populated.');

            // population de la table nationalite
            db.run(`INSERT INTO nationalite (nationalite) VALUES
            ('Française'),
            ('Anglaise'),
            ('Américaine'),
            ('Britannique')`
            );
            console.log('table nationalite populated.');

            //population de la table auteur
            db.run(`INSERT INTO auteur (nom, prenom, date_naissance, nationalite) VALUES
            ('Orwell', 'George', '1903-06-25', 4), -- 1984
            ('de Saint-Exupéry', 'Antoine', '1900-06-29', 1), -- Le Petit Prince
            ('Rowling', 'J.K.', '1965-07-31', 2), -- Harry Potter à l'école des sorciers
            ('Barjavel', 'René', '1911-01-24', 1), -- La Nuit des temps
            ('Hugo', 'Victor', '1802-02-26', 1), -- Les Misérables
            ('Asimov', 'Isaac', '1920-01-02', 3), -- Fondation
            ('Camus', 'Albert', '1913-11-07', 1), -- L'Étranger
            ('Brown', 'Dan', '1964-06-22', 3), -- Da Vinci Code
            ('Tolkien', 'J.R.R.', '1892-01-03', 2); -- Le Seigneur des Anneaux)`
            );
            console.log('table auteur populated.');

            // population de la table categorie
            db.run(`INSERT INTO categorie (categorie) VALUES
            ('Science Fiction'),
            ('Fantasy'),
            ('Romance'),
            ('Policier'),
            ('Historique'),
            ('Biographie'),
            ('Aventure'),
            ('Essais'),
            ('Thriller'),
            ('Horreur'),
            ('Philosophie'),
            ('Littérature classique'),
            ('Poésie'),
            ('Jeunesse'),
            ('Comédie')`
            );
            console.log('table categorie populated.');

            
            // population de la table etat
            db.run(`INSERT INTO etat (etat) VALUES
            ('Très usé'),   
            ('Usé'),         
            ('Moyen'),      
            ('Bon état'),
            ('Très bon état'), 
            ('Neuf')`    
            );
            console.log('table etat populated.');


            // population de la table exemplaire
            db.run(`INSERT INTO exemplaire (livre, etat, rare) VALUES
            (1, 1, true),    
            (2, 2, false),    
            (3, 5, true),    
            (4, 3, false),    
            (5, 6, false),    
            (6, 4, false),    
            (7, 1, false),    
            (8, 4, false),    
            (9, 2, false),   
            (1, 5, false)`
            );
            console.log('table exemplaire populated.');

            // population de la table membre
            db.run(`INSERT INTO membre (nom, prenom, mail, telephone, date_inscription) VALUES
            ('Dupont', 'Pierre', 'pierre.dupont@example.com', '0601020304', '2025-03-06'),
            ('Martin', 'Sophie', 'sophie.martin@example.com', '0612345678', '2025-03-01'),
            ('Lemoine', 'Julien', 'julien.lemoine@example.com', '0623456789', '2025-02-15'),
            ('Benoit', 'Claire', 'claire.benoit@example.com', '0634567890', '2025-01-20'),
            ('Robert', 'Lucas', 'lucas.robert@example.com', '0645678901', '2025-03-05'),
            ('Leclerc', 'Amélie', 'amelie.leclerc@example.com', '0656789012', '2025-02-10'),
            ('Giraud', 'Nathalie', 'nathalie.giraud@example.com', '0667890123', '2025-01-30'),
            ('Lambert', 'Marc', 'marc.lambert@example.com', '0678901234', '2025-03-03'),
            ('Petit', 'Charlotte', 'charlotte.petit@example.com', '0689012345', '2025-02-25'),
            ('Blanc', 'Antoine', 'antoine.blanc@example.com', '0690123456', '2025-01-10')`
            );
            console.log('table membre populated.');

            // population de la table livre_auteur
            db.run(`
            INSERT INTO livre_auteur (livre, auteur) VALUES
            (1, 1),
            (2, 2),
            (3, 3),
            (4, 4),
            (5, 5),
            (6, 6),
            (7, 7),
            (8, 8),
            (9, 9)`
            );
            console.log('table livre_auteur populated.');
         
            // population de la table livre_categorie
            db.run(`INSERT INTO livre_categorie (livre, categorie) VALUES
            (1, 1),
            (2, 2),
            (3, 3),
            (4, 4),
            (5, 5),
            (6, 6),
            (7, 7),
            (8, 8),
            (9, 9)`            
            );
            console.log('table livre_categorie populated.');


            // population de la table EMPRUNT
            db.run(` 
            INSERT INTO emprunt (date_emprunt, exemplaire, membre, date_retour_prevue, date_retour_effective) VALUES
            ('2024-02-10', 1, 1, '2024-02-24', '2024-02-22'),
            ('2024-02-15', 2, 2, '2024-03-01', NULL),
            ('2024-02-20', 3, 3, '2024-03-05', '2024-03-04'),
            ('2024-02-25', 4, 4, '2024-03-10', NULL),
            ('2024-03-01', 5, 5, '2024-03-15', '2024-03-14'),
            ('2024-03-05', 1, 6, '2024-03-19', NULL),
            ('2024-03-10', 2, 7, '2024-03-24', '2024-03-22'),
            ('2024-03-12', 3, 8, '2024-03-26', NULL)`          
            );
            console.log('table emprunt populated.');           
        });


    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

// ****************** Entrée ppal *************************

const db = initDb();

// ****************** Entrée ppal *************************