import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

//import routes
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

import axios from "axios";
//for reload
const url = `https://social-media-app-gkbm.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadWebsite, interval);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//for development
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

//for development
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // ✅ works in Express v4 and v5
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
