import { prisma } from "../helpers/db.js";

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (data) => {
  return prisma.user.create({ data });
};

export const updateUserRole = (email, role) => {
  return prisma.user.update({
    where: { email },
    data: { role },
  });
};