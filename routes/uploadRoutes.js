const router = require("express").Router();

const upload = require("../middleware/uploadMiddleware");

const { postImageUploadController } = require("../controllers/postController");

router.post(
  "/postimage",
  upload.single("post-image"),
  postImageUploadController
);

module.exports = router;
