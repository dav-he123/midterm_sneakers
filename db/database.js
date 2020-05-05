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

const getAllSneakers = () => {
  return pool.query(`SELECT * FROM items`).then((res) => {
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

// const getFeaturedSneakers = function () {
//   return pool
//     .query(`SELECT * FROM items WHERE active = true`)
//     .then((res) => res.rows);
// };

const addListingSneakers = (sneaker) => {
  return pool
    .query(
      `
  INSERT INTO items (id, admin_id, brand, title, price, colour, size, description, cover_photo_url, gender, active)
  VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, true)
  RETURNING *;
`,
      [
        sneaker.brand,
        sneaker.title,
        sneaker.price,
        sneaker.colour,
        sneaker.size,
        sneaker.description,
        sneaker.cover_photo,
        sneaker.gender,
      ]
    )
    .then((res) => res.rows[0]);
};

const findFavouriteSneaker = (id) => {
  return pool
    .query(`SELECT * FROM favourites WHERE user_id = $1`, [id])
    .then((res) => res.rows);
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

module.exports = {
  getAllUsers,
  getUserWithEmail,
  getUserWithId,
  getFavouriteSneakers,
  addListingSneakers,
  findFavouriteSneaker,
  getAllSneakers,
  // getFeaturedSneakers,
};
