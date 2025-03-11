const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { bindUserWithRequest } = require("./authMiddleWare");
const setLocals = require("./setLocals");

//Saving sessions

const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.pszaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

// middleware array
const middleware = [
  morgan("dev"),
  express.static("public"), //exposing the public directory to all folder
  express.urlencoded({ extended: true }), //  to handle all tyoes incoming form data
  express.json(), //to handle incoming JSON data
  session({
    secret: process.env.SECRET_KEY || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithRequest(),
  setLocals(),
];

module.exports = (app) => {
  middleware.forEach((m) => {
    app.use(m);
  });
};
