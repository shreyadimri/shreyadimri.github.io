import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

// ✅ Official-style worker config for Vite-like bundlers
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfFlipbookProps {
  fileUrl: string; // e.g. "/magazines/Imprint2018.pdf"
  width?: number;
  height?: number;
  className?: string;
}

export default function PdfFlipbook({
  fileUrl,
  className = "",
}: PdfFlipbookProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log("PdfFlipbook fileUrl:", fileUrl);
  }, [fileUrl]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(err: Error) {
    console.error("PDF load error:", err);
    setError(err);
  }

  if (!isClient) {
    return <div className={className}>Loading flipbook…</div>;
  }

  if (error) {
    return (
      <div className={className}>
        <p>Failed to load PDF.</p>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.8rem" }}>
          {error.message}
        </pre>
        <p>File URL: {fileUrl}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        {numPages && (
          <HTMLFlipBook
            width={600}
            height={850}
            usePortrait={true}
            drawShadows={true}
            showCover={true}
           >
          {Array.from({ length: numPages }, (_, i) => (
           <div key={i} className="page">
           <Page
            pageNumber={i + 1}
            width={600}
            height={850}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            />
           </div>
          ))}
          </HTMLFlipBook>
          )}
      </Document>
    </div>
  );
}
