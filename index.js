import express from "express";
import articleRoutes from "./src/routes/article.routes.js";

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/articles", articleRoutes);

app.get("/", (req, res) => res.send("API Running"));

app.listen(3000, () => console.log("Server running on port 3000"));