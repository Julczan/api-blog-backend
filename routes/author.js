const { Router } = require("express");
const controllers = require("../controllers/index");
const passport = require("passport");

const router = Router();

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.userController.checkRole,
  controllers.postController.findAll,
);

module.exports = router;
