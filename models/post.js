const { prisma } = require("../lib/prisma");

class Post {
  async findAll() {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return posts;
  }

  async findAllPublished() {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
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

  async findPublishedById(id) {
    const post = await prisma.post.findUnique({
      where: {
        id: +id,
        published: true,
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
    const comments = await prisma.comment.findMany({
      where: {
        postId: +id,
      },
      include: {
        author: true,
      },
    });
    return comments;
  }

  async findAllPublishedComments(id) {
    const comments = await prisma.comment.findMany({
      where: {
        postId: +id,
        post: {
          published: true,
        },
      },
      include: {
        author: true,
      },
    });
    return comments;
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

  async publish(id) {
    const post = await prisma.post.findUnique({
      where: { id: +id },
    });
    if (!post) {
      return;
    }
    const updatedPost = await prisma.post.update({
      where: { id: +id },
      data: {
        published: post.published === true ? false : true,
      },
    });
    return updatedPost;
  }
}

module.exports = new Post();
