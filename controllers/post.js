exports.findAll = async (req, res, next) => {
  const posts = await req.context.models.Post.findAll();
  return res.json(posts);
};
