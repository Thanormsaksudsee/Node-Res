const express = require('express')
const sqlite3 = require('sqlite3')
const app = express();


const db = new sqlite3.Database('./Database/Book.sqlite');

app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY ,
    title TEXT,
    author TEXT
)`);