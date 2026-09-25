import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const db = process.env.DATABASE_URL
    ? new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
              rejectUnauthorized: false
          }
      })
    : new Pool({
          user: process.env.PGUSER,
          host: process.env.PGHOST,
          database: process.env.PGDATABASE,
          password: process.env.PGPASSWORD,
          port: Number(process.env.PGPORT),
          ssl: false
      });

db.query("SELECT current_database(), current_schema()")
    .then((result) => {
        console.log("DATABASE:", result.rows[0]);
    })
    .catch((error) => {
        console.log("DATABASE ERROR:", error);
    });

export default db;