const { Router } = require("express");
const controllers = require("../controllers/index");

const router = Router();

router.get("/", controllers.postController.findAll);
router.get("/:postId", controllers.postController.findById);

module.exports = router;
