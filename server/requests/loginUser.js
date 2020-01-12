const db = require('../db');
const bcrypt = require('bcryptjs');
const JWTHandler = require('../utils/authentication/JWTHandler');
const moment = require('moment');
const externalLogin = require('./externalLogin');

const loginUser = async (req, res, next) => {
    const forwarded = req.headers['x-forwarded-for'];

    const data = {
        email: req.body.email,
        password: req.body.password
    }
    const sql = `SELECT name, email, password, lastLoginDate, multifactorAuth, externalLastLoginData FROM profiles WHERE email = ?`;
    db.query(sql, data.email, (error, result) => {
        if(error) throw error;
        if(result.length) {
            bcrypt.compare(data.password, result[0].password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const loginData = {
                        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                        ip: forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress,
                        applicationType: req.body.applicationType ? req.body.applicationType : "INTERNAL",
                        applicationName: req.body.applicationName ? req.body.applicationName : "Authenticator-App",
                        userAgent: req.header('user-agent')
                    }
                    loginDataSQL = JSON.stringify(loginData);
                    if(loginData.applicationType !== "INTERNAL") externalLogin(loginDataSQL, data.email, res);
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