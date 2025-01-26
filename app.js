const express = require("express");
const morgan = require("morgan");
const app = express();
const mogan = require("morgan");
const { mongoose } = require("mongoose");
const PORT = process.env.PORT || 8080;

// Import routes
const authRoute = require("./routes/authRoute");

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
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.json({
    message: "working",
  });
});
mongoose
  .connect(
    `mongodb+srv://omarf6197:HTDEFnAfAP5PyOuv@cluster0.pszaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
