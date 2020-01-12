const db = require('../db');

const changeDate = (req,res) => {
    sql = "UPDATE profiles SET lastLoginDate = ? WHERE email = ?";
    db.query(sql,[req.body.date,req.body.email], (error, result) => {
        if(error) {
            throw error;
        }
        res.send("Last login date updated!");
    })
}

module.exports = changeDate;