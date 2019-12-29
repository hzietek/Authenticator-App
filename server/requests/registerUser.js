const db = require('../db');
const { genSalt, hash } = require('bcryptjs');
const { registerValidation } = require('../../utils/validation');


const registerUser = async (req, res, next) => {
    const { error } = registerValidation(req.body);
    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
    const values = [data.name, data.email, data.password];

    const emailExistQuery = `SELECT email FROM profiles WHERE email = ?`;
    const sql = "INSERT INTO profiles (name, email, password) VALUES (?, ?, ?)"

    if(error) return res.status(400).send(error.details[0].message);

    db.query(emailExistQuery, data.email, (error, result) => {
      if (error) {
        throw error;
      } else {
        if (!result.length) {
          db.query(sql, values, (error, result) => {
            if(error) {
                throw error;
            }
            res.send('New user registered!');
        });
        }
        else {
          res.send('Email, already exists!');
        }
      }
    });
}

module.exports = registerUser;