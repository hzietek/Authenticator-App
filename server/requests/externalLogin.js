const db = require('../db');

const externalLogin = (loginData, email, res) => {
    const sql = "UPDATE profiles SET externalLastLoginData = ? WHERE email = ?";
    db.query(sql, [loginData,email], (error, result) => {
        if(error) {
            throw error;
        }
    });
}

module.exports = externalLogin;