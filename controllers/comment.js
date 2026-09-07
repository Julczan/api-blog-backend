async function findById(req, res, next) {
  const { postId, commentId } = req.params;

  const comment = await req.context.models.Comment.findById(postId, commentId);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  return res.json(comment);
}

async function update(req, res, next) {
  const { commentId } = req.params;
  const { text } = req.body;

  const comment = await req.context.models.Comment.update({
    id: commentId,
    text,
  });
  return res.json(comment);
}

async function deleteComment(req, res, next) {
  const { commentId } = req.params;
  const post = await req.context.models.Comment.delete(commentId);
  return res.json("Comment deleted!");
}

module.exports = { findById, update, deleteComment };
