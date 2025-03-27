require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const app = express();
const { mongoose } = require("mongoose");

const PORT = process.env.PORT || 8080;

const setMiddleWare = require("./middleware/middlewares");
const setRoutes = require("./routes/routes");

// setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

console.log(app.get("env"));

// Using Middleware from Middleware Directory
setMiddleWare(app);

// Using Routes from Route Directory
setRoutes(app);

// if anywhere any error occurs ,this route will execute.If any invalid route hit will execute this.
app.use((req, res, next) => {
  let error = new Error("404 page not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  // console.log(error);
  if (error.status === 404) {
    return res.render("pages/error/404");
  }
  return res.render("pages/error/500");
});
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.pszaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.white.inverse(`app is running on port ${PORT}`)); //Here chalk is used to colorized text
    });
  })
  .catch((e) => {
    console.log(e);
  });
