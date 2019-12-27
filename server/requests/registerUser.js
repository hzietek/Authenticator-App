const db = require('../db');

const registerUser = (req, res, next) => {
    const errors = []

    if (!req.body.name) {
      errors.push('No name specified')
    }
    if (!req.body.email) {
      errors.push('No email specified')
    }
    if (!req.body.password) {
      errors.push('No password specified')
    }
    if (errors.length) {
        res.status(400).json({ error: errors.join(',') })
        return
    }

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    
    const values = [data.name, data.email, data.password];
    var sql = "INSERT INTO profiles (name, email, password) VALUES (?, ?, ?)"
    db.query(sql, values, (error, result) => {
        if(error) {
            throw error;
        }
        console.log(result);
        res.send('New user registered!');
    });
}

module.exports = registerUser;