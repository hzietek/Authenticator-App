const db = require('../db');

const changeMultifactor = (req, res) => {
    const sql = "UPDATE profiles SET multifactorAuth = ? WHERE email = ?";
    db.query(sql, [req.body.multifactor, req.body.email], (error, result) => {
        if(error) {
            throw error;
        }
        res.send("Multifactor Auth updated!");
    });
}

module.exports = changeMultifactor;