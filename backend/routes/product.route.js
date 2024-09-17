import express from "express";
import {
  getProducts,
  getOneProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getOneProduct);

router.post("/", saveProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
