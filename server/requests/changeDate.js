const db = require('../db');
const moment = require('moment');

const changeDate = (req,res) => {
    const forwarded = req.headers['x-forwarded-for'];
    const loginData = {
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        ip: forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress,
        applicationType: req.body.applicationType ? req.body.applicationType : "INTERNAL",
        applicationName: req.body.applicationName ? req.body.applicationName : "Authenticator-App",
        userAgent: req.header('user-agent')
    }
    sql = "UPDATE profiles SET lastLoginData = ? WHERE email = ?";
    db.query(sql, [JSON.stringify(loginData), req.body.email], (error, result) => {
        if(error) {
            throw error;
        }
        res.send("Last login data updated!");
    })
}

module.exports = changeDate;