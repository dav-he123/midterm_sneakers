/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const login = function (email) {
    return db.getUserWithEmail(email).then((user) => {
      if (user) {
        return user.email;
      }
      return null;
    });
  };
  exports.login = login;

  // router.post("/login", (req, res) => {
  //   res.cookie("email", req.body.email);
  //   res.sendStatus(200);
  // });

  router.post("/login", (req, res) => {
    const { email } = req.body;
    login(email)
      .then((user) => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.send({ user: { name: user.name, email: user.email, id: user.id } });
        // res.redirect("/");
      })
      .catch((e) => res.send(e));
  });

  router.post("/logout", (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  // router.get("/favourites", (req, res) => {
  //   console.log(res);
  //   let userID;
  //   db.getAllUsers().then((users) => {
  //     for (let key of users) {
  //       if (userEmail === key.email) {
  //         userID = key.id;
  //       }
  //     }
  //   });
  //   db.getFavouriteSneakers(userID).then((favourites) => {
  //     console.log(favourites);

  //     let arrFav = [];
  //     for (let key of favourites) {
  //       arrFav.push(key.item_id);
  //     }

  //     db.getAllItems().then((items) => {
  //       const favItems = items.filter((item) => arrFav.includes(item.id));
  //       res.json({ favItems });
  //     });
  //   });
  // });

  router.get("/", (req, res) => {
    db.getAllSneakers()
      .then((sneakers) => {
        res.json({ sneakers });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then((data) => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({ message: "not logged in" });
      return;
    }

    db.getUserWithId(userId)
      .then((user) => {
        if (!user) {
          res.send({ error: "no user with that id" });
          return;
        }

        res.send({ user: { name: user.name, email: user.email, id: userId } });
      })
      .catch((e) => res.send(e));
  });

  return router;
};
