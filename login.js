const db = require("./database");

const login = (name) => {
  for (let key of db.users) {
    if (name === db.users[key].name) {
      return name;
    }
  }
};

const getUserID = (name) => {};

module.exports = {
  getUserID,
  login,
};
