const mysql = require ('mysql');

const db = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
});

db.connect((error) => {
    if(error) {
        throw error;
    }
    console.log("MySQL connected!");
})

module.exports = db