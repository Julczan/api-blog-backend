const { Router } = require("express");
const controllers = require("../controllers/index");
const passport = require("passport");

const router = Router();

router.get("/", controllers.postController.findAllPublished);

router.get("/:postId", controllers.postController.findById);
router.get("/:postId/comments", controllers.postController.findAllComments);

router.get(
  "/:postId/comments/:commentId",
  controllers.commentController.findById,
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.userController.checkRole,
  controllers.postController.create,
);

router.post(
  "/:postId/comments",
  passport.authenticate("jwt", {
    session: false,
    failWithError: true,
  }),
  controllers.commentController.create,
);

router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.userController.checkRole,
  controllers.userController.checkIfAuthor,
  controllers.postController.update,
);

router.put(
  "/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.userController.checkIfAuthor,
  controllers.commentController.update,
);

router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.userController.checkIfAuthor,
  controllers.postController.deletePost,
);

router.delete(
  "/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  controllers.userController.checkIfAuthor,
  controllers.commentController.deleteComment,
);

module.exports = router;
