const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");
exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", {
    error: {},
    oldInput: {},
  });
};
exports.signupPostController = async (req, res, next) => {
  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    // console.log(errors.mapped());
    return res.render("pages/auth/signup", {
      error: errors.mapped(),
      oldInput: req.body,
    });
  }

  let { username, email, password } = req.body;

  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      name: username,
      email,
      password: hashedPassword,
    });

    let createUser = await user.save();
    console.log("user created successfully", createUser);
    res.render("pages/auth/signup");
  } catch (e) {
    console.log(e);
    next(e);
  }
  // console.log(req.body);
  // res.render("pages/auth/signup");
};
exports.loginGetController = (req, res, next) => {
  console.log(req.session);
  res.render("pages/auth/login");
};
exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Invalid credential",
      });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        message: "Invalid credential",
      });
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    // console.log("successfully loged in ", user);
    // res.render("pages/auth/login");
    req.session.save((err) => {
      if (err) {
        console.log(err);
        return next(err); // Pass error to Express error handler
      }
      res.redirect("/dashboard"); // Only redirect after session is saved
    });
  } catch (e) {
    console.log(e);
    next(e);
  }

  console.log(req.body);
};

exports.logoutControlle = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect("/auth/login");
  });
};
