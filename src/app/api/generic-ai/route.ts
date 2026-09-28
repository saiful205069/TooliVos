import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export async function POST(req: Request) {
  let text = "",
    toolName = "";
  try {
    const body = await req.json();
    text = body.text || "Extract text or describe this file."; // default text if only file is sent
    const toolSlug = body.toolSlug;
    toolName = body.toolName;
    const fileBase64 = body.fileBase64;
    const fileMimeType = body.fileMimeType;

    let systemInstruction = `You are an expert AI assistant acting as a "${toolName}". 
Your task is to process the user's input according to the standard expectations for a ${toolName}.
Provide ONLY the final processed result. Do not add any introductory or concluding remarks, explanations, or markdown formatting unless specifically requested.`;

    const isSeoTool = [
      "seo-score-checker", "backlink-checker", "domain-authority-checker",
      "keyword-position-tracker", "page-speed-test", "domain-age-checker"
    ].includes(toolSlug);

    if (isSeoTool) {
      systemInstruction = `You are an expert SEO Analysis tool acting as "${toolName}".
The user has provided a URL or domain: ${text}
You must return a REALISTIC simulated analysis for this domain in STRICT JSON format (no markdown code blocks, just raw JSON).
The JSON must follow this exact schema:
{
  "score": 85, // A number between 0-100 representing overall health/score
  "metrics": [
    { "label": "Metric Name", "value": "Metric Value", "status": "good|warning|error|neutral" }
  ],
  "tableData": [ // Optional: list of detailed items (like backlinks, keywords, etc)
    { "col1": "Value", "col2": "Value", "col3": "Value" }
  ],
  "summary": "A short paragraph summarizing the analysis."
}
Make the simulated data look highly realistic and professional based on the domain name.`;
    } else if (toolSlug === "plagiarism-checker") {
      systemInstruction =
        "You are a Plagiarism Checker. Analyze the text and return a detailed report of potential plagiarism, including percentage estimates and suspected sources.";
    } else if (
      toolSlug === "grammar-checker" ||
      toolSlug === "free-grammar-checker"
    ) {
      systemInstruction =
        "You are a Grammar Checker. Identify grammatical errors, spelling mistakes, and punctuation issues in the text. Return the fully corrected text.";
    } else if (toolSlug === "ai-humanizer") {
      systemInstruction =
        "You are an AI Humanizer. Rewrite the provided AI-generated text to make it sound completely natural, conversational, and human-written.";
    } else if (toolSlug === "text-summarizer") {
      systemInstruction =
        "You are a Text Summarizer. Provide a concise, clear, and accurate summary of the provided text. Highlight the main points.";
    } else if (toolSlug === "citation-generator") {
      systemInstruction =
        "You are a Citation Generator. Format the provided text into APA, MLA, and Chicago citation formats.";
    } else if (
      toolSlug === "image-to-text-converter" ||
      toolSlug === "ocr" ||
      toolSlug === "jpg-to-word"
    ) {
      systemInstruction =
        "You are an OCR system. Extract ALL text visible in the provided image accurately. Preserve formatting where possible. If there is no text, reply 'No text found in this image.'";
    } else if (toolSlug === "speech-to-text") {
      systemInstruction =
        "You are a Speech to Text transcription service. Transcribe the spoken audio provided into text accurately. Include punctuation.";
    }

    // Build contents array
    let contents: any[] = [];
    if (fileBase64 && fileMimeType) {
      contents.push({
        inlineData: {
          data: fileBase64,
          mimeType: fileMimeType,
        },
      });
      // If it's OCR or Speech to text, we must explicitly ask it to extract text
      contents.push(text);
    } else {
      contents = [text];
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.1, // very low for OCR to prevent hallucinations
      },
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error("Generic AI API Error:", error);

    if (
      error.message?.includes("API key not valid") ||
      error.message?.includes("429")
    ) {
      return NextResponse.json({
        result: `[DEMO MODE - GEMINI API ERROR: ${error.message}]\n\nAs a fallback, here is a simulated response for "${toolName}".\n\nProcessed: ${text.substring(0, 50)}...`,
      });
    }

    return NextResponse.json(
      { error: "Failed to process text" },
      { status: 500 },
    );
  }
}
