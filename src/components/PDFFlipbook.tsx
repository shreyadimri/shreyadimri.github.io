import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

// Worker config for Vite/Astro
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfFlipbookProps {
  fileUrl: string; // e.g. "/magazines/Imprint2018.pdf"
  width?: number;
  height?: number;
  className?: string;
  triggerLabel?: string;
}

const BASE_DESKTOP_BREAKPOINT = 768;
const DESKTOP_GUTTER = 100;
const MIN_DESKTOP_PAGE_WIDTH = 360;
const DIALOG_HORIZONTAL_PADDING = 20;
const DIALOG_VERTICAL_PADDING = 40;

/** Modern circular glass arrow button — smaller + #fffbc7 */
const ModernArrowButton = ({
  disabled,
  onClick,
  direction,
}: {
  disabled?: boolean;
  onClick?: () => void;
  direction: "left" | "right";
}) => {
  const arrow =
    direction === "left" ? (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fffbc7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ) : (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fffbc7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    );

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: "1px solid rgba(255,251,199,0.6)", // #fffbc7
        background: disabled
          ? "rgba(255,251,199,0.15)"
          : "rgba(255,251,199,0.25)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        transition: "0.25s ease",
        boxShadow: disabled
          ? "none"
          : "0 3px 12px rgba(0, 0, 0, 0.25)",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "rgba(255,251,199,0.35)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "rgba(255,251,199,0.25)";
      }}
    >
      {arrow}
    </button>
  );
};

