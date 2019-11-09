const db = require('../db');

const createtable = (req, res) => {
    let sql = "CREATE TABLE profiles(id int AUTO_INCREMENT, name VARCHAR(30), email VARCHAR(50), password VARCHAR(20), PRIMARY KEY (id))";
    db.query(sql, (error, result) => {
        if(error) {
            throw error;
        }
        console.log(result);
        res.send('New table created!');
    });
}

module.exports = createtable