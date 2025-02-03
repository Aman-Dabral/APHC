const express = require('express');
const create_account = require('../controllers/create_account');
const login = require('../controllers/login');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();


router.post('/admins/login', login);
router.post('/admins/create_account', checkAuth, create_account);
router.post('/admins/confirm_identity', checkAuth, function(req, res){
    // userData is the object containing user information from the token
    res.status(200).json({message: "Identity confirmed", userData: req.userData});
});

module.exports = router;