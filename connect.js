const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'netzwelt',
    database: 'web'
});

module.exports = connection;