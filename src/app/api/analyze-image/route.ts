import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || "dummy";
    const ai = new GoogleGenAI({ apiKey });

    // Clean base64 string if it contains the data url prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `You are a helpful AI assistant. Analyze this image. Describe what you see in detail, identify any text, objects, landmarks, or notable features. This is for a reverse image search tool, so help the user understand the context of the image.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          prompt,
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType || "image/jpeg",
            },
          },
        ],
      });
      return NextResponse.json({ analysis: response.text }, { status: 200 });
    } catch (e: any) {
      // Provide a fallback if API key is invalid or quota exceeded
      return NextResponse.json(
        {
          analysis:
            `[SIMULATED REVERSE SEARCH RESULT]\n\nBased on the visual patterns, this image appears to be related to common internet stock photography or a similar known entity.\n\nExact Matches found on:\n- example.com/image1\n- pinterest.com/pin/123\n\n(Note: This is a fallback response because the Gemini API key was invalid or missing: ${e.message})`,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
