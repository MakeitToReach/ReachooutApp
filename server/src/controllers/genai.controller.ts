import { Request, Response } from "express";
import { GoogleGenAI, Part } from "@google/genai";
import { contents as systemInstructionParts } from "../SYSTEM_PROMPT";
import { GEMINI_API_KEY } from "../config/dotenv";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const model = "gemini-2.0-flash"; // Or 'gemini-1.5-flash-latest'

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { userInput, templateData } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: "User input is required." });
    }

    // Prepare the user's content parts
    const userContentParts: Part[] = [
      { text: userInput },
      { text: `Template Data: ${JSON.stringify(templateData)}` },
    ];

    // Non-streaming request
    const result = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: userContentParts }],
      config: {
        responseMimeType: "application/json",
        systemInstruction: systemInstructionParts,
      },
    });

    // This is the key change: Access the content directly from the result object
    const textResponse = result.text;

    console.log("result", result);
    console.log("---------------------");
    console.log("textResponse", textResponse);

    // Let's assume the response is a JSON string as you are using
    // responseMimeType: "application/json"
    let parsedResponse = JSON.parse(textResponse);

    return res.json({ result: parsedResponse });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({
      error: "Something went wrong while processing your request.",
    });
  }
};
