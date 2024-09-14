import express from "express";

const app = express();

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "API is working!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
