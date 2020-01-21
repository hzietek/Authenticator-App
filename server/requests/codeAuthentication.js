const db = require('../db');
const Speakeasy = require('speakeasy');

const codeAuthentication = (req, res) => {
const JWTHandler = require('../utils/authentication/JWTHandler');
    const data = {
        code: req.body.code,
        secret: req.body.secret,
        email: req.body.email
    }
    const verify = Speakeasy.totp.verify({
        secret: data.secret,
        encoding: 'base32',
        token: data.code,
        window: 2
    });

    const sql = `SELECT name, email, lastLoginData, multifactorAuth, externalLastLoginData FROM profiles WHERE email = ?`;
    if(verify) {
        db.query(sql, data.email, (error, result) => {
            if(error) throw error;
            const jsonResult = JSON.parse(JSON.stringify(result));
            const token = JWTHandler(jsonResult);
            res.header('Authorization', `Bearer ${token}`).send({
                login: true,
                token: token,
            })
        });
    } else {
        res.send("Code is incorrect!");
    }
}

module.exports = codeAuthentication;