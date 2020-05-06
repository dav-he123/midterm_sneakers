/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const database = require("../db/database");



router.get("/", (req, res) => {

  console.log('Cookies: ', req.cookies.email)
  let userEmail = req.cookies.email;


  database
    .getMessages(userEmail)
    .then((data) => {
      let templateVars = { data: data.rows };
      res.render("messages", templateVars);

    });
});

router.post("/", (req, res) => {
  let messageText = req.body.new_message;

  database
    .postMessages(messageText)

    .then((data) => {
      // console.log(data.rows.id);
      res.redirect("/messages");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

// return router;
// };
