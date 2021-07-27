import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.PG_URI;
const pool = new Pool({ connectionString });

export default pool;
