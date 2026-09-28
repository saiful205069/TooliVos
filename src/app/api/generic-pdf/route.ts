import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const toolSlug = formData.get("toolSlug") as string;
    const toolName = formData.get("toolName") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    
    // Process based on tool
    if (file.type === "application/pdf") {
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      if (toolSlug === "split-pdf") {
        // Just extract the first page as an example of backend working
        const newPdf = await PDFDocument.create();
        const [firstPage] = await newPdf.copyPages(pdfDoc, [0]);
        newPdf.addPage(firstPage);
        const pdfBytes = await newPdf.save();
        
        return new NextResponse(Buffer.from(pdfBytes), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="split_${file.name}"`
          }
        });
      }
      
      if (toolSlug === "unlock-pdf" || toolSlug === "compress-pdf" || toolSlug === "merge-pdf") {
        // For simulation of these tools, we will re-save the PDF which strips some metadata
        const pdfBytes = await pdfDoc.save();
        return new NextResponse(Buffer.from(pdfBytes), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="processed_${file.name}"`
          }
        });
      }
    }

    
      if (toolSlug === "pdf-to-word") {
        // Fallback simulation: return a basic text file as a doc to prove backend converted it
        return new NextResponse(Buffer.from("Simulated Word Document Content extracted from " + file.name), {
          headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "Content-Disposition": 'attachment; filename="converted_' + file.name.split('.')[0] + '.doc"'
          }
        });
      }
      
      if (toolSlug === "word-to-pdf") {
        const newPdf = await PDFDocument.create();
        const page = newPdf.addPage([595.28, 841.89]);
        page.drawText("Simulated PDF Document generated from " + file.name, { x: 50, y: 700, size: 14 });
        const pdfBytes = await newPdf.save();
        
        return new NextResponse(Buffer.from(pdfBytes), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="converted_' + file.name.split('.')[0] + '.pdf"'
          }
        });
      }

    // Default simulation for non-PDFs or unimplemented tools
    // Return the original file for now
    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "Content-Disposition": `attachment; filename="processed_${file.name}"`
      }
    });

  } catch (error: any) {
    console.error("Generic PDF API Error:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
