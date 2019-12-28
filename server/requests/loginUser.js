const db = require('../db');
const bcrypt = require('bcryptjs');
const JWTHandler = require('../../utils/authentication/JWTHandler');

const loginUser = async (req, res, next) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    const sql = `SELECT email, password FROM profiles WHERE email = ?`;
    db.query(sql, data.email, (error, result) => {
        if(error) throw error;
        if(result.length) {
            console.log(data.password, result[0].password);
            bcrypt.compare(data.password, result[0].password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const token = JWTHandler(data.email);
                    res.header('Authorization', `Bearer ${token}`).send({
                        login: isMatch,
                        token: token
                    });
                }
                else {
                    res.send({
                        text: 'Wrong password or email!',
                        login: isMatch,
                        token: null
                    });
                }
            });
        }
        else {
            res.send({
                text: 'Wrong password or email!',
                login: false,
                token: null
            });
        }
    });
}

module.exports = loginUser;