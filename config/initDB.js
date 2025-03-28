// utils/db.js
import { openDB } from '../config/database.js';

async function initDb() {
    const client = await openDB();

    try {
        // Disable auto-commit to wrap everything in a transaction
        await client.query('BEGIN');

        // Drop existing tables if they exist
        await client.query(`
            DROP TABLE IF EXISTS emprunt;
            DROP TABLE IF EXISTS livre_categorie;
            DROP TABLE IF EXISTS livre_auteur;
            DROP TABLE IF EXISTS membre;
            DROP TABLE IF EXISTS exemplaire;
            DROP TABLE IF EXISTS etat;
            DROP TABLE IF EXISTS categorie;
            DROP TABLE IF EXISTS auteur;
            DROP TABLE IF EXISTS nationalite;
            DROP TABLE IF EXISTS livre;
            DROP TABLE IF EXISTS editeur;
        `);

        // Create tables with PostgreSQL syntax
        await client.query(`
            CREATE TABLE editeur (
                id SERIAL PRIMARY KEY,
                editeur VARCHAR(100) UNIQUE NOT NULL
            );

            CREATE TABLE livre (
                id SERIAL PRIMARY KEY,
                titre VARCHAR(100) NOT NULL,
                ISBN VARCHAR(17) UNIQUE NOT NULL,
                annee_Publication INTEGER,
                nb_Pages INTEGER,
                editeur INTEGER NOT NULL,
                FOREIGN KEY (editeur) REFERENCES editeur(id)
            );

            CREATE TABLE nationalite (
                id SERIAL PRIMARY KEY,
                nationalite VARCHAR(100) NOT NULL
            );

            CREATE TABLE auteur (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(100) NOT NULL,
                prenom VARCHAR(17) NOT NULL,
                date_naissance DATE,
                nationalite INTEGER NOT NULL,
                FOREIGN KEY (nationalite) REFERENCES nationalite(id)
            );

            CREATE TABLE categorie (
                id SERIAL PRIMARY KEY,
                categorie VARCHAR(100) NOT NULL
            );

            CREATE TABLE etat (
                id SERIAL PRIMARY KEY,
                etat VARCHAR(50)
            );

            CREATE TABLE exemplaire (
                id SERIAL PRIMARY KEY,
                livre INTEGER NOT NULL,
                etat INTEGER NOT NULL,
                rare BOOLEAN DEFAULT FALSE,
                disponible BOOLEAN DEFAULT TRUE,
                FOREIGN KEY (livre) REFERENCES livre(id),
                FOREIGN KEY (etat) REFERENCES etat(id)
            );

            CREATE TABLE membre (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(50),
                prenom VARCHAR(50),
                mail VARCHAR(100) UNIQUE,
                telephone VARCHAR(10),
                date_inscription DATE DEFAULT CURRENT_DATE
            );

            CREATE TABLE livre_auteur (
                livre INTEGER NOT NULL,
                auteur INTEGER NOT NULL,
                PRIMARY KEY (livre, auteur),
                FOREIGN KEY (livre) REFERENCES livre(id),
                FOREIGN KEY (auteur) REFERENCES auteur(id)
            );

            CREATE TABLE livre_categorie (
                livre INTEGER,
                categorie INTEGER,
                PRIMARY KEY (livre, categorie),
                FOREIGN KEY (livre) REFERENCES livre(id),
                FOREIGN KEY (categorie) REFERENCES categorie(id)
            );

            CREATE TABLE emprunt (
                date_emprunt DATE NOT NULL DEFAULT CURRENT_DATE,
                exemplaire INTEGER NOT NULL,
                membre INTEGER NOT NULL,
                date_retour_prevue DATE NOT NULL,
                date_retour_effective DATE,
                PRIMARY KEY (date_emprunt, exemplaire, membre),
                FOREIGN KEY (exemplaire) REFERENCES exemplaire(id),
                FOREIGN KEY (membre) REFERENCES membre(id)
            );
        `);

        // Populate tables (similar to the SQLite script)
        await populateTables(client);

        // Commit the transaction
        await client.query('COMMIT');

        console.log('Database initialized successfully');
    } catch (error) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        // Release the client back to the pool
        client.release();
    }
}

async function populateTables(client) {
    // Population queries remain similar, with minor syntax adjustments
    
    // Editeur
    await client.query(`
        INSERT INTO editeur (editeur) VALUES
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

    // Similar population queries for other tables...
    // (I've abbreviated the rest to save space, but you would follow the same pattern)
}

export default initDb;