import * as articleService from "../services/article.service.js";

export const getAllPublished = async (req, res) => {
  try {
    const articles = await articleService.getAllPublished();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const article = await articleService.getById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    await articleService.upload(req, res, async (err) => {
      if (err) return res.status(400).json({ error: err.message });

      const data = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        published: false,
      };
      const article = await articleService.createArticle(data, req.file);
      res.status(201).json(article);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    await articleService.upload(req, res, async (err) => {
      if (err) return res.status(400).json({ error: err.message });

      const data = { ...req.body };
      const article = await articleService.updateArticle(req.params.id, data, req.file);
      res.json(article);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    await articleService.deleteArticle(req.params.id);
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const publishArticle = async (req, res) => {
  try {
    const article = await articleService.publishArticle(req.params.id);
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const articles = await articleService.searchByTitle(title);
    res.json(articles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};