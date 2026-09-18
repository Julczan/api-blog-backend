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

async function create(req, res, next) {
  const { text } = req.body;
  const { postId } = req.params;
  const authorId = req.user.id;
  const comment = await req.context.models.Comment.create({
    postId,
    text,
    authorId,
  });
  return res.json(comment);
}

async function update(req, res, next) {
  const { commentId, postId } = req.params;
  const { text } = req.body;

  const comment = await req.context.models.Comment.update({
    commentId,
    postId,
    text,
  });
  return res.json(comment);
}

async function deleteComment(req, res, next) {
  const { postId, commentId } = req.params;
  const post = await req.context.models.Comment.delete({ postId, commentId });
  return res.json("Comment deleted!");
}

module.exports = { findById, create, update, deleteComment, findPublishedById };
