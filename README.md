# Prisma Demo

Prisma Integration Demo with MySQL (Relational Databases) by Sahan Sachintha using typescript and nodejs

## Getting Started

First, run the development server:

```bash
pnpm i
# or
npm i
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Learn More

To learn more about Prisma, take a look at the following resources:

- [Prisma Documentation](https://www.prisma.io/docs/getting-started) - learn about Prisma features.

```bash
pnpm prisma init
# Then configure .env file and prisma/schema.prisma file
```

```bash
# add relavant schemas and run this command to migrate prisma database schema to MySQL
pnpm prisma migrate dev --name init
# or pull your current database to schema.prisma file using
pnpm prisma db pull
# then
pnpm prisma generate
```
