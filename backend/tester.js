const sqlite3 = require('sqlite3');
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./database.db', (err) => {
    if(err){
        console.log("Failed to connect to the database");
    } else
    bcrypt.genSalt(11, (err, salt) =>{
                    if(err){
                        console.error(err.message);
                        res.status(500).send('Internal Server Error');
                    }else{
                        // console.log("Salt generated");
                        bcrypt.hash("password", salt, (err, hash) => {
                            if(err){
                                console.error(err.message);
                                res.status(500).send('Internal Server Error');
                            }else{
                                db.run('INSERT INTO admins (id, name, email, password, added_by) VALUES (?, ?, ?, ?, ?)', [0, "Admin1", "amandabral27@gmail.com", hash, 0], (err) => {
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