import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    const { name, price, image } = newProduct;

    if (!name || !image || !price) {
      return { success: false, message: "All fields are necessary" };
    }

    try {
      const res = await axios.post("/api/products", newProduct);
      const data = res.data;

      set((state) => ({ products: [...state.products, data] }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  fetchProducts: async () => {
    const { data } = await axios.get("/api/products");

    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);

      if (!data.success) {
        return {
          success: false,
          message: res.message,
        };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  updateProduct: async (id, updatedProduct) => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, updatedProduct);

      if (!data.success) {
        return {
          success: false,
          message: data.message,
        };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
