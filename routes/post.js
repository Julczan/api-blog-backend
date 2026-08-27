const { Router } = require("express");
const controllers = require("../controllers/index");
const passport = require("passport");

const router = Router();

router.get("/", controllers.postController.findAll);
router.get("/:postId", controllers.postController.findById);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controllers.userController.checkRole,
  controllers.postController.create,
);

module.exports = router;
