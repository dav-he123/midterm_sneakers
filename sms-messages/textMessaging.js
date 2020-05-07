const ID = "";
const token = "";
const client = require("twilio")(ID, token);
client.messages
  .create({
    body: "Get your sneakers!!",
    from: "+1",
    to: "+1",
  })
  .then((message) => console.log(message.sid))
  .catch((err) => console.log(err));
