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
    let templateVars = {
      sneakers: shoes
    }
    res.render("sneakers", templateVars );
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

// List of sneakers that belongs to an owner
router.get("/admin", (req, res) => {
  const user_id = req.cookies.user_id;
  database.getShoesBySeller(user_id)
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
  const sneaker = req.body;
  console.log('sneaker text');
  console.log(sneaker);
  sneaker.featured  = (sneaker.featured === 'on') ? true: false;
  console.log('after');
  console.log(sneaker);
  sneaker.admin_id = req.cookies.user_id;
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
  const id = (req.params.id);
  database.getSneakersById(id)
  .then(data => {
    const shoes = data.rows;
    let templateVars = {
      sneakers: shoes[0]
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
router.post('/sneakers/:id', (req, res) => {
  const sneaker = {id: req.params.id, active: 'false'}
  database.updateSneakerById(sneaker)
  res.redirect('/admin');
});

// Delete a specific pair of shoes
router.post("/sneakers/:id/delete", (req, res) => {
  const id = req.params.id;
  database.delSneakerById(id)
  res.redirect('/admin');
});

// Post a message to the owner of shoe
router.post("/sneakers_messages/:id", (req, res) => {

  let messageText = req.body.new_message;
  let userId = req.cookies.user_id;
  let toSneaker = req.params.id;

  database
    .getSneakersById(req.params.id)
    .then((data) => {

      let adminId = data.rows[0].admin_id;
      // console.log(adminId);

      database
        .postMessagesToSneaker(messageText, userId, adminId, toSneaker)
        .then(() => {

          res.redirect("/sneakers/"+toSneaker);

        })
        .catch((error) => {
          console.log(error);
        });



    })


});


module.exports = router;
