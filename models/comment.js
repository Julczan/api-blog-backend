const { prisma } = require("../lib/prisma");

class Comment {
  async findById(postId, commentId) {
    const comment = await prisma.comment.findFirst({
      where: {
        AND: [{ postId: +postId, id: +commentId }],
      },
    });
    return comment;
  }

  async update({ id, text }) {
    const comment = await prisma.comment.update({
      where: {
        id: +id,
      },
      data: {
        text,
      },
    });
    return comment;
  }

  async delete(id) {
    const post = await prisma.comment.delete({
      where: { id: +id },
    });
    return post;
  }
}

module.exports = new Comment();
