import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (typeof text !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, "").length;

    // Simple sentence counting based on punctuation
    const sentences =
      text.trim() === "" ? 0 : (text.match(/[^.!?]+[.!?]+/g) || []).length || 1;

    const paragraphs = text.trim() === "" ? 0 : text.trim().split(/\n+/).length;
    const readingTime = Math.ceil(words / 200); // average reading speed 200 wpm

    return NextResponse.json({
      words,
      characters,
      charactersWithoutSpaces,
      sentences,
      paragraphs,
      readingTime,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error processing text" },
      { status: 500 },
    );
  }
}
