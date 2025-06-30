// @ts-nocheck
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function resetLogin(username) {
  await pool.query(
    `UPDATE users SET lock_status = 0, status_code = 1, imei_updated = 0 WHERE phone_number = $1 AND status_code != 4`,
    [username]
  );
  console.log("✅ Lock Status Password Username Reset Succesfull...!!!! .");
}

export async function resetEmail(username) {
  await pool.query(
    `UPDATE users SET imei_updated = 0 WHERE phone_number = $1 AND status_code != 4`,
    [username]
  );
  console.log("✅ Email Reset Succesfull...!!!! .");
}

export async function closeConnection() {
  await pool.end();
}
