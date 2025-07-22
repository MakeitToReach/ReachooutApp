import { Request, Response } from "express";
import { GoogleGenAI, Part } from "@google/genai";
import { contents as systemInstructionParts } from "../SYSTEM_PROMPT"; // Assuming this exports `Part[]`
import { GEMINI_API_KEY } from "../config/dotenv"; // Ensure this correctly imports your API key

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

const model = "gemini-2.0-flash"; // Or 'gemini-1.5-flash-latest' for the newest flash model

export const generateContent = async (req: Request, res: Response) => {
    try {
        const { userInput, templateData } = req.body;

        if (!userInput) {
            return res.status(400).json({ error: "User input is required." });
        }

        // Prepare the user's content parts
        // Note: The `Part[]` type is correct for individual parts within a content block.
        const userContentParts: Part[] = [
            { text: userInput },
            { text: `Template Data: ${JSON.stringify(templateData)}` },
        ];

        const responseStreamResult = await ai.models.generateContentStream({
            model: model,
            contents: [{ role: "user", parts: userContentParts }],
            config: {
                responseMimeType: "application/json",
                systemInstruction: systemInstructionParts,
            },
        });

        let fullResponse = "";
        // Iterate over the stream of chunks
        for await (const chunk of responseStreamResult) {
            if (chunk.text) {
                fullResponse += chunk.text;
            }
        }

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(fullResponse);
        } catch (parseError) {
            console.error("Failed to parse model response:", parseError);
            console.error("Raw response from model:", fullResponse); // Log raw response for debugging
            return res.status(500).json({
                error: "Failed to parse model response. Check server logs for details.",
            });
        }

        return res.json({ result: parsedResponse });
    } catch (error) {
        console.error("Error generating content:", error);
        res
            .status(500)
            .json({ error: "Something went wrong while processing your request." });
    }
};
