// Requiring packages
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Requiring modules
const parking = require('./routes/parking');
const admins = require('./routes/admins');

// Creating app
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
}));
app.use(cookieParser());

// Setting up routes
app.use(admins);

// Listening on port
app.listen(process.env.BACK_END_PORT, () => console.log('Server is running on port 3000'));