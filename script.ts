import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// const prisma = new PrismaClient({ log: ["query"] });

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

const createOne = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        username: "Sahan",
        password: "Sahan123",
        age: 20,
        name: "Sahan",
        role: "ADMIN",
        userPreference: {
          create: {
            emailUpdates: true,
          },
        },
      },
      // select { // include and select cannot run together
      //   name:true,
      // },
      include: {
        userPreference: true,
      },
    });
    // .finally(async () => {
    //   await prisma.$disconnect(); // not required
    // });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

const createMany = async () => {
  try {
    const users = await prisma.user.createMany({
      data: [
        {
          username: "Sahan1",
          password: "Sahan1234",
          age: 20,
          name: "Sahan1",
        },
        {
          username: "Sahan2",
          password: "Sahan12345",
          age: 20,
          name: "Sahan2",
        },
      ],
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const findUnique = async () => {
  try {
    const users = await prisma.user.findUnique({
      // only can be search by @unique type fields
      where: {
        username: "Sahan1",
      },
    });
    // .finally(async () => {
    //   await prisma.$disconnect(); // not required
    // });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const findMany1 = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        username: "Sahan1",
        name: "Sahan",
      },
      distinct: ["age"],
      take: 2, // pagination
      skip: 1, // skips
      orderBy: {
        age: "asc",
      },
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const findMany2 = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        // username: { equals: "Sahan" },
        // username: { in: ["Sahan", "Nisal"] },
        username: { contains: "Sahan" },
        age: { lte: 30 },
      },
      orderBy: {
        age: "desc",
      },
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const findMany3 = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        //AND: [{ username: { contains: "Sahan" } }, { name: "Sahan" }],
        OR: [{ username: { contains: "Sahan" } }, { name: "Sahan" }],
        NOT: [{ age: 20 }],
      },
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const findMany4 = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        favoriteBooks: {
          // every: { // checks if every single book in this array has name as "Test", then it returns that user. if every items ara passed
          //   name: "Test"
          // },
          // some: {
          //   name: "Test"
          // },
          none: {
            name: "Test",
          },
        },
      },
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const findMany5 = async () => {
  try {
    const users = await prisma.book.findMany({
      where: {
        author: {
          is: {
            age: 20,
          },
          isNot: {
            age: 25,
          },
        },
      },
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const update = async () => {
  try {
    const users = await prisma.user.update({
      where: {
        username: "Sahan1", // update requires an unique field
      },
      data: {
        username: "Chathura",
        age: {
          increment: 1,
        },
      },
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const updateMany = async () => {
  try {
    const users = await prisma.user.updateMany({
      where: {
        name: "Sahan1",
      },
      data: {
        name: "Chathura",
      },
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const updateMany2 = async () => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: "Sahan",
      },
      include: { userPreference: true },
    });

    const userPreference = await prisma.userPreference.create({
      data: {
        emailUpdates: true,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    const users = await prisma.user.update({
      where: {
        username: "Sahan",
      },
      data: {
        userPreference: {
          // create: {
          //   emailUpdates: false,
          // },
          // connect: {
          //   id: userPreference.id,
          // },
          disconnect: true,
        },
      },
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    const user = await prisma.user.delete({
      where: {
        username: "Sahan", // @unique field required
      },
    });
    console.log(user);

    const users = await prisma.user.deleteMany({
      where: {
        username: "Sahan",
      },
    });
    console.log(users);

    const allData = await prisma.user.deleteMany();
    console.log(allData);
  } catch (error) {
    console.log(error);
  }
};

const start = async () => {
  await connectDatabase();
  await connectDatabase();

  createOne();
};

start();
