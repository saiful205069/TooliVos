import React from "react";

interface ToolInfoProps {
  slug: string;
  toolName: string;
}

export default function ToolInfo({ slug, toolName }: ToolInfoProps) {
  let description = "";
  let steps: string[] = [];

  switch (slug) {
    case "free-grammar-checker":
    case "spell-checker":
      description = "Ensure your writing is flawless with our advanced grammar and spelling checker. It analyzes your text for contextual errors, punctuation mistakes, and typos, helping you communicate with confidence and professionalism.";
      steps = ["Paste or type your text into the input box.", "Click the analyze button.", "Review the highlighted errors.", "Apply the suggested corrections to improve your text."];
      break;
    case "article-rewriter":
    case "word-combiner":
    case "text-summarizer":
      description = "Enhance your content creation workflow. This tool intelligently processes your input to rewrite, summarize, or combine text while maintaining the core message and improving readability.";
      steps = ["Enter your original text into the tool.", "Select any specific formatting or tone options if available.", "Generate the new text.", "Copy the result for your use."];
      break;
    case "keyword-position-tracker":
    case "domain-authority-checker":
    case "backlink-checker":
      description = "Get critical SEO insights to dominate search engine rankings. Analyze your domain authority, track keyword positions, and monitor your backlink profile to stay ahead of the competition.";
      steps = ["Enter your domain URL or specific keyword.", "Click the analyze button.", "Wait for the crawler to fetch the data.", "Review the comprehensive metrics and charts."];
      break;
    case "xml-sitemap-generator":
    case "robots-txt-generator":
    case "meta-tag-generator":
      description = "Generate essential technical SEO files instantly. Ensure search engines can properly crawl, index, and understand your website's architecture and content.";
      steps = ["Enter your website URL or fill in the required fields.", "Generate the file or tags.", "Review the generated code.", "Copy or download the file and upload it to your website's root directory."];
      break;
    case "word-to-pdf":
    case "excel-to-pdf":
    case "pdf-to-jpg":
      description = "Convert your documents with pixel-perfect accuracy. This tool ensures that all formatting, fonts, and layouts are preserved during the conversion process.";
      steps = ["Upload your file by dragging and dropping it into the designated area.", "Wait for the secure conversion process to complete.", "Preview the converted file if applicable.", "Download your new file."];
      break;
    case "merge-pdf":
    case "split-pdf":
    case "compress-pdf":
    case "compress-pdf-to-100kb":
    case "unlock-pdf":
      description = "Manage and optimize your PDF files effortlessly. Merge multiple documents, split large files, compress for web sharing, or remove password protection securely.";
      steps = ["Upload one or more PDF files.", "Arrange the order or specify the pages if needed.", "Click the process button.", "Download the modified PDF document."];
      break;
    case "image-compressor":
    case "compress-image-to-50kb":
      description = "Reduce image file sizes without sacrificing quality. Perfect for optimizing website load times, saving storage space, or meeting strict upload size limits.";
      steps = ["Upload your image(s) (JPG, PNG, WebP).", "Select the desired compression level or target file size.", "Wait for the optimization process.", "Download the compressed images."];
      break;
    case "video-to-gif-converter":
    case "svg-converter":
    case "favicon-generator":
    case "logo-maker":
    case "resume-builder":
      description = "Create, convert, and enhance your digital assets. Whether you're making a GIF, designing a logo, or building a resume, our intuitive tool makes it easy.";
      steps = ["Upload your source file or start with a blank template.", "Customize the settings, dimensions, or design elements.", "Preview your creation.", "Export and download the final asset."];
      break;
    case "json-viewer":
      description = "Format, validate, and beautify your JSON data. This tool makes complex data structures easy to read, debug, and analyze for developers and data analysts.";
      steps = ["Paste your raw JSON code into the editor.", "Click format or validate.", "View the structured, color-coded output.", "Copy the beautified JSON for your project."];
      break;
    default:
      description = `Welcome to the ${toolName}. This utility is designed to provide fast, secure, and accurate results for your digital tasks. It runs efficiently in your browser, ensuring your data remains private and processes instantly.`;
      steps = [
        `Input your data or upload a file into the ${toolName}.`,
        "Click the main action button to start processing.",
        "Review the generated output or metrics.",
        "Copy the results or download your optimized files."
      ];
      break;
  }

  return (
    <section className="max-w-[1240px] mx-auto py-space-xl w-full">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-4">About {toolName}</h2>
        <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
          {description}
        </p>
        
        <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">How to Use This Tool</h3>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
