import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export let isConnected: boolean = false;

export async function connectDatabase() {
  if (!process.env.DATABASE_URL) return console.log("MISSING DATABASE_URL");

  // if (isConnected) {
  //   return console.log("Database is already connected");
  // } else {
  //   await prisma.$connect().then(async () => { // this $connect() method right here is not really required
  //     console.log("Database Connected");
  //     isConnected = true;
  //   });
  // }
}

const operateDB = async () => {
  try {
    const user = await prisma.user
      .create({
        data: { username: "Sahan", password: "Sahan123" },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

const start = async () => {
  await connectDatabase();
  await connectDatabase();

  operateDB();
};

start();
