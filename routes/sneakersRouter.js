/*
 * All routes for Shoes are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router = express.Router();
const database = require('../db/database');

// List of sneakers
router.get("/", (req, res) => {
  database.getAllSneakers()
  .then(data => {
    const shoes = data.rows;
    res.json({ shoes });
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

// List of sneakers that belongs to an owner
router.get("/admin", (req, res) => {
  const email = 'lera_hahn@dickens.org';
  // const email = req.session.email;
  database.getShoesBySeller(email)
  .then(data => {
    const shoes = data.rows;
    let templateVars = {
      sneakers: shoes
    }
    res.render("admin", templateVars );
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

// Create a new pair of shoes
router.post("/sneakers/new", (req, res) => {

});

// List a specific pair of shoes
router.get("/sneakers/:id", (req, res) => {

});


// Update the specific pair of shoes
router.put('/sneakers/:id', (req, res) => {

});

// Delete a specific pair of shoes
router.post("/sneakers/:id/delete", (req, res) => {

});



module.exports = router;


