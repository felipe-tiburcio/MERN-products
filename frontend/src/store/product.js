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
}));
