import express from "express";
import * as articleController from "../controllers/article.controller.js";

const router = express.Router();

router.get("/search", articleController.searchByTitle);
router.get("/", articleController.getAllPublished);
router.get("/:id", articleController.getById);
router.post("/", articleController.createArticle);
router.put("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);
router.patch("/:id/publish", articleController.publishArticle);


export default router;