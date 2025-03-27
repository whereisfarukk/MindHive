const { selectFields } = require("express-validator/lib/field-selection");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const User = require("../models/User");
exports.dashboardGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      const posts = await Post.find();
      console.log(posts);
      return res.render("pages/dashboard/dashboard", { posts });
    }
    res.redirect("/dashboard/create-profile");
  } catch (e) {
    next(e);
  }
};
exports.singlePostGetController = async (req, res, next) => {
  const { postId } = req.params;

  try {
    let post = await Post.findById(postId)
      .populate("author", "name profilePics") // Populate the author
      .populate({
        path: "comments", // Populate comments
        populate: [
          {
            path: "user", // Populate the user who made the comment
            select: "name profilePics",
          },
          {
            path: "replies.user", // Populate the user who made the reply
            select: "username profilePics",
          },
        ],
      });
    // let post = await Post.findById(postId)
    //   .populate("author", "name profilePics")
    //   .populate({
    //     path: "comments",
    //     populate: {
    //       path: "user",
    //       select: "name profilePics",
    //     },
    //   })
    //   .populate({
    //     path: "comments",
    //     populate: {
    //       path: "replies.user",
    //       select: "name profilePics",
    //     },
    //   });
    if (!post) {
      let error = new Error("404 page not found");
      error.status = 404;
      throw error;
    }

    res.render("pages/dashboard/singlePost", { post });
  } catch (e) {
    next(e);
  }
};
exports.profileGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.redirect("/dashboard");
    }
    res.render("pages/dashboard/profile", { profile });
  } catch (e) {
    next(e);
  }
};

exports.createProfileGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.redirect("/dashboard/edit-profile");
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
      // profilepic: req.user.profilePics,
      profilepic: req.file
        ? `/uploads/${req.file.filename}`
        : req.user.profilePics, // Store image path

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
  res.redirect("/dashboard");

  // next();
};
exports.editProfileGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.redirect("/dashboard/create-profile");
    }
    res.render("pages/dashboard/edit-profile", { profile });
  } catch (e) {
    next(e);
  }
};
exports.editProfilePostController = async (req, res, next) => {
  try {
    let profile = ({
      title,
      bio,
      link: { website, facebook, twitter, github },
    } = req.body);
    if (req.file) {
      //update the profile pic only when its uploaded.
      profileUpdate.profilepic = `/uploads/${req.file.filename}`;
    }
    let updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profile },
      { new: true }
    );
    res.redirect("/dashboard");
  } catch (e) {
    next(e);
  }
};
