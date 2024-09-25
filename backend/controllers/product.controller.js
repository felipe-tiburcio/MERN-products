import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      res.status(404).json({ success: false, message: "Products not found" });
    } else {
      res
        .status(200)
        .json({ success: true, count: products.length, data: products });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOneProduct = async (req, res) => {
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
};

export const saveProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
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
    res
      .status(200)
      .json({
        success: true,
        data: updatedProduct,
        message: "Product updated successfully",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Id" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      res.status(200).json({
        success: true,
        data: deletedProduct,
        message: "Product removed successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
