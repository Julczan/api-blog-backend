const { body, validationResult, matchedData } = require("express-validator");

const validateComment = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Comment can not be empty.")
    .isLength({ max: 1000 })
    .withMessage("Post must be between 1 and 1000 characters"),
];

async function findById(req, res, next) {
  const { postId, commentId } = req.params;

  const comment = await req.context.models.Comment.findById({
    postId,
    commentId,
  });

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  return res.json(comment);
}

async function findPublishedById(req, res, next) {
  const { postId, commentId } = req.params;

  const comment = await req.context.models.Comment.findPublishedById({
    postId,
    commentId,
  });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  return res.json(comment);
}

const create = [
  validateComment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.errors;
      return res.status(400).json(errorsArray);
    }
    const { text } = matchedData(req);
    const { postId } = req.params;
    const authorId = req.user.id;
    const comment = await req.context.models.Comment.create({
      postId,
      text,
      authorId,
    });
    return res.json(comment);
  },
];

const update = [
  validateComment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.errors;
      return res.status(400).json(errorsArray);
    }
    const { text } = matchedData(req);
    const { commentId, postId } = req.params;
    const comment = await req.context.models.Comment.update({
      commentId,
      postId,
      text,
    });
    return res.json(comment);
  },
];

// async function update(req, res, next) {
//   const { commentId, postId } = req.params;
//   const { text } = req.body;

//   const comment = await req.context.models.Comment.update({
//     commentId,
//     postId,
//     text,
//   });

//   return res.json(comment);
// }

async function deleteComment(req, res, next) {
  const { postId, commentId } = req.params;
  const post = await req.context.models.Comment.delete({ postId, commentId });
  return res.json("Comment deleted!");
}

module.exports = { findById, create, update, deleteComment, findPublishedById };
