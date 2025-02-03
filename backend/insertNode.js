const sqlite3 = require('sqlite3');
const bcrypt = require('bcryptjs');
const headEmail = "<test1>@gmail.com";
const headPassword = "password";

const db = new sqlite3.Database('./database.db', (err) => {
    if(err){
        console.log("Failed to connect to the database");
    } else
    bcrypt.genSalt(process.env.BCYRYPT_SALT_ROUNDS, (err, salt) =>{
                    if(err){
                        console.error(err.message);
                        res.status(500).send('Internal Server Error');
                    }else{
                        // console.log("Salt generated");
                        bcrypt.hash(headPassword, salt, (err, hash) => {
                            if(err){
                                console.error(err.message);
                                res.status(500).send('Internal Server Error');
                            }else{
                                db.run('INSERT INTO admins (id, name, email, password, added_by) VALUES (?, ?, ?, ?, ?)', [0, "Admin1", headEmail, hash, 0], (err) => {
                                    if (err) {
                                        console.error(err.message);
                                        // res.status(500).send('Internal Server Error');
                                    }else{
                                        console.log('Admin added successfully');
                                    }
                                });
                            }
                        });
                    }
                });
});

// db.close();