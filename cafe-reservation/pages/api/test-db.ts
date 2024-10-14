import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    try {
        // Create a connection to the database
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
        });

        // Test the connection
        await connection.ping();

        // If successful, send a response
        res.status(200).json({ message: 'Database connection successful!' });

        // Close the connection
        await connection.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database connection failed.', error: error.message });
    }
}
