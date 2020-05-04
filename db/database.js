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







