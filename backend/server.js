import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import { connectDb } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server started at port ${PORT}`);
});
