const sqlite3 = require('sqlite3');
const bcrypt = require('bcryptjs');

// DB connection
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
});

// For simple testing of email validity
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const create_account = (req, res) => {
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;
    const added_by = req.userData?.id;
    const added_pass = req.body?.added_pass;

    // Check if we sucessfully received data in the first place
    if(email && password && name && added_by!=undefined && added_by!=null && added_pass){

        // Check if email is valid
        if(emailPattern.test(email)){

            // Check if adding manager is authentic
            db.all('SELECT password FROM admins WHERE id = ?', [added_by], (err, rows) =>{
                if(err){
                    console.error(err.message);
                    res.status(500).send({message: 'Internal Server Error'});
                }else if(rows.length === 0){
                    res.status(404).send({message: 'Not Found'});
                }else{
                    bcrypt.compare(added_pass, rows[0].password, (err, result) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).send({message: 'Internal Server Error'});
                        } else {
                            if(result){
                                // Check if same id already exists
                                db.all('SELECT * FROM admins WHERE email = ?', [email], (err, rows) => {
                                    if(err){
                                        console.error(err.message);
                                        res.status(500).send({message: 'Internal Server Error'});
                                    }else{
                                        if(rows.length === 0){
                                            // Carry out the process of adding a new manager
                                            // Hash the password
                                            bcrypt.genSalt(Number(process.env.BCYRYPT_SALT_ROUNDS), (err, salt) =>{
                                                if(err){
                                                    console.error(err.message);
                                                    res.status(500).send({message: 'Internal Server Error'});
                                                }else{
                                                    bcrypt.hash(password, salt, (err, hash) => {
                                                        if(err){
                                                            console.error(err.message);
                                                            res.status(500).send({message: 'Internal Server Error'});
                                                        }else{
                                                            // Insertion
                                                            db.run(`INSERT INTO admins (name, email, password, added_by) 
                                                                VALUES (?, ?, ?, ?)`,
                                                                [name, email, hash, added_by],
                                                                (err) => {
                                                                    if (err) {
                                                                        console.error(err.message);
                                                                        res.status(500).send({message: 'Internal Server Error'});
                                                                    }else{
                                                                        res.status(200).send({message: 'Admin added successfully'});
                                                                    }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }else{
                                            res.status(409).send({message: 'An ID already exists'});
                                        }
                                    }
                                })
                            }else{
                                res.status(401).send({message: 'Access Denied'});
                            }
                        }
                    })
                }
            });
            
        }else{
            // If email is invalid
            res.status(400).send({message: 'Enter Email Correctly'});
        }
    }else{
        res.status(400).send({message: 'Insufficient Data'});
    }
};
module.exports = create_account;