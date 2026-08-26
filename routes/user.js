const { Router } = require("express");
const controllers = require("../controllers/index");

const router = Router();

router.post("/signup", controllers.userController.signUpUser);

module.exports = router;
