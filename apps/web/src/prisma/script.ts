import { prisma } from "@/lib/prisma";

async function main() {
  //   await prisma.user.create({
  //     data: {
  //       text: "test1",
  //     },
  //   });

  const data = await prisma.user.findMany({});
  console.log("data :>> ", data);
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
