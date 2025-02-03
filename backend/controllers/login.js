const sqlite3 = require('sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// DB connection
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
});

const login = (req, res) => {
    const email = req.body?.email;
    const password = req.body?.password;

    // Check if we have received the details properly
    if(email && password){
        db.all('SELECT * FROM admins WHERE email = ?', [email], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({message: 'Internal Server Error'});
            } else {

                // Check for existance of email
                if(rows.length === 0){
                    res.status(404).json({message: 'No such account exists'});
                }else {

                    // Check if the password matches
                    bcrypt.compare(password, rows[0].password, (err, result) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({message: 'Internal Server Error'});
                        } else {
                            if(result){
                                jwt.sign({ id: rows[0].id, email: rows[0].email, name: rows[0].name },
                                process.env.JWT_SECRET_KEY,
                                { expiresIn: '30d' },
                                (err, token) => {
                                    if (err) {
                                        console.error(err.message);
                                        res.status(500).json({message: 'Internal Server Error'});
                                    }else{
                                        // In the case of total success
                                        // Let the cokkie expire in 30 days
                                        // res.cookie("APHC_JWT_TOKEN", token, {httpOnly: false, expiresIn: new Date(30*60*1000)});
                                        res.status(200).json({message: "Login Sucessful", token: token});
                                    }
                                });
                            }else{
                                // If password does not match
                                res.status(401).json({message: 'Wrong Password'});
                            }
                        }
                    });
                }
            }
        })
    }else{
        res.status(400).send('Insufficient Data');
    }
};
module.exports = login;