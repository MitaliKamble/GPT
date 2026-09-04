import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import chatRoutes from "./routes/chat.js"
dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/api/ask", async (req, res) => {
    try {
        const { userInput } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: userInput
        });

        res.json({
            response: response.text
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect with Database");
  } catch (err) {
    console.log("Failed to connect with DB", err);
  }
};


