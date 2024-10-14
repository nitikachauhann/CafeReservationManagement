import mysql from 'mysql2/promise';

// Create a connection pool to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Export the pool
export { pool }; // Ensure this line is present

export async function query(sql: string, values: any[] = []) {
  const [rows] = await pool.execute(sql, values);
  return rows;
}
