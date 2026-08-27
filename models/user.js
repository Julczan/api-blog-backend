const { prisma } = require("../lib/prisma");

class User {
  async create(username, email, password) {
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    return user;
  }

  async findByUsername(username) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  }

  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findById({ id }) {
    const user = await prisma.user.findUnique({
      where: { id: +id },
    });
    return user;
  }
}

module.exports = new User();
