const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "midterm",
});

pool.connect();

const getAllUsers = () => {
  return pool.query(`SELECT * FROM users`).then((res) => {
    //console.log(res.rows);
    return res.rows;
  });
};

const getUserWithEmail = function (email) {
  return pool
    .query(
      `
    SELECT * FROM users
    WHERE email = $1;

    `,
      [email]
    )
    .then((res) => res.rows[0]);
};

const getFavouriteSneakers = function (user) {
  return pool
    .query(
      `
    SELECT item_id FROM favourites 
    WHERE user_id = $1

    `,
      [user]
    )
    .then((res) => res.rows);
};

const getUserWithId = function (id) {
  return pool
    .query(
      `
  SELECT * FROM users
  WHERE id = $1;

  `,
      [id]
    )
    .then((res) => res.rows[0]);

  // return Promise.resolve(users[id]);
};

module.exports = { getAllUsers, getUserWithEmail, getUserWithId };
