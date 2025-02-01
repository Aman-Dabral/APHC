const express = require('express');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database. from admins');
});

const router = express.Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/admins/login', (req, res) => {
    const email = req.body?.email;
    const password = req.body?.password;
    if(email && password){
        db.all('SELECT * FROM admins WHERE email = ?', [email], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal Server Error');
            } else {
                if(rows.length === 0){
                    res.status(404).send('No such account exists');
                }else {
                    bcrypt.compare(password, rows[0].password, (err, result) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).send('Internal Server Error');
                        } else {
                            if(result){
                                // Start implementing JWT from here
                                res.status(200).send('Login Successful');
                            }else{
                                res.status(401).send('Wrong Password');
                            }
                        }
                    });
                }
            }
        })
    }else{
        res.status(400).send('Insufficient Data');
    }
});
router.post('/admins/create_account', (req, res) => {
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;
    const added_by = req.body?.added_by;
    const added_pass = req.body?.added_pass;

    // Check if we sucessfully received data in the first place
    if(email && password && name && added_by!=undefined && added_by!=null && added_pass){

        // Check if email is valid
        if(emailPattern.test(email)){

            // Check if adding manager is authentic
            db.all('SELECT password FROM admins WHERE id = ?', [added_by], (err, rows) =>{
                if(err){
                    console.error(err.message);
                    res.status(500).send('Internal Server Error');
                }else if(rows.length === 0){
                    res.status(404).send('Not Found');
                }else{
                    bcrypt.compare(added_pass, rows[0].password, (err, result) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).send('Internal Server Error');
                        } else {
                            if(result){
                                // Check if same id already exists
                                db.all('SELECT * FROM admins WHERE email = ?', [email], (err, rows) => {
                                    if(err){
                                        console.error(err.message);
                                        res.status(500).send('Internal Server Error');
                                    }else{
                                        if(rows.length === 0){
                                            // Carry out the process of adding a new manager
                                            // Hash the password
                                            bcrypt.genSalt(Number(process.env.BCYRYPT_SALT_ROUNDS), (err, salt) =>{
                                                if(err){
                                                    console.error(err.message);
                                                    res.status(500).send('Internal Server Error');
                                                }else{
                                                    bcrypt.hash(password, salt, (err, hash) => {
                                                        if(err){
                                                            console.error(err.message);
                                                            res.status(500).send('Internal Server Error');
                                                        }else{
                                                            // Insertion
                                                            db.run(`INSERT INTO admins (name, email, password, added_by) 
                                                                VALUES (?, ?, ?, ?)`,
                                                                [name, email, hash, added_by],
                                                                (err) => {
                                                                    if (err) {
                                                                        console.error(err.message);
                                                                        res.status(500).send('Internal Server Error');
                                                                    }else{
                                                                        res.status(200).send('Admin added successfully');
                                                                    }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }else{
                                            res.status(409).send('An ID already exists');
                                        }
                                    }
                                })
                            }else{
                                res.status(401).send('Access Denied');
                            }
                        }
                    })
                }
            });
            
        }else{
            // If email is invalid
            res.status(400).send('Enter Email Correctly');
        }
    }else{
        res.status(400).send('Insufficient Data');
    }
});

module.exports = router;