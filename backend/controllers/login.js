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
                                jwt.sign({ id: rows[0].id, name: rows[0].name, email: email },
                                process.env.JWT_SECRET_KEY,
                                { expiresIn: '30d' },
                                (err, token) => {
                                    if (err) {
                                        console.error(err.message);
                                        res.status(500).send('Internal Server Error');
                                    }else{
                                        res.status(200).send({message: "Login Sucessful", token: token});
                                    }
                                });
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
};
module.exports = login;