export default function PdfFlipbook({
  fileUrl,
  width = 600,
  height = 850,
  className = "",
  triggerLabel = "Open flipbook",
}: PdfFlipbookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewport, setViewport] = useState(() => ({
    width:
      typeof window !== "undefined"
        ? window.innerWidth
        : width * 2 + DESKTOP_GUTTER,
    height:
      typeof window !== "undefined"
        ? window.innerHeight
        : height + DIALOG_VERTICAL_PADDING,
  }));
  const [containerSize, setContainerSize] = useState<{
    width: number | null;
    height: number | null;
  }>({ width: null, height: null });

  const flipBookRef = useRef<any>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const updateViewport = () => {
    if (typeof window === "undefined") return;
    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // Close modal with Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Reset current page when closing
  useEffect(() => {
    if (!isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen]);

  // Measure the modal's inner content area when open
  useEffect(() => {
    if (!isOpen) return;
    const element = dialogRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setContainerSize({
        width: rect.width,
        height: rect.height,
      });
    };

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(element);
    updateSize();

    return () => resizeObserver.disconnect();
  }, [isOpen]);

  const dialogWidthPx = Math.max(320, viewport.width * 0.9);
  const dialogHeightPx = Math.max(320, viewport.height * 0.9);

  const fallbackAvailableWidth = Math.max(
    0,
    dialogWidthPx - DIALOG_HORIZONTAL_PADDING
  );
  const fallbackAvailableHeight = Math.max(
    0,
    dialogHeightPx - DIALOG_VERTICAL_PADDING
  );

  const measuredAvailableWidth =
    containerSize.width !== null
      ? Math.max(0, containerSize.width - DIALOG_HORIZONTAL_PADDING)
      : null;
  const measuredAvailableHeight =
    containerSize.height !== null
      ? Math.max(0, containerSize.height - DIALOG_VERTICAL_PADDING)
      : null;

  const availableWidth =
    measuredAvailableWidth !== null
      ? measuredAvailableWidth
      : fallbackAvailableWidth;
  const availableHeight =
    measuredAvailableHeight !== null
      ? measuredAvailableHeight
      : fallbackAvailableHeight;

  const desktopThreshold = Math.max(
    BASE_DESKTOP_BREAKPOINT,
    MIN_DESKTOP_PAGE_WIDTH * 2 + DESKTOP_GUTTER
  );
  const isDesktopLayout = availableWidth >= desktopThreshold;

  const aspectRatio = width > 0 ? height / width : 1.5;
  const fitWithinBounds = (
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } => {
    let nextWidth = maxWidth;
    let nextHeight = nextWidth * aspectRatio;

    if (nextHeight > maxHeight && maxHeight > 0) {
      nextHeight = maxHeight;
      nextWidth = nextHeight / aspectRatio;
    }

    return {
      width: Math.max(1, Math.floor(nextWidth)),
      height: Math.max(1, Math.floor(nextHeight)),
    };
  };

  const mobileBounds = fitWithinBounds(
    Math.min(width, availableWidth),
    availableHeight
  );

  const rawPerPageWidth = Math.floor((availableWidth - DESKTOP_GUTTER) / 2);
  const desktopBounds =
    isDesktopLayout && rawPerPageWidth > 0
      ? fitWithinBounds(Math.min(width, rawPerPageWidth), availableHeight)
      : { width: 0, height: 0 };

  const mobilePageWidth = mobileBounds.width;
  const mobilePageHeight = mobileBounds.height;
  const desktopPageWidth = desktopBounds.width;
  const desktopPageHeight = desktopBounds.height;

  // Keep the flipbook canvas in sync with computed dimensions
  useEffect(() => {
    if (!isOpen || !isDesktopLayout) return;
    const api = flipBookRef.current?.pageFlip?.();
    api?.update({
      width: desktopPageWidth,
      height: desktopPageHeight,
    });
  }, [isOpen, isDesktopLayout, desktopPageWidth, desktopPageHeight]);

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
    if (!isDesktopLayout) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
      return;
    }
    const pageFlip = flipBookRef.current?.pageFlip?.();
    pageFlip?.flipPrev?.();
  };

  const handleNext = () => {
    if (!numPages) return;
    if (!isDesktopLayout) {
      setCurrentPage((prev) => Math.min(numPages, prev + 1));
      return;
    }
    const pageFlip = flipBookRef.current?.pageFlip?.();
    pageFlip?.flipNext?.();
  };

  const handleFlip = (e: any) => {
    if (isDesktopLayout && typeof e?.data === "number") {
      setCurrentPage(e.data + 1);
    }
  };

  const closeModal = () => setIsOpen(false);

  const renderPdfContent = () => {
    if (error) {
      return (
        <div style={{ color: "#fff", maxWidth: "80%", textAlign: "center" }}>
          <p>Failed to load PDF.</p>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.8rem" }}>
            {error.message}
          </pre>
          <p>File URL: {fileUrl}</p>
        </div>
      );
    }

    return (
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<div style={{ color: "#fff" }}>Loading flipbook…</div>}
        error={
          <div style={{ color: "#fff" }}>Unable to display this document.</div>
        }
      >
        {numPages && (
          <>
            {/* Top navigation (mobile + desktop) */}
            <div style={styles.nav}>
              <ModernArrowButton
                direction="left"
                disabled={currentPage <= 1}
                onClick={handlePrev}
              />

              <span
                style={{
                  color: "#fffbc7",
                  fontFamily: '"Space Grotesk Variable", system-ui, sans-serif',
                  fontWeight: 300,
                  letterSpacing: "0.01em",
                  fontSize: "0.85rem",
                }}
              >
                Page {currentPage} / {numPages}
              </span>

              <ModernArrowButton
                direction="right"
                disabled={currentPage >= numPages}
                onClick={handleNext}
              />
            </div>

            {/* Mobile: single page, no flip animation */}
            {!isDesktopLayout ? (
              <div style={styles.mobileWrapper}>
                <div
                  className="page"
                  style={{
                    width: mobilePageWidth,
                    height: mobilePageHeight,
                    background: "#fffbc7",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Page
                    pageNumber={currentPage}
                    height={mobilePageHeight}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              </div>
            ) : (
              // Desktop: flipbook with side arrows
              <div style={styles.desktopWrapper}>
                <ModernArrowButton direction="left" onClick={handlePrev} />

                <HTMLFlipBook
                  ref={flipBookRef}
                  width={desktopPageWidth}
                  height={desktopPageHeight}
                  // IProps fields to satisfy TypeScript
                  className=""
                  style={{}}
                  startPage={0}
                  startZIndex={0}
                  minWidth={0}
                  maxWidth={2000}
                  minHeight={0}
                  maxHeight={3000}
                  maxShadowOpacity={0.5}
                  flippingTime={400}
                  usePortrait={false}
                  size="fixed"
                  autoSize={true}
                  showCover={true}
                  mobileScrollSupport={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={15}
                  showPageCorners={true}
                  disableFlipByClick={false}
                  drawShadow={true}
                  renderOnlyPageLengthChange={false}
                  onFlip={handleFlip}
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <div
                      key={i}
                      className="page"
                      style={{
                        width: desktopPageWidth,
                        height: desktopPageHeight,
                        background: "#fff",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Page
                        pageNumber={i + 1}
                        height={desktopPageHeight}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </div>
                  ))}
                </HTMLFlipBook>

                <ModernArrowButton direction="right" onClick={handleNext} />
              </div>
            )}
          </>
        )}
      </Document>
    );
  };

  const dialogStyle = {
    ...styles.dialog,
    width: `${dialogWidthPx}px`,
    height: `${dialogHeightPx}px`,
  };

  return (
    <div className={className}>
      <button
        type="button"
        style={styles.trigger}
        onClick={() => setIsOpen(true)}
      >
        {triggerLabel}
      </button>

      {isOpen && (
        <div style={styles.modal} role="dialog" aria-modal="true">
          <div style={styles.backdrop} onClick={closeModal}></div>
          <div style={dialogStyle} ref={dialogRef}>
            <button
              type="button"
              style={styles.close}
              aria-label="Close flipbook"
              onClick={closeModal}
            >
              ✕
            </button>

            <div style={styles.inner}>{renderPdfContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  trigger: {
    background: "#f1b1b0",
    color: "#000",
    fontSize: "1rem",
    fontWeight: 500,
    height: "48px",
    padding: "0 24px",
    borderRadius: "9999px",
    border: "3px solid #000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  modal: {
    position: "fixed" as const,
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  backdrop: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(0, 0, 0, 0.6)",
  },
  dialog: {
    position: "relative" as const,
    background: "#211925ff",
    borderRadius: "32px",
    padding: "0.75rem",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column" as const,
  },
  close: {
    position: "absolute" as const,
    top: "1rem",
    right: "1rem",
    background: "transparent",
    border: "none",
    color: "#fffbc7",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
  inner: {
    flex: 1,
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "0.75rem",
  },
  mobileWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  desktopWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
  },
};
