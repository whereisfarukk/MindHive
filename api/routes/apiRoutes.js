const router = require("express").Router();

const { isAuthenticated } = require("../../middleware/authMiddleWare");

const {
  commentPostController,
  replyCommentPostController,
} = require("../controllers/commentController");

const {
  likeGetController,
  dislikeGetController,
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
router.get("/likes/:postId", isAuthenticated, likeGetController);
router.get("/dislike/:postId", isAuthenticated, dislikeGetController);

//bookmarks route
router.get("/bookmarks/:postId", isAuthenticated, bookmarksgetController);
module.exports = router;
