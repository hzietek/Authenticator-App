const db = require('../db');
const bcrypt = require('bcryptjs');
const JWTHandler = require('../utils/authentication/JWTHandler');

const loginUser = async (req, res, next) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    const sql = `SELECT name, email, password, lastLoginDate, multifactorAuth FROM profiles WHERE email = ?`;
    db.query(sql, data.email, (error, result) => {
        if(error) throw error;
        if(result.length) {
            bcrypt.compare(data.password, result[0].password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const jsonResult = JSON.parse(JSON.stringify(result));
                    const token = JWTHandler(jsonResult);
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