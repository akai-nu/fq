"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});
let sql = "SELECT * FROM users";
pool.execute(sql, function (err) {
    if (err)
        throw err;
    console.log('🧷 Connected to SQL database');
});
const db = pool.promise();
exports.default = db;
//# sourceMappingURL=db.js.map