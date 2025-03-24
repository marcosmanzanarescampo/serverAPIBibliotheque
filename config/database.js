// config/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { logger } from "../utils/logger.js";


//  * Ouvre une connexion à la base de données SQLite.
//  * @returns {Promise<import('sqlite').Database>} Instance de la base de données.
export async function openDB() {
    try {
            const myDb = open({
            filename: './data/bibliotheque.db',
            // filename: "./tests/mydb.db",
            driver: sqlite3.Database,
        });            

        return myDb;
    } catch (error) {
        logger.error("Failed to open database", error);
        throw new Error("Failed to open database");
    }
}   