// repositories/livreRepository.js
import { openDB } from '../config/database.js';
import { Livre } from '../models/Livre.js';

export const livreRepository = {
  async findAllLivres() {
    const client = await openDB();
    try {
      const result = await client.query(`
        SELECT L.id, L.titre, L.ISBN, L.annee_Publication, L.nb_Pages, L.editeur
        FROM livre AS L
      `);
      
      return result.rows.map(row => new Livre(
        row.id,
        row.titre,
        row.ISBN,
        row.annee_Publication,
        row.nb_Pages,
        row.editeur
      ));
    } catch (error) {
      console.error('Error in livreRepository:', error);
      throw new Error('Error in livreRepository: ' + error.message);
    } finally {
      client.release();
    }
  },

  async findAllLivresByTitre(titre) {
    const client = await openDB();
    try {
      const result = await client.query(`
        SELECT *
        FROM livre
        WHERE titre LIKE $1
      `, [`%${titre}%`]);
      
      return result.rows.map(row => new Livre(
        row.id,
        row.titre,
        row.ISBN,
        row.annee_Publication,
        row.nb_Pages,
        row.editeur
      ));
    } catch (error) {
      console.error('Error in livreRepository:', error);
      throw new Error('Error in livreRepository: ' + error.message);
    } finally {
      client.release();
    }
  },

  // Other methods follow the same pattern, replacing SQLite-specific prepare/run 
  // with PostgreSQL's parameterized query method

  async createLivre(livre) {
    const client = await openDB();
    try {
      const result = await client.query(`
        INSERT INTO livre (titre, ISBN, annee_Publication, nb_Pages, editeur)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `, [
        livre.titre,
        livre.ISBN,
        livre.annee_Publication,
        livre.nb_Pages,
        livre.editeur
      ]);
  
      return {
        id: result.rows[0].id,
        changes: result.rowCount
      };
    } catch (error) {
      console.error('Error in livreRepository:', error);
      throw new Error('Error in livreRepository: ' + error.message);
    } finally {
      client.release();
    }
  },

  // Similar adjustments for other methods...
};