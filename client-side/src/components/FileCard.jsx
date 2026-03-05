import { useState } from "react";

export function FileCard({ index, file, isDownloading, onDownload, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const truncateCID = (cid) => cid.slice(0, 20) + "...";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(index);
      // Fade out first, then remove
      setIsVisible(false);
    } catch (err) {
      console.error("Delete failed:", err);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="card group cursor-pointer overflow-hidden animate-fadeInUp"
      style={{
        animationDelay: `${index * 100}ms`,
        transition: "opacity 0.4s ease, transform 0.4s ease",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-10px)",
        pointerEvents: isDeleting ? "none" : "auto",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📁</span>
            <div>
              <p className="font-mono text-xs text-[var(--accent-primary)]">
                File #{index + 1}
              </p>
              <p className="text-xs text-[var(--accent-secondary)] mt-1">
                {truncateCID(file.cid)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-[rgba(100,255,218,0.1)] border border-[var(--accent-primary)] rounded text-xs font-mono text-[var(--accent-primary)]">
              Encrypted
            </span>
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              disabled={isDeleting || isDownloading}
              title="Delete entry"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,100,100,0.4)",
                borderRadius: "4px",
                padding: "4px 8px",
                color: "rgba(255,100,100,0.7)",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: "monospace",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = "rgba(255,100,100,0.9)";
                e.target.style.color = "rgba(255,100,100,1)";
                e.target.style.background = "rgba(255,100,100,0.1)";
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = "rgba(255,100,100,0.4)";
                e.target.style.color = "rgba(255,100,100,0.7)";
                e.target.style.background = "transparent";
              }}
            >
              {isDeleting ? "⚙️" : "🗑️"}
            </button>
          </div>
        </div>

        {/* CID Display */}
        <div className="mb-4 p-3 bg-[var(--bg-dark)] rounded border border-[var(--bg-border)] flex-1">
          <p className="font-mono text-xs text-[var(--accent-secondary)] break-all">
            {file.cid}
          </p>
        </div>

        {/* Footer */}
        <button
          onClick={onDownload}
          disabled={isDownloading || isDeleting}
          className="btn-secondary w-full py-2 font-mono text-sm justify-center mt-auto"
        >
          {isDownloading ? (
            <>
              <span className="inline-block animate-spin mr-2">⚙️</span>
              Decrypting...
            </>
          ) : (
            <>
              <span className="mr-2">⬇️</span>
              Download
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default FileCard;