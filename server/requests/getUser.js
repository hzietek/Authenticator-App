const db = require ('../db');

const getUser = (req, res, next) => {
    const sql = 'SELECT * FROM profiles';
    db.query(sql, (error, result) => {
        if(error) {
            throw error;
        }
        console.log(result);
        res.send(result);
    });
}

module.exports = getUser;