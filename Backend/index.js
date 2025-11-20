import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";

import FarmerFormRoute from "./Routes/FarmerFormRoutes.js";
import AiTreatmentRoute from "./Routes/AiTreatmentRoute.js";
import userRoutes from "./Routes/userRoutes.js";
import testRoute from "./Routes/testRoute.js";
import materialRoute from "./Routes/MaterialRoute.js";
import articleRoutes from "./Routes/articleRoutes.js";
import alertRoutes from "./Routes/alertRoutes.js";
import ManagerRoutes from "./Routes/ManagerRoutes.js";
import activityRoutes from "./Routes/activityRoutes.js";
import ProductRoutes from "./Routes/ProductRoutes.js";   // ✅ FIXED

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to SMART_AGRIGUARD_Mern API");
});

// All routes
app.use("/api/products", ProductRoutes);      // ✅ products working
app.use('/materials', materialRoute);
app.use("/api/auth", userRoutes);
app.use("/api/test", testRoute);
app.use('/api/activities', activityRoutes);
app.use("/farmer", FarmerFormRoute);
app.use("/ai", AiTreatmentRoute);
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
app.use('/manager', ManagerRoutes);
app.use('/alerts', alertRoutes);

// DB Connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  })