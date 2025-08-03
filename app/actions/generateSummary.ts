'use server';

import { GoogleGenAI, GenerationConfig } from '@google/genai';

interface Feedback {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  feedback: string;
  rating: number;
  projectid: number;
}

/**
 * Summarizes an array of Feedback entries into a pro/con bulleted summary
 * using Google Gemini (via the @google/genai SDK).
 */
export async function AISummary(feedbacks: Feedback[]): Promise<string> {
  if (!feedbacks || feedbacks.length === 0) {
    throw new Error('AISummary: expected at least one feedback item');
  }

  // Build a system + user prompt to guide the summary
  const systemInstruction = `
You are a feedback summarizer. For the following raw user feedback responses,
separate comments into bullets under "👍 Pros" and "👎 Cons". Group similar points.
`;

  const userPrompt = feedbacks.map((item, i) =>
    `Feedback ${i + 1} (${item.rating}/5): ${item.feedback.trim()}`
  ).join('\n\n');

  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
  });

  let response;
  try {
    response = await ai.models.generateContent({
      model: process.env.AI_SUMMARY_MODEL || 'gemini-2.5-flash',
      contents: [
        { role: 'system', parts: [{ text: systemInstruction }] },
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      } as GenerationConfig
    });
  } catch (err) {
    console.error('Gen AI generateContent error:', err);
    throw err;
  }

  const summary = response.text;
  if (!summary || summary.trim().length === 0) {
    throw new Error('AISummary: received empty response from AI');
  }
  return summary.trim();
}
