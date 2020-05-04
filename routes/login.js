const db = require("./db/database");
console.log("hello");

const login = (email) => {
  console.log("hello");
  console.log(db.users);
  for (let key of db.users) {
    if (email === db.users[key].email) {
      // console.log("passed");
      return email;
    }
  }
  return false;
};

const getUserID = (email) => {};

module.exports = {
  getUserID,
  login,
};
