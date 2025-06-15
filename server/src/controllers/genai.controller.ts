import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { contents as systemPrompt } from "../SYSTEM_PROMPT";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const model = "gemini-2.0-flash";

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { userInput, templateData } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: "User input is required." });
    }

    // Combine system prompt with user input and template data
    const combinedContents = [
      ...systemPrompt,
      {
        role: "user",
        parts: [
          { text: userInput },
          { text: `Template Data: ${JSON.stringify(templateData)}` }, // Attach templateData if needed
        ],
      },
    ];

    const responseStream = await ai.models.generateContentStream({
      model,
      config: { responseMimeType: "application/json" },
      contents: combinedContents,
    });

    let fullResponse = "";
    for await (const chunk of responseStream) {
      fullResponse += chunk.text;
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(fullResponse);
    } catch (parseError) {
      console.error("Failed to parse response:", parseError);
      return res.status(500).json({ error: "Failed to parse model response." });
    }

    return res.json({ result: parsedResponse });
  } catch (error) {
    console.error("Error generating content:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while processing your request." });
  }
};
