var mysql = require('mysql');
var conn = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"tienda",
  port: 8889
  
});
conn.connect();
module.exports = conn;

