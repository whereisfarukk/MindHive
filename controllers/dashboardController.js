const Profile = require("../models/Profile");
const User = require("../models/User");
exports.dashboardGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.render("pages/dashboard/dashboard");
    }
    res.redirect("/dashboard/create-profile");
  } catch (e) {
    next(e);
  }
};

exports.createProfileGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      res.redirect("/dashboard/edit-profile");
    }
    res.render("pages/dashboard/create-profile");
  } catch (e) {
    next(e);
  }
};
exports.createProfilePostController = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  let {
    title,
    bio,
    link: { website, facebook, twitter, github },
  } = req.body;
  try {
    let profile = new Profile({
      user: req.user._id,
      title,
      bio,
      profilePics: req.user.profilePics,
      link: {
        website: website | "",
        facebook: facebook | "",
        twitter: twitter | "",
        github: github | "",
      },
      posts: [],
      bookmarks: [],
    });
    let createdProfile = await profile.save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { profile: createdProfile._id } }
    );
  } catch (e) {
    next(e);
  }
  console.log(req.body);
  res.redirect("/dashboard");

  // next();
};
// exports.editProfileGetController=(req,res,next)=>{
//   next();
// }
// exports.editProfilePostController=(req,res,next)=>{
//   next();
// }
