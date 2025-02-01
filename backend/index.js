// Requiring packages
const express = require('express');
const sqlite3 = require('sqlite3');

// Requiring modules
const parking = require('./routes/parking');
const admins = require('./routes/admins');

// Creating app
const app = express();
app.use(express.json());

// Handling Database
// const db = new sqlite3.Database('./database.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Connected to the SQLite database.');
// });

// setting up routes
app.use(admins);

// Listening on port
app.listen(process.env.BACK_END_PORT, () => console.log('Server is running on port 3000'));