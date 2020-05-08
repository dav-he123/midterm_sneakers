const http = require("http");

const express = require("express");
const router = express.Router();
const accountID = "AC7649939fcdea3a9737e8acfaddd20fca";
const accountToken = "ea2fc51c3288b2de4e41ff7d8b040c95";
const app = express();

const sender = require("twilio")(accountID, accountToken);

router.post("/messagesent", (req, res) => {
  return sender.messages
    .create({
      from: "+12025197052",
      to: "+12899271833",
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
