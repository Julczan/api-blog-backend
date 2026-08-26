const { Router } = require("express");
const controllers = require("../controllers/index");
const passport = require("passport");

const router = Router();

router.post("/signup", controllers.userController.signUpUser);
router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
    successRedirect: "/posts",
  }),
);

module.exports = router;
