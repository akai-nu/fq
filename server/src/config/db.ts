require("dotenv").config();
import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

let sql = "SELECT * FROM users";

pool.execute(sql, function(err) {
    if (err) throw err;

    console.log('🧷 Connected to SQL database');
});

const db = pool.promise()

export default  db;