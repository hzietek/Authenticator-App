const db = require ('../db');

const getUser = (req, res, next) => {
    const sql = 'SELECT email, password FROM profiles';
    db.query(sql, (error, result) => {
        if(error) {
            throw error;
        }
        res.send(result);
    });
}

module.exports = getUser;