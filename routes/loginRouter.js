const express = require("express");
const router = express.Router();
const database = require("../db/database");

const login = function (email) {
  return database.getUserWithEmail(email).then((user) => {
    if (user) {
      return user;
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
      console.log(user);
      res.cookie('user_id', user.id);
      res.redirect("/admin");
    })
    .catch((e) => res.send(e));
});

router.get("/", (req, res) => {
  res.render("login");
});

module.exports = router;
exports.login = login;
