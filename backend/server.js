import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: 'https://crm-project-3lbhfrontend.vercel.app/',
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));