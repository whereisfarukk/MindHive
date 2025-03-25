const Profile = require("../../models/Profile");
exports.bookmarksgetController = async (req, res, next) => {
  let { postId } = req.params;

  if (!req.user) {
    return res.status(403).json({
      error: "you are not an authenticated user",
    });
  }
  let userId = req.user._id;
  let booksmarks = null;
  try {
    let profile = await Profile.findOne({ user: userId });
    if (profile.bookmarks.includes(postId)) {
      await Profile.findOneAndUpdate(
        { user: userId },
        { $pull: { bookmarks: postId } }
      );
      booksmarks = false;
    } else {
      await Profile.findOneAndUpdate(
        { user: userId },
        { $push: { bookmarks: postId } }
      );
      booksmarks = true;
    }
    res.status(200).json({
      booksmarks,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "server error occured",
    });
  }
};
