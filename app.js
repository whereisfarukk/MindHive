const express = require("express");
const morgan = require("morgan");
const app = express();
const mogan = require("morgan");
const PORT = process.env.PORT || 8080;

// setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

// middleware array
const middleware = [
  morgan("dev"),
  express.static("public"), //exposing the public directory to all folder
  express.urlencoded({ extended: true }), //  to handle all tyoes incoming form data
  express.json(), //to handle incoming JSON data
];

app.use(middleware);
app.get("/", (req, res) => {
  res.json({
    message: "working",
  });
});
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
