const db = require('../db');

const createdb = (req, res) => {
    let sql = "CREATE DATABASE users";
    db.query(sql, (error, result) => {
        if(error) {
            throw error;
        }
        res.send('New database created!');
    });
}

module.exports = createdb