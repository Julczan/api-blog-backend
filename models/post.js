const { prisma } = require("../lib/prisma");

class Post {
  async findAll() {
    const posts = await prisma.post.findMany({});
    return posts;
  }

  async findAllPublished() {
    const posts = await prisma.post.findMany({
      where: { published: true },
    });
    return posts;
  }

  async findById(id) {
    const post = await prisma.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        author: true,
      },
    });
    return post;
  }

  async create({ title, text, authorId }) {
    const post = await prisma.post.create({
      data: {
        title,
        text,
        authorId,
      },
    });
    return post;
  }

  async findAllComments(id) {
    const comments = await prisma.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        comments: true,
      },
    });
    return comments;
  }

  async createComment({ id, text, authorId }) {
    const comment = await prisma.post.update({
      where: { id: +id },
      data: {
        comments: {
          create: {
            text,
            authorId,
          },
        },
      },
      include: {
        comments: true,
      },
    });
    return comment;
  }

  async update({ id, title, text }) {
    const post = await prisma.post.update({
      where: { id: +id },
      data: {
        title,
        text,
      },
    });
    return post;
  }

  async delete(id) {
    const post = await prisma.post.delete({
      where: { id: +id },
    });
    return post;
  }
}

module.exports = new Post();
