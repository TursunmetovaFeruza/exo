var mysql = require('mysql');
var con = {
	mysql_pool : mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mytb"
})
};

module.exports = con;