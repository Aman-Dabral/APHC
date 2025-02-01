const express = require('express');
const create_account = require('../controllers/create_account');
const login = require('../controllers/login');

const router = express.Router();


router.post('/admins/login', login);
router.post('/admins/create_account', create_account);

module.exports = router;