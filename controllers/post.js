async function findAll(req, res, next) {
  const posts = await req.context.models.Post.findAll();
  return res.json(posts);
}

async function findById(req, res, next) {
  const posts = await req.context.models.Post.findById(req.params.postId);
  return res.json(posts);
}

async function create(req, res, next) {
  const { title, text } = req.body;
  const authorId = req.user.id;
  const post = await req.context.models.Post.create({ title, text, authorId });
  return res.json(post);
}

module.exports = { findAll, findById, create };
