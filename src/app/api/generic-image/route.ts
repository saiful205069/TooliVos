import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const toolSlug = formData.get("toolSlug") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let outputBuffer = buffer;
    let contentType = file.type || "image/jpeg";
    let filename = `processed_${file.name}`;

    try {
      if (toolSlug === "image-compressor") {
        outputBuffer = await sharp(buffer)
          .jpeg({ quality: 60 })
          .toBuffer();
        contentType = "image/jpeg";
        filename = `compressed_${file.name.split('.')[0]}.jpg`;
      } 
      else if (toolSlug === "compress-image-to-50kb") {
        outputBuffer = await sharp(buffer)
          .jpeg({ quality: 20 }) // aggressive compression
          .toBuffer();
        contentType = "image/jpeg";
        filename = `50kb_${file.name.split('.')[0]}.jpg`;
      }
      else if (toolSlug === "favicon-generator") {
        outputBuffer = await sharp(buffer)
          .resize(32, 32)
          .png()
          .toBuffer();
        contentType = "image/png";
        filename = `favicon.png`;
      }
      else if (toolSlug === "svg-converter") {
        // Sharp converts images TO webp/png/jpg. Vectorizing requires a different tool.
        // We will convert it to a high quality PNG as a fallback.
        outputBuffer = await sharp(buffer)
          .png({ quality: 100 })
          .toBuffer();
        contentType = "image/png";
        filename = `converted_${file.name.split('.')[0]}.png`;
      }
    } catch (e) {
      console.warn("Sharp processing failed, falling back to original buffer", e);
      // Fall back to original buffer if sharp fails (e.g. invalid image format)
    }

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`
      }
    });

  } catch (error: any) {
    console.error("Generic Image API Error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
