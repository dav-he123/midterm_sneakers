// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);
db.connect();

/// Users

/**
 * Get all users.
 * @return {Promise<{}>} A promise with the list of users.
 */
const getAllUsers = function() {
  const querySQL = `SELECT * FROM users`
  return db.query(querySQL)
  .then(res => {
    if(res.rows) {
      return res;
    } else {
      return null
    }
  })
  .catch(err => console.log('eror', err));
}
exports.getAllUsers = getAllUsers;

// Get User by email
const getUserWithEmail = function (email) {
  const querySQL = `SELECT * FROM users WHERE email = $1`
  return db.query(querySQL,[email])
   .then((res) => res.rows[0]);
 }
 exports.getUserWithEmail = getUserWithEmail;

// Get User by id
 const getUserWithId = function (id) {
   const querySQL = `SELECT * FROM users WHERE id = $1`
   return db.query(querySQL,[id])
     .then((res) => res.rows[0]);
 };
 exports.getUserWithId = getUserWithId;


 /// Sneakers

/**
 * Get a list of sneakers
 * @return {Promise<{}>} A promise wiht list of sneakers.
 */
const getAllSneakers = function() {
  const querySQL = `SELECT * FROM items`
  return db.query(querySQL)
  .then(res => {
    if(res.rows) {
      return res;
    } else {
      return null
    }
  })
  .catch(err => console.log('eror', err));
}
exports.getAllSneakers = getAllSneakers;

/**
 * Get a list of sneakers for each owner
 * @param {String} email of the owner.
 * @return {Promise<{}>} A promise with the list of snekers.
 */
const getShoesBySeller = function(email) {
  const querySQL = `SELECT items.brand, items.title, items.price, items.description, items.cover_photo_url
  FROM items
  JOIN users ON users.id = admin_id
  WHERE users.email=$1`
  return db.query(querySQL,[email])
  .then(res => {
    if(res.rows) {
      return res;
    } else {
      return null
    }
  })
  .catch(err => console.log('error', err));
}
exports.getShoesBySeller = getShoesBySeller;

/**
 * Add a new pair of shoes to sell.
 * @param {{brand: string, title: string, price: int, colour: string, size: int, description: string, cover_photo_url:string, gender: string, active: boolean}} shoes
 * @return {Promise<{}>} A promise to the new pair of shoes.
 */

 const addSneaker = function(sneaker){
   const querySQL = `INSERT INTO items (admin_id, brand, title, price, colour, size, description, cover_photo_url, gender, active)
   VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, 'true')
   RETURNING *`
   return db.query(querySQL,[sneaker.admin_id,sneaker.brand, sneaker.title, sneaker.price, sneaker.colour, sneaker.size, sneaker.description, sneaker.cover_photo_url, sneaker.gender])
   .then(res => {
     if(res.rows) {
       return res;
      } else {
        return null
      }
    })
  .catch(err => console.log('error', err));
 }
 exports.addSneaker = addSneaker;

 /**
 * List a specific snaker
 * @param {{id}} shoes
 * @return {Promise<{}>} A promise to the new pair of shoes.
 */

const getSneakersById = function(id){
  const querySQL = `SELECT brand, title, price, size, details, cover_photo_url FROM items WHERE id = $1`
  return db.query(querySQL,[id])
  .then(res => {
    if(res.rows) {
      return res;
     } else {
       return null
     }
   })
 .catch(err => console.log('error', err));
}
exports.getSneakersById = getSneakersById;


/// Favourites

const findFavouriteSneaker = (id) => {
  const querySQL = `SELECT * FROM favourites WHERE user_id = $1`
  return db.query(querySQL, [id])
    .then((res) => res.rows);
};
exports.findFavouriteSneaker = findFavouriteSneaker;

const getFavouriteSneakers = function (user) {
  const querySQL = `SELECT item_id FROM favourites WHERE user_id = $1`
  return db.query(querySQL,[user])
  .then((res) => res.rowss);
};
exports.getFavouriteSneakers = getFavouriteSneakers;


  /// Messages

  const getMessages = function() {
    const querySQL = `SELECT * FROM messages
    JOIN users ON from_user_id = users.id
    JOIN items ON item_id = items.id`
    return db.query(querySQL)
      .then((res) => res);
  };

  exports.getMessages = getMessages;

const postMessages = function(messageText) {
  const querySQL = "INSERT INTO messages (from_user_id, to_user_id, item_id, message) VALUES (5, 5, 5, $1)"
  return db.query(querySQL, [messageText])
  .then(res => {
    if(res.rows) {
      return res;
    } else {
      return null
    }
  })
  .catch(err => console.log('error', err));
};

exports.postMessages = postMessages;
