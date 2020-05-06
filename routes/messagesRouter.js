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


  let userId = req.cookies.user_id;
  // console.log(req.cookies.user_id);

  database
    .getMessages(userId)
    .then((data) => {

      // console.log(data.rows);

      /// Create array of unique incoming message users


      for (let row of data.rows) {
        let array = row.string_agg.split("|");
        row.string_agg = array;
      }

      // console.log(data.rows);


      let templateVars = { data: data.rows };

      res.render("messages", templateVars);

    });
});

router.post("/", (req, res) => {
  let messageText = req.body.message_text;

  database
    .postMessages(messageText)

    .then(() => {
      console.log("hello");
      res.redirect("/messages");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

// return router;
// };
