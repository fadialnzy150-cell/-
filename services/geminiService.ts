import { GoogleGenAI, Type } from "@google/genai";
import { QuoteResult } from "../types";
import { GEMINI_MODEL } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface GeminiQuoteResponse {
  quote: {
    en: string;
    ar: string;
  };
  origin: {
    en: string;
    ar: string;
  };
  advice: {
    en: string;
    ar: string;
  };
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    quote: {
      type: Type.OBJECT,
      properties: {
        en: { type: Type.STRING, description: "The quote in English." },
        ar: { type: Type.STRING, description: "The quote in Arabic." },
      },
      required: ["en", "ar"],
    },
    origin: {
      type: Type.OBJECT,
      properties: {
        en: { type: Type.STRING, description: "The origin of the quote (e.g., author, movie, book) in English." },
        ar: { type: Type.STRING, description: "The origin of the quote (e.g., author, movie, book) in Arabic." },
      },
      required: ["en", "ar"],
    },
    advice: {
      type: Type.OBJECT,
      properties: {
        en: { type: Type.STRING, description: "A short, practical, and actionable piece of advice for the person feeling this mood, in English." },
        ar: { type: Type.STRING, description: "A short, practical, and actionable piece of advice for the person feeling this mood, in Arabic." },
      },
      required: ["en", "ar"],
    },
  },
  required: ["quote", "origin", "advice"],
};

export const findQuote = async (mood: string): Promise<QuoteResult> => {
  const prompt = `Find a quote that matches the mood: "${mood}". The quote should be inspiring or philosophical. Provide the quote and its origin. Also, provide a short, practical, actionable piece of advice for someone feeling this way. The quote, origin, and advice must be provided in both English and Arabic.`;
  
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as GeminiQuoteResponse;
    
    return {
      quote: result.quote,
      origin: result.origin,
      advice: result.advice,
    };

  } catch (error) {
    console.error("Error finding quote:", error);
    throw new Error("Failed to fetch a quote from the Gemini API.");
  }
};