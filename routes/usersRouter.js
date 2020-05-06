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
  database
    .getAllUsers()
    .then((data) => {
      const users = data.rows;
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.send({});
});

router.get("/userid", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.send({ message: "not logged in" });
    return;
  }

  database
    .getUserWithId(userId)
    .then((user) => {
      if (!user) {
        res.send({ error: "no user with that id" });
        return;
      }
      res.send({ user: { name: user.name, email: user.email, id: userId } });
    })
    .catch((e) => res.send(e));
});

module.exports = router;

// router.post("/login", (req, res) => {
//   res.cookie("email", req.body.email);
//   res.sendStatus(200);
// });

router.get("/favourites", (req, res) => {
  // console.log(res);
  // let user_Email = decodeURIComponent(req.headers.cookie.slice(9));

  database.getAllUsers().then((users) => {
    // console.log("users", users);
    let userID;
    for (let key of users) {
      // if (user_Email === key.email) {
      // console.log("key.id", key.id);
      userID = key.id;
      // }
    }
    // console.log(userID);
    database.getFavouriteSneakers(userID).then((favouriteSneakers) => {
      let arrFav = [];
      for (let key of favouriteSneakers) {
        arrFav.push(key.item_id);
      }
      database.getAllSneakers().then((items) => {
        // console.log(items);
        const favItems = items.filter((item) => arrFav.includes(item.id));
        res.json({ favItems });
      });
    });
  });
});

router.post("/favouritesAdd", (req, res) => {
  res.redirect("/favourties");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.statusCode = 400;
    res.end("The email or password is empty. Status code: 400"); //This error message shows up if the user does not register email or password in the browser.
  } else if (emailCheck(users, req.body.email)) {
    res.statusCode = 400;
    res.end("The email is already being used. Status code: 400"); //This error message shows up when user registers the same username and password that has already been registered
  }

  let randomID = generateRandomString();

  users[randomID] = {
    id: randomID,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };
  console.log("users:", users);

  req.session.user_id = randomID;

  getUserByEmail(req.body.email, users);

  res.redirect("/urls");
});

// router.get("/test", (req, res) => {
//   db.getAllSneakers()
//     .then((sneakers) => {
//       // res.json({ sneakers });
//       res.render("index", { data: sneakers });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });
