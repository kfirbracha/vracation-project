var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "",
  database: "vacationdb"
});

connection.connect();

module.exports = connection;
