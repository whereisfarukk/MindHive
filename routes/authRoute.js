const router = require("express").Router();
const signupValidator = require("../validator/auth/signupValidator");
const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutControlle,
} = require("../controllers/authController");
const { isUnAuthenticated } = require("../middleware/authMiddleWare");

router.get("/signup", isUnAuthenticated, signupGetController);
router.post(
  "/signup",
  isUnAuthenticated,
  signupValidator,
  signupPostController
);

router.get("/login", isUnAuthenticated, loginGetController);
router.post("/login", isUnAuthenticated, loginPostController);

router.get("/logout", logoutControlle);

module.exports = router;
