const pg = require("pg");


const dbConfig = {

 connectionString: process.env.DATABASE_URL
};

const pool = new pg.Pool(dbConfig);
pool.on("error", (err) => console.log(err));
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
