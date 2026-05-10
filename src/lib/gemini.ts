import { GoogleGenAI, Type } from "@google/genai";
import { MoodAnalysis, Language } from "../types";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function analyzeMood(input: string, lang: Language): Promise<MoodAnalysis> {
  const prompt = `
    Analyze the following user mood input: "${input}"
    
    1. Identify 2 core emotions and their intensities (summing to 100).
    2. Recommend a creative comforting dish that heals these emotions.
       - Angry -> Crunchy/Spicy food for release
       - Sad -> Warm/Sweet food for comfort
       - Anxious -> Grounding/Umami food for stability
       - Tired -> Refreshing/Zesty food for energy
    3. Provide a creative title for the dish.
    4. Provide a poetic reason why this food heals the emotion.
    5. Provide a sensory description (sound, smell, texture).
    6. Provide a small non-food self-care tip.
    7. Generate 2-3 short tags (e.g., CALMING, ENERGIZING).
    8. Provide a simple recipe: 4-6 ingredients and 3-5 clear instructions.
    9. Assign an imageCategory from: ['soup', 'spicy', 'sweet', 'fresh', 'noodles', 'rice', 'drink', 'warm'].
    
    Output in ${lang === 'zh' ? 'literary Chinese prose' : 'warm English'}.
    Return ONLY JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            emotions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  percentage: { type: Type.NUMBER },
                  color: { type: Type.STRING, description: "hex color matching the emotion mood" }
                }
              }
            },
            dish: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                reason: { type: Type.STRING },
                vibe: { type: Type.STRING },
                description: { type: Type.STRING },
                tags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                selfCareTip: { type: Type.STRING },
                ingredients: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                instructions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                imageCategory: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    // High-quality category-based image matching
    const categoryImages: Record<string, string> = {
      soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
      spicy: "https://images.unsplash.com/photo-1551811195-2ac5d2757530?auto=format&fit=crop&q=80&w=800",
      sweet: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800",
      fresh: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
      noodles: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800",
      rice: "https://images.unsplash.com/photo-1512058560366-cd24270086cd?auto=format&fit=crop&q=80&w=800",
      drink: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800",
      warm: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
    };

    const cat = (result.dish.imageCategory || 'warm').toLowerCase();
    result.dish.imageUrl = categoryImages[cat] || categoryImages.warm;

    return result as MoodAnalysis;
  } catch (error) {
    console.error("AI Analysis failing:", error);
    throw error;
  }
}
