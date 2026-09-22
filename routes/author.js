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
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.postController.findAllComments,
);

router.get(
  "/posts/:postId/comments/:commentId",
  controllers.commentController.findById,
);

router.post(
  "/posts/:postId/publish",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.userController.checkRole,
  controllers.userController.checkIfPostAuthor,
  controllers.postController.publish,
);

router.put(
  "/posts/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.commentController.update,
);

router.delete(
  "/posts/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.commentController.deleteComment,
);

module.exports = router;
