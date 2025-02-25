const router = require("express").Router();
const {
  dashboardGetController,
} = require("../controllers/dashboardController");
const { isAuthenticated } = require("../middleware/authMiddleWare");

router.get("/", isAuthenticated, dashboardGetController);

module.exports = router;
