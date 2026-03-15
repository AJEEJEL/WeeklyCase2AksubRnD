import * as articleRepo from "../repositories/article.repository.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/thumbnails";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

export const upload = multer({ storage }).single("thumbnail");
export const getAllPublished = async () => {
  const data = await articleRepo.findAllPublished();
  if (!data || data.length === 0) {
    return { message: "No published articles yet", data: [] };
  }
  return { data };
};
export const getById = (id) => articleRepo.findById(id);

export const createArticle = (data, file) => {
  if (file) data.thumbnail = file.path;
  return articleRepo.create(data);
};

export const updateArticle = (id, data, file) => {
  if (file) data.thumbnail = file.path;
  return articleRepo.update(id, data);
};

export const deleteArticle = (id) => articleRepo.deleteById(id);
export const publishArticle = (id) => articleRepo.publish(id);
export const searchByTitle = async (title) => {
  const data = await articleRepo.searchByTitle(title);
  if (!data || data.length === 0) {
    return { message: `No articles found matching "${title}"`, data: [] };
  }
  return { data };
};
