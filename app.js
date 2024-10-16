import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { connectToDb } from "./utils/dbConnect.js";
import errorHandler from "./middleware/errorHandler.js";
import productRoutes from "./routes/product.route.js";
import routes from "./routes/index.js";

const app = express();

// Middleware for CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Middleware for parsing URL-encoded and JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Health check route
app.use("/health", (req, res, next) => {
  res.send("working");
});

// Connect to database
connectToDb();

// Routes
app.use("/api/products", productRoutes); // Product routes
app.use("/api", routes); // Other routes

// Global error handler (handles existing routes with invalid data that prevents the app from crashing)
app.use(errorHandler);

// Server
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
