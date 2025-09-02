/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// API key from env
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("API key is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 10000,
  responseMimeType: "application/json",
};

/**
 * Helper: clean code fences if model returns ```json ... ```
 */
function trimCodeBlock(text: string): string {
  return text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
}

/**
 * Helper: tries up to `maxAttempts` to get valid JSON from the model
 */
async function getValidJSONText(
  prompt: string,
  maxAttempts = 3
): Promise<string> {
  let lastText: string | undefined;
  const chatSession = model.startChat({ generationConfig, history: [] });

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const result = await chatSession.sendMessage(prompt);
    const raw = (await result?.response.text()) ?? "";
    const text = trimCodeBlock(raw);
    lastText = text;

    try {
      JSON.parse(text);
      return text;
    } catch {
      if (attempt < maxAttempts) continue;
      throw new Error(
        `Failed to parse JSON response after ${maxAttempts} attempts. Last response: ${lastText}`
      );
    }
  }
  throw new Error("Unexpected error in getValidJSONText");
}

/**
 * Generate course tutorial
 */
async function run({
  category,
  topic,
  level,
  duration,
  noOfChapters,
  description,
  referencedVideo,
}: {
  category: string;
  topic: string;
  level: string;
  duration: number;
  noOfChapters: number;
  description: string;
  referencedVideo: string;
}) {
  const prompt = `
Generate a course tutorial in JSON format with the following fields:
- Course_Name
- Description
- Level
- Category
- Duration (in minutes or hours)
- Chapters (array)

Requirements:
1. Use these input variables: 
   Category: '${category}', 
   Topic: '${topic}', 
   Level: '${level}', 
   Duration: '${duration}', 
   Chapters: '${noOfChapters}'.
2. The number of chapters must equal '${noOfChapters}'.
3. Each chapter should include: 
   - Chapter_Name 
   - About (short description, max 15 words) 
   - Duration (in minutes or hours).
4. Ensure all fields are properly filled and consistent with the topic.

Return a valid JSON response strictly in this format:
\`\`\`json
{
  "Course_Name": "...",
  "Description": "...",
  "Level": "...",
  "Category": "...",
  "Duration": "...",
  "Chapters": [
    {
      "name": "...",
      "about": "...",
      "duration": "..."
    }
  ]
}
\`\`\`
  `;

  return getValidJSONText(prompt, 3);
}

/**
 * Generate detailed chapter content
 */
export async function generateChaptersContent(
  chapterName: string,
  description: string,
  duration: number,
  courseName: string
) {
  const prompt = `
Generate detailed content for the chapter "${chapterName}" of the course "${courseName}".
Description: ${description}
Duration: ${duration}

The chapter should consist of an array of topics. Each topic must include:
- id
- title
- explanation (answering "what it is?" with clear explanation for students)

Return valid JSON in this format:
\`\`\`json
{
  "Chapter_Name": "",
  "Duration": "",
  "about": "",
  "topics": [
    {
      "id": 1,
      "title": "",
      "explanation": ""
    }
  ]
}
\`\`\`
  `;

  return getValidJSONText(prompt, 3);
}

export default run;
