/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI, } from "@google/generative-ai";

// api key from env
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
if (!apiKey) {
    throw new Error("API key is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function run({ category, topic, level, duration, noOfChapters, description, referencedVideo }: {
    category: string,
    topic: string,
    level: string,
    duration: number,
    noOfChapters: number,
    description: string,
    referencedVideo: string
}) {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
        ],
    });

    const result = await chatSession.sendMessage(`Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: '${category}', Topic: ${topic}, Level:${level}, Duration: ${duration}, NoOf Chapters: ${noOfChapters} , Description:${description} ,Or ${referencedVideo} Include a referenced Youtube video link with each chapter  Iin JSON format\n`);

    return result?.response.text();
}

export default run;