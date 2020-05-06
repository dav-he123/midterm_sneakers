const express = require("express");
const router = express.Router();
const database = require("../db/database");

const login = function (email) {
  return database.getUserWithEmail(email).then((user) => {
    if (user) {
      return user.email;
    }
    return null;
  });
};

router.post("/", (req, res) => {
  const { email } = req.body;
  res.cookie("email", req.body.email);
  // res.sendStatus(200);
  login(email)
    .then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      // res.send({ user: { name: user.name, email: user.email, id: user.id } });
      res.redirect("/");
    })
    .catch((e) => res.send(e));
});

router.get("/", (req, res) => {
  res.render("login");
});

module.exports = router;

exports.login = login;

// const db = require("../db/database");
// // console.log("hello");

// const login = (email) => {
//   // console.log("hello");
//   // console.log(db.users);
//   for (let key of db.users) {
//     if (email === db.users[key].email) {
//       // console.log("passed");
//       return email;
//     }
//   }
//   return false;
// };

// const getUserID = (email) => {};

// module.exports = {
//   getUserID,
//   login,
// };
