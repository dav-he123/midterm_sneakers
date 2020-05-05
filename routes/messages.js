/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const database = require('../db/database');

// module.exports = (db) => {


  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM messages;`)
  //     .then((data) => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  router.get("/", (req, res) => {
    // console.log("hello");

    database.getMessages()

    // db.query(`SELECT * FROM messages
    // JOIN users ON from_user_id = users.id
    // JOIN items ON item_id = items.id;`)
      .then((data) => {
        // console.log(data.rows);

        let templateVars = {data: data.rows};
        // console.log(templateVars);

        res.render("messages", templateVars);
        // res.send(data);
      });
  });

  router.post("/", (req, res) => {

    let messageText = req.body.new_message;

    // console.log(messageText);

    // console.log(messageText);

    // const sql = "INSERT INTO messages (from_user_id, to_user_id, item_id, message) VALUES (5, 5, 5, $1);"

    // console.log(sql);

    // // db.query('INSERT INTO messages (from_user_id, to_user_id, item_id, message) VALUES (2,3,5, "hello")')
    // db.query(sql, [messageText])

    database.postMessages(messageText)



      .then((data) => {
        console.log(data);
        // // res.redirect("/")
        // res.send(req.body);
      })
      .catch((error) => {
        console.log(error);
      });





  });




module.exports = router;

  // return router;
// };



