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
  let messagesFromUsers = 1;

  database
    .getUserMessages(userId)
    .then((data) => {
      messagesFromUsers = data.rows;
      // console.log(messagesFromUsers);

    database
      .getMessages(userId)
      .then((data) => {

        for (let row of data.rows) {
          let array = row.string_agg.split("|");
          row.string_agg = array;
        }

        let templateVars = { data: data.rows , users: messagesFromUsers};
        res.render("messages", templateVars);

    });
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

//////// POST TO SPECIFIC USER


router.post("/:id", (req, res) => {

  let messageText = req.body.new_message;
  let userId = req.cookies.user_id;
  let toUser = req.params.id;

  database

    .postMessagesToUser(messageText, userId, toUser)

    .then(() => {

      res.redirect("/messages/"+toUser);
    })
    .catch((error) => {
      console.log(error);
    });
});



//////// GET MESSAGES FOR SPECIFIC USER

router.get("/:id", (req, res) => {

  let userId = req.cookies.user_id;
  // console.log(req.cookies.user_id);
  // let messagesFromUsers = 1;
  let fromUser = req.params.id;

  console.log(fromUser);

  database
    .getUserMessages(userId)
    .then((data) => {
      messagesFromUsers = data.rows;
      // console.log(messagesFromUsers);

    database
      .getMessagesFromUser(userId,fromUser)
      .then((data) => {

        // console.log(data.rows)

        for (let row of data.rows) {
          // console.log(row.from_user_id);
        }

        let templateVars = { data: data.rows , users: messagesFromUsers, fromUser: fromUser};
        res.render("messages_by_users", templateVars);

    });
    });
});



module.exports = router;

// return router;
// };
