const router = require("express").Router();
const {
  dashboardGetController,
  createProfileGetController,
  createProfilePostController,
  editProfileGetController,
  editProfilePostController,
  profileGetController,
} = require("../controllers/dashboardController");
const upload = require("../middleware/uploadMiddleware");
const { isAuthenticated } = require("../middleware/authMiddleWare");

router.get("/", isAuthenticated, dashboardGetController);
router.get("/profile", isAuthenticated, profileGetController);
router.get("/create-profile", isAuthenticated, createProfileGetController);
router.post(
  "/create-profile",
  upload.single("profilepic"),
  isAuthenticated,
  createProfilePostController
);
router.get("/edit-profile", isAuthenticated, editProfileGetController);
router.post(
  "/edit-profile",
  isAuthenticated,
  upload.single("profilepic"),
  editProfilePostController
);

module.exports = router;
