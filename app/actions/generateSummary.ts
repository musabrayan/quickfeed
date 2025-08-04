'use server';

import { GoogleGenAI } from "@google/genai";

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
 * Summarizes an array of Feedback into grouped "👍 Pros" and "👎 Cons"
 * while using proper systemInstruction placement for Gemini prompts.
 */
export async function AISummary(feedbacks: Feedback[]): Promise<string> {
  if (feedbacks.length === 0) {
    throw new Error("AISummary: at least one feedback item is required");
  }

  // Compose aggregated user prompt containing all feedback
  const userPrompt = feedbacks
    .map(
      (f, i) =>
        `Feedback ${i + 1} (${f.rating}/5): ${f.feedback
          .trim()
          .replace(/\s+/g, " ")}`
    )
    .join("\n\n");

  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  // Combine system instruction with user prompt since this SDK version doesn't support systemInstruction
  const fullPrompt = `You are an expert feedback analyst. Create a comprehensive, well-structured summary using proper markdown formatting.

**Instructions:**
- Use clear headings and subheadings
- Group similar feedback points together
- Include specific examples when relevant
- Maintain professional tone
- Use bullet points for easy readability

**Required Format:**

# 📊 Feedback Analysis Report

## 👍 **Positive Highlights**
- **[Category]:** [Detailed positive feedback points]
- **[Category]:** [Specific user praise and what they liked]
- **[Category]:** [Strengths and advantages mentioned]

## 👎 **Areas for Improvement** 
- **[Category]:** [Specific issues and pain points]
- **[Category]:** [User complaints and suggestions]
- **[Category]:** [Problems that need attention]

## 📈 **Key Insights & Recommendations**
- **Overall Rating Trend:** [Analysis of rating patterns]
- **Most Common Themes:** [Frequently mentioned topics]
- **Priority Actions:** [Actionable next steps]
- **User Sentiment:** [General mood and satisfaction level]

---

**Feedback Data to Analyze:**

${userPrompt}`;

  const result = await ai.models.generateContent({
    model: process.env.AI_SUMMARY_MODEL || "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: fullPrompt }],
      },
    ],
    config: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });

  const output = result.text?.trim();
  if (!output) {
    throw new Error("AISummary: model returned no text");
  }

  return output;
}
