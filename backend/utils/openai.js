import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const getAiResponse = async (userInput) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",
            contents: userInput
        });

        console.log("Gemini response:", response.text);

        return response.text;

    } catch (error) {
        console.log("Gemini Error:", error);
        throw error;
    }
};

export default getAiResponse;