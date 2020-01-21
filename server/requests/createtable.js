const db = require('../db');

const createtable = (req, res) => {
    let sql = "CREATE TABLE profiles(id int AUTO_INCREMENT, name VARCHAR(30), email VARCHAR(50), password VARCHAR(100), lastLoginData VARCHAR(1000), multifactorAuth TINYINT(1), externalLastLoginData VARCHAR(1000), PRIMARY KEY (id))";
    db.query(sql, (error, result) => {
        if(error) {
            throw error;
        }
        res.send('New table created!');
    });
}

module.exports = createtable