import { GoogleGenAI } from "@google/genai";
import { FAQ_DATA } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getChatResponse(userMessage: string, history: { role: string, content: string }[]) {
  const model = "gemini-3-flash-preview";
  
  const context = `
    You are Starebot, a helpful FAQ assistant for InsightFlow. 
    Use the following knowledge base to answer user questions. 
    If the answer is not in the knowledge base, answer politely based on general knowledge but mention that it's not in the official FAQ.
    
    Knowledge Base:
    ${FAQ_DATA.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      { role: 'user', parts: [{ text: context }] },
      ...history.map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      })),
      { role: 'user', parts: [{ text: userMessage }] }
    ],
    config: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
    }
  });

  return response.text || "I'm sorry, I couldn't generate a response.";
}
