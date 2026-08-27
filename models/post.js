const { prisma } = require("../lib/prisma");

class Post {
  async findAll() {
    const posts = await prisma.post.findMany({});
    return posts;
  }

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
  

async create({title, text, authorId}){
const post = await prisma.post.create({
data:{
title, text, authorId
}
})
return post;
}
}

module.exports = new Post();
