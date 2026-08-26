const { prisma } = require("../lib/prisma");

class Post {
  async findById(id) {
    const post = await prisma.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        author: true,
        comments: {
          select: {
            text: true,
            author: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return post;
  }

  async findAll() {
    const posts = await prisma.post.findMany({});
    return posts;
  }
}

module.exports = new Post();
