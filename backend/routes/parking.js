const express = require('express');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

const router = express.Router();

router.get('/:lotId', (req, res) => {
    
});

db.close();

module.exports = router;