import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateProductGuide(productName: string, platform: string) {
  const prompt = `Generate a comprehensive, step-by-step user customization guide for a digital product named "${productName}" designed for the ${platform} platform.
  
  Requirements:
  - Length: 800-1,200 words.
  - Language: US English, Grade-6 readability.
  - Structure: Introduction, Prerequisites, Step-by-Step Customization (at least 5 steps), Advanced Tips, Exporting Instructions, and FAQ.
  - Tone: Professional, encouraging, and clear.
  - Include placeholders for screenshots like [Screenshot 1: 1440x900px, 80% JPEG, Arrow pointing to edit button].
  
  The guide should be ready for commercial distribution.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating guide:", error);
    return "Failed to generate guide. Please check your API key.";
  }
}

export async function generateListingMetadata(productName: string, platform: string) {
  const prompt = `Generate Etsy/Marketplace listing metadata for "${productName}" on ${platform}.
  
  Return a JSON object with:
  - seoTitle: string (max 140 chars)
  - keywords: string[] (exactly 13 tags)
  - pricingRecommendation: number (USD)
  - description: string (compelling marketing copy)
  
  Ensure it's optimized for SEO.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            seoTitle: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            pricingRecommendation: { type: Type.NUMBER },
            description: { type: Type.STRING },
          },
          required: ["seoTitle", "keywords", "pricingRecommendation", "description"],
        },
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error generating metadata:", error);
    return null;
  }
}
