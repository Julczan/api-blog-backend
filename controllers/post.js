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
    return res.status(404).json({ message: "Post not found" });
  }

  return res.json(post);
}

async function create(req, res, next) {
  const { title, text } = req.body;
  const authorId = req.user.id;
  const post = await req.context.models.Post.create({ title, text, authorId });
  return res.json(post);
}

async function findAllComments(req, res, next) {
  const comments = await req.context.models.Post.findAllComments(
    req.params.postId,
  );

  return res.json(comments);
}

async function update(req, res, next) {
  const { postId } = req.params;
  const { title, text } = req.body;
  const post = await req.context.models.Post.update({
    id: postId,
    title,
    text,
  });

  return res.json(post);
}

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
  create,
  findAllComments,
  update,
  deletePost,
  publish,
};
