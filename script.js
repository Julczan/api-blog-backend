const { prisma } = require("./lib/prisma");

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     email: "alice@prisma.io",
  //     username: "Alice",
  //     password: "123",
  //     posts: {
  //       create: {
  //         title: "Hello World",
  //         text: "This is my first post!",
  //         published: true,
  //       },
  //     },
  //   },
  //   include: {
  //     posts: true,
  //   },
  // });
  // console.log("Created user:", user);
  // const user = await prisma.user.update({
  //   where: { id: 6 },
  //   data: {
  //     role: "CREATOR",
  //   },
  // });
  // console.log(user);
  const allUsers = await prisma.post.deleteMany({});
  // console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
