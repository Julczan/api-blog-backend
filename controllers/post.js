const { body, validationResult, matchedData } = require("express-validator");

const validateTitle = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Post title can not be empty.")
    .isLength({ max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
];

const validateText = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Post can not be empty.")
    .isLength({ max: 10000 })
    .withMessage("Post must be between 1 and 10000 characters"),
];

async function findAll(req, res, next) {
  const posts = await req.context.models.Post.findAll();
  return res.json(posts);
}

async function findAllPublished(req, res, next) {
  const posts = await req.context.models.Post.findAllPublished();
  return res.json(posts);
}

async function findById(req, res, next) {
  const post = await req.context.models.Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  return res.json(post);
}

async function findPublishedById(req, res, next) {
  const post = await req.context.models.Post.findPublishedById(
    req.params.postId,
  );

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  return res.json(post);
}

const create = [
  validateTitle,
  validateText,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.errors;
      return res.status(400).json(errorsArray);
    }
    const { title, text } = matchedData(req);
    const authorId = req.user.id;
    const post = await req.context.models.Post.create({
      title,
      text,
      authorId,
    });

    return res.json(post);
  },
];

async function findAllComments(req, res, next) {
  const comments = await req.context.models.Post.findAllComments(
    req.params.postId,
  );

  return res.json(comments);
}

async function findAllPublishedComments(req, res, next) {
  const comments = await req.context.models.Post.findAllPublishedComments(
    req.params.postId,
  );

  return res.json(comments);
}

const update = [
  validateTitle,
  validateText,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.errors;
      return res.status(400).json(errorsArray);
    }
    const { title, text } = matchedData(req);
    const { postId } = req.params;
    const post = await req.context.models.Post.update({
      id: postId,
      title,
      text,
    });
    return res.json(post);
  },
];

async function deletePost(req, res, next) {
  const { postId } = req.params;
  const post = await req.context.models.Post.delete(postId);
  return res.json("Post deleted!");
}

async function publish(req, res, next) {
  const { postId } = req.params;
  const post = await req.context.models.Post.publish(postId);
  if (!post) {
    return res.status(401).json({ error: "Post not found" });
  }
  return res.json(post);
}

module.exports = {
  findAll,
  findAllPublished,
  findById,
  findPublishedById,
  create,
  findAllComments,
  findAllPublishedComments,
  update,
  deletePost,
  publish,
};
