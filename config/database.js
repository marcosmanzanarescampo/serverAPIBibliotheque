// config/database.js
import pkg from 'pg';
const { Pool } = pkg;

// Create a connection pool
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'bibliotheque',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'your_password'
});

/**
 * Opens a connection to the PostgreSQL database.
 * @returns {Promise<import('pg').PoolClient>} Database client
 */
export async function openDB() {
    try {
        const client = await pool.connect();
        return client;
    } catch (error) {
        console.error("Failed to open database", error);
        throw new Error("Failed to open database");
    }
}

// Export the pool for potential global use
export const dbPool = pool;