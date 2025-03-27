const router = require("express").Router();

const { isAuthenticated } = require("../../middleware/authMiddleWare");

const {
  commentPostController,
  replyCommentPostController,
} = require("../controllers/commentController");

const {
  likePostController,
  dislikePostController,
} = require("../controllers/likeDislikeController");

const { bookmarksgetController } = require("../controllers/bookmarkController");

//comments route
router.post("/comments/:postId", isAuthenticated, commentPostController);
router.post(
  "/comments/replies/:commentId",
  isAuthenticated,
  replyCommentPostController
);

// like dislike route
router.post("/likes/:postId", isAuthenticated, likePostController);
router.post("/dislikes/:postId", isAuthenticated, dislikePostController);

//bookmarks route
router.get("/bookmarks/:postId", isAuthenticated, bookmarksgetController);
module.exports = router;
