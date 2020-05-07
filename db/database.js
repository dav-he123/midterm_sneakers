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
 * @param {String} use user_id of the owner.
 * @return {Promise<{}>} A promise with the list of sneakers.
 */
const getShoesBySeller = function(user_id) {
  const querySQL = `SELECT items.id, items.brand, items.title, items.price, items.description, items.cover_photo_url
  FROM items
  JOIN users ON users.id = admin_id
  WHERE users.id=$1`
  return db.query(querySQL,[user_id])
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
 * List a specific sneaker
 * @param {{id}} shoes
 * @return {Promise<{}>} A promise to the new pair of shoes.
 */

const getSneakersById = function(id){
  const querySQL = `SELECT id, brand, title, price, size, description, cover_photo_url FROM items WHERE id = $1`
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

/**
 * Update a specific pair of sneakers
 * @param {{id}} sneaker's id
 * @return {Promise<{}>} Succesful promise of deleted item.
 */

const updateSneakerById = function(sneaker){
  const querySQL = `UPDATE items SET active = $1 WHERE id = $2`
  return db.query(querySQL,[sneaker.active, sneaker.id,])
  .then(res => {
    if(res.rows) {
      return res;
     } else {
       return null
     }
   })
 .catch(err => console.log('error', err));
}
exports.updateSneakerById = updateSneakerById;


/**
 * Delete a specific pair of sneakers
 * @param {{id}} sneaker's id
 * @return {Promise<{}>} Succesful promise of deleted item.
 */

const delSneakerById = function(id){
  const querySQL = `DELETE FROM items WHERE id = $1`
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
exports.delSneakerById = delSneakerById;


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

  const getMessages = function(userId) {
    const querySQL = `SELECT from_users.id AS from_user_id, from_users.name AS from_user_name, to_users.name AS to_user_name, items.brand, items.title, STRING_AGG(messages.message, '|')
    FROM messages
    JOIN users AS to_users ON to_user_id = to_users.id
    JOIN users AS from_users ON from_user_id = from_users.id
    JOIN items ON item_id = items.id
    WHERE to_users.id = $1 OR from_users.id = $1
    GROUP BY from_users.id, from_users.name, to_users.name, items.brand, items.title;`

    return db.query(querySQL, [userId])
      .then((res) => {
        // console.log("database result", res);
        return res
      });
  };

  exports.getMessages = getMessages;


  /// Users that have messaged

  const getUserMessages = function(userId) {
    const querySQL = `SELECT DISTINCT from_users.id AS from_user_id, from_users.name
    FROM messages
    JOIN users AS to_users ON to_user_id = to_users.id
    JOIN users AS from_users ON from_user_id = from_users.id
    JOIN items ON item_id = items.id
    WHERE to_users.id = $1 OR from_users.id = $1;`

    return db.query(querySQL, [userId])
      .then((res) => {
        // console.log("database result", res);
        return res
      });
  };

  exports.getUserMessages = getUserMessages;

//// Get messages from specific user

const getMessagesFromUser = function(userId, fromUser) {
  const querySQL = `SELECT *
  FROM messages
  JOIN users AS to_users ON to_user_id = to_users.id
  JOIN users AS from_users ON from_user_id = from_users.id
  JOIN items ON item_id = items.id
  WHERE from_users.id = $2 AND to_users.id = $1 OR from_users.id = $1 AND to_users.id = $2
  ORDER BY messages.id;`

  return db.query(querySQL, [userId, fromUser])
    .then((res) => {
      //  console.log("database result", res);
      return res
    });
};

exports.getMessagesFromUser = getMessagesFromUser;

//// Post message to specific user

const postMessagesToUser = function(messageText, fromUser, toUser) {

  console.log(messageText);
  const sql = "INSERT INTO messages (from_user_id, to_user_id, item_id, message) VALUES ($2, $3, 5, $1);"

  return db.query(sql, [messageText, fromUser, toUser])
  .then(res => {
    if(res.rows) {
      return res;
    } else {
      return null
    }
  })
  .catch(err => console.log('error', err));
};

exports.postMessagesToUser = postMessagesToUser;


///// General post message

const postMessages = function(messageText) {

  console.log(messageText);
  const sql = "INSERT INTO messages (from_user_id, to_user_id, item_id, message) VALUES (4, 5, 5, $1);"

  return db.query(sql, [messageText])
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
