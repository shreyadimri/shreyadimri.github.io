import { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

// ✅ Worker config for Vite/Astro
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

// ✅ Icon URLs (adjust path if your file structure differs)
const backIcon = new URL("../assets/icons/back.png", import.meta.url).href;
const nextIcon = new URL("../assets/icons/next.png", import.meta.url).href;

export default function PdfFlipbook({
  fileUrl,
  width = 600,
  height = 850,
  className = "",
}: PdfFlipbookProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const flipBookRef = useRef<any>(null);

  // Client + mobile detection
  useEffect(() => {
    setIsClient(true);

    const updateIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setCurrentPage(1);
    setError(null);
  }

  function onDocumentLoadError(err: Error) {
    console.error("PDF load error:", err);
    setError(err);
  }

  const handlePrev = () => {
    if (!numPages) return;

    if (isMobile) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    } else {
      const pageFlip = flipBookRef.current?.pageFlip?.();
      pageFlip?.flipPrev?.();
    }
  };

  const handleNext = () => {
    if (!numPages) return;

    if (isMobile) {
      setCurrentPage((prev) => Math.min(numPages, prev + 1));
    } else {
      const pageFlip = flipBookRef.current?.pageFlip?.();
      pageFlip?.flipNext?.();
    }
  };

  const handleFlip = (e: any) => {
    // e.data is zero-based page index
    if (!isMobile && typeof e?.data === "number") {
      setCurrentPage(e.data + 1);
    }
  };

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

  const pageWidth = width;
  const pageHeight = height;

  return (
    <div className={className}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        {numPages && (
          <>
            {/* Top navigation (works on both mobile & desktop) */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.75rem",
              }}
            >
              <button
                onClick={handlePrev}
                disabled={currentPage <= 1}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: currentPage <= 1 ? "default" : "pointer",
                  opacity: currentPage <= 1 ? 0.3 : 1,
                  padding: 0,
                }}
              >
                <img
                  src={backIcon}
                  alt="Previous page"
                  style={{ width: 32, height: "auto", display: "block" }}
                />
              </button>

              <span>
                Page {currentPage} / {numPages}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage >= numPages}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: currentPage >= numPages ? "default" : "pointer",
                  opacity: currentPage >= numPages ? 0.3 : 1,
                  padding: 0,
                }}
              >
                <img
                  src={nextIcon}
                  alt="Next page"
                  style={{ width: 32, height: "auto", display: "block" }}
                />
              </button>
            </div>

            {isMobile ? (
              // 📱 MOBILE: one static page, no flip animation
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="page"
                  style={{
                    width: pageWidth,
                    height: pageHeight,
                    background: "white",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Page
                    pageNumber={currentPage}
                    height={pageHeight} // match container height
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              </div>
            ) : (
              // 🖥 DESKTOP: full flipbook with side arrows
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={handlePrev}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <img
                    src={backIcon}
                    alt="Previous page"
                    style={{ width: 40, height: "auto", display: "block" }}
                  />
                </button>

                <HTMLFlipBook
                  ref={flipBookRef}
                  width={pageWidth}
                  height={pageHeight}
                  size="fixed"
                  usePortrait={true}
                  drawShadow={true}
                  showCover={true}
                  onFlip={handleFlip}
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <div
                      key={i}
                      className="page"
                      style={{
                        width: pageWidth,
                        height: pageHeight,
                        background: "white",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Page
                        pageNumber={i + 1}
                        height={pageHeight} // ensure page bottom matches flip edge
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </div>
                  ))}
                </HTMLFlipBook>

                <button
                  onClick={handleNext}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <img
                    src={nextIcon}
                    alt="Next page"
                    style={{ width: 40, height: "auto", display: "block" }}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </Document>
    </div>
  );
}
