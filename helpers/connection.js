const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) {
        console.log('Could not connect to database')
    } 
});

module.exports = connection;