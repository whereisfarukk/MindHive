const router = require("express").Router();
const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutControlle,
} = require("../controllers/authController");

router.get("/signup", signupGetController);
router.post("/signup", signupPostController);

router.get("/login", loginGetController);
router.get("/login", loginPostController);

router.get("/logout", logoutControlle);

module.exports = router;
