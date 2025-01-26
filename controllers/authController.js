const User = require("../models/User");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup");
};
exports.signupPostController = async (req, res, next) => {
  let { username, email, password } = req.body;

  let user = new User({
    name: username,
    email,
    password,
  });
  try {
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
exports.loginGetController = (req, res, next) => {};
exports.loginPostController = (req, res, next) => {};

exports.logoutControlle = (req, res, next) => {};
