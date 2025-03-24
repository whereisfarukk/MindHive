const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");

const { isAuthenticated } = require("../middleware/authMiddleWare");

const {
  createPostGetController,
  createPostPostController,
  editPostGetController,
  editPostPostController,
  deletePostGetController,
  allPostGetController,
} = require("../controllers/postController");

router.get("/create", isAuthenticated, createPostGetController);
router.post(
  "/create",
  upload.single("thumbnail"),
  isAuthenticated,
  createPostPostController
);
router.get("/edit/:postId", isAuthenticated, editPostGetController);
router.post(
  "/edit/:postId",
  upload.single("thumbnail"),
  isAuthenticated,
  editPostPostController
);
router.get(`/delete/:postId`, isAuthenticated, deletePostGetController);
router.get("/", isAuthenticated, allPostGetController);
module.exports = router;
