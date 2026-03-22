import express from "express";
import * as articleController from "../controllers/article.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/search", articleController.searchByTitle);
router.get("/", articleController.getAllPublished);
router.get("/:id", articleController.getById);
router.post("/", authenticate, authorize("writer", "admin"), articleController.createArticle);
router.put("/:id", authenticate, authorize("writer", "admin"), articleController.updateArticle);
router.delete("/:id", authenticate, authorize("writer", "editor", "admin"), articleController.deleteArticle);
router.patch("/:id/publish", authenticate, authorize("editor"), articleController.publishArticle);

export default router;