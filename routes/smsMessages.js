const http = require("http");

const express = require("express");
const router = express.Router();
const accountID = "AC";
const accountToken = "7";
const app = express();

const sender = require("twilio")(accountID, accountToken);

router.post("/messagesent", (req, res) => {
  return sender.messages
    .create({
      from: "+1",
      to: "+1",
      body: req.body.message,
    })
    .then((message) => console.log(message))
    .then(() => {
      res.send("It works");
    })
    .catch((err) => console.log(err));
});
// http.createServer(app).listen(1337, () => {
//   console.log("Express server listening on port 1337");
// });
module.exports = router;
