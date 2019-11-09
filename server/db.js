const mysql = require ('mysql');

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

db.connect((error) => {
    if(error) {
        throw error;
    }
    console.log("MySQL connected!");
})

module.exports = db