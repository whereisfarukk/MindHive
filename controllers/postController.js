const readingTime = require("reading-time");

const Post = require("../models/Post");
const Profile = require("../models/Profile");
const { post } = require("../routes/authRoute");

exports.createPostGetController = (req, res, next) => {
  res.render("pages/dashboard/post/createPost");
};
exports.createPostPostController = async (req, res, next) => {
  let { title, body, tags } = req.body;
  console.log(req.body);
  if (tags) {
    tags = tags.split(",");
  }
  let readTime = readingTime(body).text;
  let post = new Post({
    title,
    body,
    tags,
    author: req.user._id,
    thumbnail: "",
    readTime,
    likes: [],
    dislikes: [],
    comments: [],
  });
  if (req.file) {
    post.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    let createPost = await post.save();
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { posts: createPost._id } }
    );
    return res.redirect(`/post/edit/${createPost._id}`);
  } catch (e) {
    console.log(e);
  }
  console.log(post);
  // res.render("pages/dashboard/post/createPost");
};

exports.editPostGetController = async (req, res, next) => {
  let postId = req.params.postId;

  try {
    let post = await Post.findOne({ author: req.user._id, _id: postId });
    if (!post) {
      let error = new Error("404 page not found");
      error.status = 404;
      throw error;
    }
    res.render("pages/dashboard/post/editPost", { post });
  } catch (e) {
    next(e);
  }
};
exports.editPostPostController = async (req, res, next) => {
  let { title, body, tags } = req.body;
  let postId = req.params.postId;

  console.log(req.body);
  if (tags) {
    tags = tags.split(",");
  }
  try {
    let post = await Post.findOne({ author: req.user._id, _id: postId });
    if (!post) {
      let error = new Error("404 page not found");
      error.status = 404;
      throw error;
    }
    let thumbnail = post.thumbnail;
    if (req.file) {
      thumbnail = `/uploads/${req.file.filename}`;
    }
    let editedPost = await Post.findOneAndUpdate(
      { _id: post._id },
      { $set: { title, body, tags, thumbnail } },
      { new: true }
    );
    res.redirect("/post/edit/" + post._id);
  } catch (e) {
    next(e);
  }
};

exports.deletePostGetController = async (req, res, next) => {
  let postId = req.params.postId;
  try {
    let post = await Post.findOne({ author: req.user._id, _id: postId });
    if (!post) {
      let error = new Error("404 page not found");
      error.status = 404;
      throw error;
    }
    await Post.findOneAndDelete({ _id: postId }); //deleting post from the post collection
    await Profile.findOneAndUpdate(
      //deleting post from Profile psot array
      { user: req.user._id },
      { $pull: { posts: post._id } }
    );
    res.redirect("/post");
  } catch (e) {
    next(e);
  }
};
exports.allPostGetController = async (req, res, next) => {
  try {
    let posts = await Post.find({ author: req.user._id });
    res.render("pages/dashboard/post/post", { posts });
  } catch (e) {
    next(e);
  }
};
exports.postImageUploadController = (req, res, next) => {
  if (req.file) {
    return res.status(200).json({
      imgUrl: `/uploads/${req.file.filename}`,
    });
  }

  return res.status(500).json({
    message: "Server Error: No file received",
  });
};
