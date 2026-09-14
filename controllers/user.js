const { body, validationResult, matchedData } = require("express-validator");
const { generatePassword } = require("../lib/passwordUtils");
const jwt = require("jsonwebtoken");

const lengthErr = "must be between 1 and 15 characters!";

const validateSignUp = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage(`Username ${lengthErr}`)
    .custom(async (value, { req }) => {
      const user = await req.context.models.User.findByUsername(value);
      if (user) {
        throw new Error("Username already exists!");
      }
    }),
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email!")
    .custom(async (value, { req }) => {
      const user = await req.context.models.User.findByEmail(value);
      if (user) {
        throw new Error("Email already exists!");
      }
    }),
  ,
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must have at least 5 characters!"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match!"),
];

const signUpUser = [
  validateSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.errors;
      return res.status(400).json(errorsArray);
    }
    const { username, email, password } = matchedData(req);
    const hashedPassword = await generatePassword(password);

    const user = await req.context.models.User.create(
      username,
      email,
      hashedPassword,
    );
    res.json("User created!");
  },
];

function signToken(req, res, next) {
  const user = req.user;
  const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
  return res.json({ user, token });
}

function checkRole(req, res, next) {
  if (req.user.role === "CREATOR") {
    next();
  } else {
    res.status(400).json("Unauthorized");
  }
}

async function checkIfPostAuthor(params) {
  const { postId } = req.params;

  let authorId = "";
  const post = await req.context.models.Post.findById(postId);

  if (!post) {
    return res.status(401).json({ error: "Post not found" });
  }
  authorId = post.author.id;

  if (req.user.id === authorId) {
    next();
  } else {
    return res.status(401).json({ error: "AuthenticationError: Unauthorized" });
  }
}

async function checkIfCommentAuthor(req, res, next) {
  const { postId, commentId } = req.params;

  let authorId = "";

  const comment = await req.context.models.Comment.findById({
    postId,
    commentId,
  });
  if (!comment) {
    return res.status(401).json({ error: "Comment not found" });
  }
  authorId = comment.author.id;

  if (req.user.id === authorId) {
    next();
  } else {
    return res.status(401).json({ error: "AuthenticationError: Unauthorized" });
  }
}

async function failedLogin(req, res, next) {
  return res.status(401).json({ msg: "Invalid username or password" });
}

module.exports = {
  signUpUser,
  signToken,
  checkRole,
  checkIfPostAuthor,
  checkIfCommentAuthor,
  failedLogin,
};
