async function findAll(req, res, next) {
  const posts = await req.context.models.Post.findAll();
  return res.json(posts);
}

async function findById(req, res, next) {
  const posts = await req.context.models.Post.findById(req.params.postId);
  return res.json(posts);
}

module.exports = { findAll, findById };
