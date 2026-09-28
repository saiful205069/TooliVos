import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export async function POST(req: Request) {
  let url = "",
    toolName = "";
  try {
    const body = await req.json();
    url = body.url;
    const toolSlug = body.toolSlug;
    toolName = body.toolName;

    if (!url) {
      return NextResponse.json(
        { error: "URL or Domain is required" },
        { status: 400 },
      );
    }

    let systemInstruction = `You are an expert SEO analyzer acting as a "${toolName}". 
Your task is to analyze the provided URL/Domain and return a detailed SEO report.
Since you are an AI, simulate realistic and plausible data for this domain based on its likely industry profile if you cannot fetch real-time analytics. Provide structured, clean text. Do NOT use markdown code blocks, but you can use simple formatting.`;

    if (toolSlug === "backlink-checker") {
      systemInstruction =
        "You are a Backlink Checker. Simulate a realistic backlink profile for the provided domain. Include total backlinks, referring domains, top anchor texts, and overall domain rating.";
    } else if (toolSlug === "domain-authority-checker") {
      systemInstruction =
        "You are a Domain Authority Checker. Estimate the Domain Authority (DA), Page Authority (PA), and Spam Score for the provided URL. Give a brief explanation of why it might have that score.";
    } else if (toolSlug === "keyword-position-tracker") {
      systemInstruction =
        "You are a Keyword Position Tracker. Generate a plausible list of top 5 ranking keywords for the provided domain along with their estimated search volume and current position (e.g. Rank 1, 3, etc).";
    } else if (toolSlug === "xml-sitemap-generator") {
      systemInstruction =
        "You are an XML Sitemap Generator. Generate a valid sample XML sitemap containing at least 5 standard URLs that would typically exist on the provided domain (e.g., /, /about, /contact).";
    } else if (toolSlug === "page-speed-test") {
      systemInstruction =
        "You are a Page Speed Test tool. Simulate a Lighthouse-style performance report for the URL. Include scores for Performance, Accessibility, Best Practices, and SEO out of 100. Mention First Contentful Paint (FCP) and Time to Interactive (TTI).";
    } else if (toolSlug === "meta-tag-generator") {
      systemInstruction =
        "You are a Meta Tag Generator. Generate optimized HTML meta tags (title, description, keywords, Open Graph, Twitter Cards) suitable for the homepage of the provided domain.";
    } else if (toolSlug === "robots.txt-generator") {
      systemInstruction =
        "You are a Robots.txt Generator. Generate a standard, secure robots.txt file for the provided domain that allows Googlebot but disallows sensitive directories like /admin, /login, and /wp-admin.";
    } else if (toolSlug === "mobile-friendly-test") {
      systemInstruction =
        "You are a Mobile Friendly Test tool. Evaluate the provided URL and output a report stating whether the page is mobile-friendly. List 3 key mobile optimization checks (e.g., Viewport configured, Tap targets appropriately sized).";
    } else if (toolSlug === "domain-age-checker") {
      systemInstruction =
        "You are a Domain Age Checker. Provide an estimated domain age, creation date, and expiration date for the provided domain. Make it look like a WHOIS lookup result.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Perform ${toolName} on this URL: ${url}`,
      config: {
        systemInstruction,
        temperature: 0.5, // lower temperature for more consistent structural output
      },
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error("Generic SEO API Error:", error);

    if (
      error.message?.includes("API key not valid") ||
      error.message?.includes("429")
    ) {
      return NextResponse.json({
        result: `[DEMO MODE - GEMINI API ERROR: ${error.message}]\n\nAs a fallback, here is a simulated response for "${toolName}".\n\nAnalyzed URL: ${url}\nStatus: Simulated Success.`,
      });
    }

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
