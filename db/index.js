const pg = require("pg");


const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const pool = new pg.Pool(dbConfig);
pool.on("error", (err) => console.log(err));
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
