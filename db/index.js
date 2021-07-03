const { Pool } = require('pg');

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, // its going to be coming from heroku addon
};

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? proConfig : devConfig
);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
