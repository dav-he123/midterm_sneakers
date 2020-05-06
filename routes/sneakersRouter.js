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
  let sneaker = req.body;
  database.addSneaker(sneaker)
    .then((data) => {
      const shoes = data.rows;
      res.redirect(`/sneakers/${shoes[0].id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

// List a specific pair of shoes
router.get("/sneakers/:id", (req, res) => {
  // const email = req.session.id;
  database.getSneakersById(id)
  .then(data => {
    const shoes = data.rows;
    let templateVars = {
      sneakers: shoes
    }
    res.render("sneakers_details", templateVars );
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});


// Update the specific pair of shoes
router.put('/sneakers/:id', (req, res) => {

});

// Delete a specific pair of shoes
router.post("/sneakers/:id/delete", (req, res) => {

});



module.exports = router;


