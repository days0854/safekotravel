import { GoogleGenAI, Type } from "@google/genai";
import { AIPlanRequest, AIPlanResponse, TravelStyle } from "../types";

// Initialize Gemini Client
// IMPORTANT: process.env.API_KEY is assumed to be available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTravelPlan = async (request: AIPlanRequest): Promise<AIPlanResponse> => {
  const modelId = "gemini-3-flash-preview";
  
  const prompt = `
    Create a detailed travel itinerary for a trip to ${request.destination}.
    Duration: ${request.duration}.
    Travel Style: ${request.style}.
    ${request.budget ? `Budget Level: ${request.budget}` : ''}
    
    Please provide a structured day-by-day plan.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A brief, exciting summary of the trip vibe."
            },
            estimatedCost: {
              type: Type.STRING,
              description: "Estimated cost range for the trip excluding flights."
            },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  title: { type: Type.STRING, description: "Theme of the day" },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING, description: "e.g., Morning, 10:00 AM" },
                        activity: { type: Type.STRING, description: "Name of the place or activity" },
                        description: { type: Type.STRING, description: "Short details about what to do there" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as AIPlanResponse;

  } catch (error) {
    console.error("Error generating travel plan:", error);
    // Return a fallback or rethrow to be handled by UI
    throw error;
  }
};
