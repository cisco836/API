var mysql = require('mysql');


var pool = mysql.createPool({
  connectionLimit:4,
  host: "localhost",
  user: "root",
  password: "",
  database:"Oil_Product_Movement"
});

pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});

module.exports = pool;