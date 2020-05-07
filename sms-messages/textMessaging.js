const ID = "AC7649939fcdea3a9737e8acfaddd20fca";
const token = "7164117b9babf5f45bda985015789fc1";
const client = require("twilio")(ID, token);
client.messages
  .create({
    body: "Get your sneakers because you just purchased it!!",
    from: "+12025197052",
    to: "+12899271833",
  })
  .then((message) => console.log(message.sid))
  .catch((err) => console.log(err));
