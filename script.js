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

  // const comment = await prisma.user.create({
  //   data: {
  //     email: "julek@gmail.com",
  //     username: "Julek",
  //     password: "123",
  //     comments: {
  //       create: {
  //         text: "first comment",
  //         postId: 4,
  //       },
  //     },
  //   },
  // });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      comments: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
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
