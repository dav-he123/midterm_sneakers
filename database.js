const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "midterm",
});

const getAllUsers = () => {
  return pool.query(`SELECT * FROM users`).then((res) => {
    //console.log(res.rows);
    return res.rows;
  });
};

// const getUserWithName = function (name) {
//   return pool
//     .query(
//       `
//     SELECT * FROM users
//     WHERE name = $1;

//     `,
//       [name]
//     )
//     .then((res) => res.rows);
// };

// const getUserWithId = function (id) {
//   return pool
//     .query(
//       `
//   SELECT * FROM users
//   WHERE id = $1;

//   `,
//       [id]
//     )
//     .then((res) => res.rows[0]);

//   // return Promise.resolve(users[id]);
// };

// module.exports = { getAllUsers, getUserWithName, getUserWithId };

module.exports = { getAllUsers };
