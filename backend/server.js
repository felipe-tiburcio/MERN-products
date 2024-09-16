import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import { connectDb } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "API is working!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    await newProduct.save();

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  const newProduct = req.body;

  if (!newProduct.name || !newProduct.price || !newProduct.image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are necessary" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    res.status(204).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res
      .status(204)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server started at port ${PORT}`);
});
