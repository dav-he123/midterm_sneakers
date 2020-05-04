// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);
db.connect();

/// Users

/**
 * Get all the users.
 * @return {Promise<{}>} A promise with the list of users.
 */
const getUsers = function() {
  const query = `SELECT * FROM users`
  return db.query(query)
  .then(res => {
    if(res.rows) {
      return res;
    } else {
      return null
    }
  })
  .catch(err => console.log('eror', err));
}
exports.getUsers = getUsers;

/// Shoes

/**
 * Get a list of shoes
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getShoes = function() {
  const query = `SELECT * FROM items`
  return db.query(query)
  .then(res => {
    if(res.rows) {
      return res;
    } else {
      return null
    }
  })
  .catch(err => console.log('eror', err));
}
exports.getShoes = getShoes;

/**
 * Get a list of shoes for each owner
 * @param {String} email The email of the owner.
 * @return {Promise<{}>} A promise with the list of shoes.
 */
const getShoesBySeller = function(email) {
  const query = `SELECT items.brand, items.title, items.price, items.description
  FROM items
  JOIN users ON users.id = admin_id
  WHERE users.email=$1`
  return db.query(query,[email])
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







