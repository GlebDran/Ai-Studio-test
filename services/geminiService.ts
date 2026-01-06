
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPersonalizedRecommendation(userMood: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the user's mood: "${userMood}", recommend a type of sauna vacation. 
    Options: 
    1. Deep Forest Isolation (for silence and reflection)
    2. Riverside Mirror Luxury (for modern romance and design)
    3. Heritage Smoke Sauna (for cultural depth and authentic heat)
    4. Hilltop Wellness (for families or groups and activities)
    
    Keep the response concise and poetic.`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 100,
    }
  });

  return response.text;
}
