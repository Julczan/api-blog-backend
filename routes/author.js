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

router.get(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.userController.checkRole,
  controllers.postController.findById,
);

router.get(
  "/posts/:postId/comments",
  controllers.postController.findAllComments,
);

router.post(
  "/posts/:postId/publish",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.userController.checkRole,
  controllers.userController.checkIfPostAuthor,
  controllers.postController.publish,
);

module.exports = router;
