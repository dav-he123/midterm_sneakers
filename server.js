// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

//Routes
const sneakersRouter = require("./routes/sneakers");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const widgetsRouter = require("./routes/widgets");
const cookieSession = require("cookie-session");
const messagesRoutes = require("./routes/messages");

// const db = require("./db/database");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));
app.use(cookieParser());
app.use(cookieSession({ name: "user_id", secret: "asdfg" }));

// endpoints
app.use("/sneakers", sneakersRouter);
app.use("/users", usersRouter);
app.use("/widgets", widgetsRouter);
app.use("/login", loginRouter);
app.use("/messages", messagesRoutes);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// app.use("/api/favourites", favouritesRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/login", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} 😎`);
});
