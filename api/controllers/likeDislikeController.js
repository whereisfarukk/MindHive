const Post = require("../../models/Post");

exports.likeGetController = async (req, res, next) => {
  let { postId } = req.params;
  let liked = null;

  if (!req.user) {
    return res.status(403).json({
      error: "you are not an authenticated user",
    });
  }
  let userId = req.user._id;

  try {
    let post = Post.findById(postId);
    if (post.dislikes.includes(userId)) {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { dislikes: userId } }
      );
    }
    if (post.likes.includes(userId)) {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } }
      );
      liked = false;
    } else {
      await Post.findByIdAndUpdate(
        { _id: postId },
        { $push: { likes: userId } }
      );
      liked = true;
    }
    let updatedPost = await Post.findById(postId);
    res.status(200).json({
      liked,
      totalLikes: updatedPost.likes.length,
      totalDislikes: updatedPost.dislikes.length,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "server error occured",
    });
  }
};

exports.dislikeGetController = async (req, res, next) => {
  let { postId } = req.params;
  let disLiked = null;

  if (!req.user) {
    return res.status(403).json({
      error: "you are not an authenticated user",
    });
  }
  let userId = req.user._id;

  try {
    let post = Post.findById(postId);
    if (post.likes.includes(userId)) {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } }
      );
    }
    if (post.dislikes.includes(userId)) {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { dislikes: userId } }
      );
      disLiked = false;
    } else {
      await Post.findByIdAndUpdate(
        { _id: postId },
        { $push: { dislikes: userId } }
      );
      disLiked = true;
    }
    let updatedPost = await Post.findById(postId);
    res.status(200).json({
      disLiked,
      totalLikes: updatedPost.likes.length,
      totalDislikes: updatedPost.dislikes.length,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "server error occured",
    });
  }
};
