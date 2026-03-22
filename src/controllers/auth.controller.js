import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const result = await authService.createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await authService.loginService(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const assignRole = async (req, res) => {
  try {
    const { email, role } = req.body;
    const result = await authService.assignRoleService(email, role);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};