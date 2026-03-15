import { prisma } from "../helpers/db.js";

export const findAllPublished = () =>
  prisma.article.findMany({ where: { published: true } });

export const findById = (id) =>
  prisma.article.findUnique({ where: { id: Number(id) } });

export const create = (data) =>
  prisma.article.create({ data });

export const update = (id, data) =>
  prisma.article.update({ where: { id: Number(id) }, data });

export const deleteById = (id) =>
  prisma.article.delete({ where: { id: Number(id) } });

export const publish = (id) =>
  prisma.article.update({ where: { id: Number(id) }, data: { published: true } });

export const searchByTitle = (title) =>
  prisma.article.findMany({
    where: { title: { contains: title, mode: "insensitive" } },
  });