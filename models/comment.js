const { prisma } = require("../lib/prisma");

class Comment {
  async findById({ postId, commentId }) {
    const comment = await prisma.comment.findFirst({
      where: {
        AND: [{ postId: +postId, id: +commentId }],
      },
      include: { author: true },
    });
    return comment;
  }

  async findPublishedById({ postId, commentId }) {
    const comment = await prisma.comment.findFirst({
      where: {
        postId: +postId,
        id: +commentId,
        post: {
          published: true,
        },
      },
      include: { author: true },
    });
    return comment;
  }

  async create({ postId, text, authorId }) {
    const comment = await prisma.comment.create({
      data: {
        postId: +postId,
        text,
        authorId,
      },
    });
    return comment;
  }

  async update({ commentId, postId, text }) {
    const comment = await prisma.comment.updateMany({
      where: {
        AND: [{ postId: +postId, id: +commentId }],
      },
      data: {
        text,
      },
    });
    return comment;
  }

  async delete({ postId, commentId }) {
    const post = await prisma.comment.deleteMany({
      where: {
        AND: [{ postId: +postId, id: +commentId }],
      },
    });
    return post;
  }
}

module.exports = new Comment();
