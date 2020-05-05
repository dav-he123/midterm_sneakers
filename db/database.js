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

/// Widgets

/**
 * Get all the widgets.
 * @return {Promise<{}>} A promise with the list of widgets.
 */
const getWidgets = function() {
  const query = `SELECT * FROM widgets`
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
exports.getWidgets = getWidgets;

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
  const query = `SELECT items.brand, items.title, items.price, items.description, items.cover_photo_url
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


/**
 * Add a new pair of shoes to sell.
 * @param {{brand: string, title: string, price: int, colour: string, size: int, description: string, cover_photo_url:string, gender: string, active: boolean}} shoes
 * @return {Promise<{}>} A promise to the new pair of shoes.
 */

 const addShoes = function(shoes){
   const query = `INSERT INTO items (admin_id, brand, title, price, colour, size, description, cover_photo_url, gender, active)
   VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
   RETURNING *`
   return db.query(query,[items.admin_id,items.brand, items.title, items.price, items.colour, items.size, items.description, items.cover_photo_url, items.gender, items.active])
   .then(res => {
     if(res.rows) {
       return res;
      } else {
        return null
      }
    })
  .catch(err => console.log('error', err));

 }
 exports.addShoes = addShoes;








