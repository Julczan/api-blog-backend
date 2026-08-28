async function findAll(req, res, next) {
  const posts = await req.context.models.Post.findAll();
  return res.json(posts);
}

async function findAllPublished(req, res, next) {
  const posts = await req.context.models.Post.findAllPublished();
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

async function findAllComments(req, res, next) {
  const comments = await req.context.models.Post.findAllComments(
    req.params.postId,
  );
  return res.json(comments);
}

async function createComment(req, res, next) {
  const { text } = req.body;
  const { postId } = req.params;
  const authorId = req.user.id;
  const comment = await req.context.models.Post.createComment({
    id: postId,
    text,
    authorId,
  });
  return res.json(comment);
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

module.exports = {
  findAll,
  findAllPublished,
  findById,
  create,
  findAllComments,
  createComment,
  update,
  deletePost,
};
