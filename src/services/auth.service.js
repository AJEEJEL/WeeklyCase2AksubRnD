import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/auth.repository.js";

export const createUser = async (data) => {
  const { name, email, password, dateOfBirth } = data;

  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) throw new Error("Email already used");

  const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
  if (!regex.test(password)) {
    throw new Error("Password must contain uppercase & number");
  }

  const hashed = await bcrypt.hash(password, 10);

  return userRepo.createUser({
    name,
    email,
    password: hashed,
    role: "reader",
    dateOfBirth: new Date(dateOfBirth),
  });
};

export const loginService = async (data) => {
  const { email, password } = data;

  const user = await userRepo.findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Wrong password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};

export const assignRoleService = async (email, role) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) throw new Error("User not found");

  if (!["reader","writer","editor","admin"].includes(role)) throw new Error("Invalid role");

  const updatedUser = await userRepo.updateUserRole(email, role);

  return { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role };
};