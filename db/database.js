// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

/// Users

/**
 * Get all the users.
 * @return {Promise<{}>} A promise with the list of users.
 */
const getAllUsers = function () {
  const querySQL = `SELECT * FROM users`;
  return db
    .query(querySQL)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log("eror", err));
};
exports.getAllUsers = getAllUsers;

/// Widgets

/**
 * Get all the widgets.
 * @return {Promise<{}>} A promise with the list of widgets.
 */
const getWidgets = function () {
  const querySQL = `SELECT * FROM widgets`;
  return db
    .query(querySQL)
    .then((res) => {
      if (res.rows) {
        return res;
      } else {
        return null;
      }
    })
    .catch((err) => console.log("eror", err));
};
exports.getWidgets = getWidgets;

/// Shoes

/**
 * Get a list of shoes
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getAllSneakers = function () {
  const querySQL = `SELECT * FROM items`;
  return db
    .query(querySQL)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log("eror", err));
};
exports.getAllSneakers = getAllSneakers;

/**
 * Get a list of shoes for each owner
 * @param {String} email The email of the owner.
 * @return {Promise<{}>} A promise with the list of shoes.
 */
const getShoesBySeller = function (email) {
  const querySQL = `SELECT items.brand, items.title, items.price, items.description, items.cover_photo_url
  FROM items
  JOIN users ON users.id = admin_id
  WHERE users.email=$1`;
  return db
    .query(querySQL, [email])
    .then((res) => {
      if (res.rows) {
        return res;
      } else {
        return null;
      }
    })
    .catch((err) => console.log("error", err));
};
exports.getShoesBySeller = getShoesBySeller;

/**
 * Add a new pair of shoes to sell.
 * @param {{brand: string, title: string, price: int, colour: string, size: int, description: string, cover_photo_url:string, gender: string, active: boolean}} shoes
 * @return {Promise<{}>} A promise to the new pair of shoes.
 */

const addSneaker = function (sneaker) {
  const querySQL = `INSERT INTO items (admin_id, brand, title, price, colour, size, description, cover_photo_url, gender, active)
   VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
   RETURNING *`;
  return db
    .query(querySQL, [
      sneaker.admin_id,
      sneaker.brand,
      sneaker.title,
      sneaker.price,
      sneaker.colour,
      sneaker.size,
      sneaker.description,
      sneaker.cover_photo_url,
      sneaker.gender,
      sneaker.active,
    ])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log("error", err));
};
exports.addSneaker = addSneaker;

const getUserWithEmail = function (email) {
  const querySQL = `SELECT * FROM users WHERE email = $1;`;
  return db.query(querySQL, [email]).then((res) => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;

const findFavouriteSneaker = (id) => {
  const querySQL = `SELECT * FROM favourites WHERE user_id = $1`;
  return db.query(querySQL, [id]).then((res) => res.rows);
};
exports.findFavouriteSneaker = findFavouriteSneaker;

const getFavouriteSneakers = function (user) {
  const querySQL = `SELECT item_id FROM favourites WHERE user_id = $1`;
  return db.query(querySQL, [user]).then((res) => res.rows);
};
exports.getFavouriteSneakers = getFavouriteSneakers;

const addFavouriteSneakers = function (userID, itemID) {
  console.log("ITEMID", itemID);
  return db
    .query(
      `INSERT INTO favourites (user_id, item_id) 
    VALUES ($1, $2)
    RETURNING *;`,
      [userID, itemID]
    )
    .then((res) => res.rows[0]);
};

exports.addFavouriteSneakers = addFavouriteSneakers;

//------------------

const getUsersFavouriteSneakers = function (id) {
  const querySQL =
    "SELECT * FROM favourites JOIN items on item_id = items.id WHERE user_id = $1";

  return db.query(querySQL, [id]).then((res) => res.rows);
};

exports.getUsersFavouriteSneakers = getUsersFavouriteSneakers;

const getUsersEmail = function (email) {
  const querySQL = `SELECT * FROM users WHERE email = $1;`;
  return db.query(querySQL, [email]).then((res) => res.rows);
};

exports.getUsersEmail = getUsersEmail;

const getUserWithId = function (id) {
  const querySQL = `SELECT * FROM users WHERE id = $1;`;
  return db.query(querySQL, [id]).then((res) => res.rows[0]);
};
exports.getUserWithId = getUserWithId;

const getMessages = function () {
  const querySQL = `SELECT * FROM messages
    JOIN users ON from_user_id = users.id
    JOIN items ON item_id = items.id;`;

  return db.query(querySQL).then((res) => res);
};

exports.getMessages = getMessages;

const postMessages = function (messageText) {
  console.log(messageText);
  const sql =
    "INSERT INTO messages (from_user_id, to_user_id, item_id, message) VALUES (5, 5, 5, $1);";

  return db
    .query(sql, [messageText])
    .then((res) => {
      if (res.rows) {
        return res;
      } else {
        return null;
      }
    })
    .catch((err) => console.log("error", err));
};

exports.postMessages = postMessages;
