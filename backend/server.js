import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import path from "path";

import { connectDb } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log(`Server started at port ${PORT}`);
});
