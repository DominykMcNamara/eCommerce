const pg = require("pg");


const dbConfig = {
  connectionString: process.env.DATABASE_URL
};

const pool = new pg.Pool(dbConfig);
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
