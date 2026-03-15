import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  const articles = [
    {
      title: "Breaking News: Node.js 22 Released",
      content: "Node.js version 22 is officially released with exciting new features.",
      author: "Hazel Saputra",
      thumbnail: "/uploads/thumbnails/node22.png",
      published: true,
    },
    {
      title: "Prisma 7: The New ORM Experience",
      content: "Prisma 7 introduces adapters, better performance, and ESM support.",
      author: "Hazel Saputra",
      thumbnail: "/uploads/thumbnails/prisma7.png",
      published: false,
    },
    {
      title: "Express.js Tips & Tricks",
      content: "Learn how to structure your Express.js backend like a pro.",
      author: "Hazel Saputra",
      thumbnail: "/uploads/thumbnails/express.png",
      published: true,
    },
    {
      title: "Deploying PostgreSQL in Production",
      content: "Best practices for running PostgreSQL safely and efficiently.",
      author: "Hazel Saputra",
      thumbnail: "/uploads/thumbnails/postgres.png",
      published: false,
    },
    {
      title: "JavaScript ES2026 Features",
      content: "Check out the new features in JavaScript for 2026.",
      author: "Hazel Saputra",
      thumbnail: "/uploads/thumbnails/es2026.png",
      published: true,
    },
  ];

  for (const article of articles) {
    await prisma.article.create({
      data: article,
    });
  }

  console.log("Seeder finished! 5 articles added.");
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async (): Promise<void> => {
    await prisma.$disconnect();
  });