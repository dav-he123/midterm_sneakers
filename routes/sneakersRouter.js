/*
 * All routes for Shoes are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const router = express.Router();
const database = require("../db/database");

router.get("/", (req, res) => {
  database
    .getAllSneakers()
    .then((data) => {
      const sneakers = data;
      // res.json({ sneakers });
      res.render("sneakers", { sneakers: sneakers });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/admin", (req, res) => {
  const email = "lera_hahn@dickens.org";
  // const email = req.session.email;
  database
    .getShoesBySeller(email)
    .then((data) => {
      const shoes = data.rows;
      let templateVars = {
        sneakers: shoes,
      };
      res.render("admin", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/sneakers/:id", (req, res) => {});

module.exports = router;
