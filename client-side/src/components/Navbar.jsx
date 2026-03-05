import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "border-b border-[var(--bg-border)]" : ""
      }`}
      style={{
        backgroundColor: isScrolled ? "rgba(10, 25, 47, 0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              className="w-full h-full text-[var(--accent-primary)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 20 7 20 17 12 22 4 17 4 7 12 2" />
            </svg>
          </div>
          <span className="font-mono text-lg font-bold text-[var(--accent-text)] hidden sm:inline">
            PrivacyVault
          </span>
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden sm:flex items-center gap-8 font-mono text-sm">
          <Link
            to="/"
            className={`text-[var(--accent-secondary)] hover:text-[var(--accent-primary)] transition ${
              location.pathname === "/" ? "text-[var(--accent-primary)]" : ""
            }`}
          >
            <span className="text-[var(--accent-primary)]">01.</span> Home
          </Link>
          <Link
            to="/upload"
            className={`text-[var(--accent-secondary)] hover:text-[var(--accent-primary)] transition ${
              location.pathname === "/upload" ? "text-[var(--accent-primary)]" : ""
            }`}
          >
            <span className="text-[var(--accent-primary)]">02.</span> Upload
          </Link>
          <Link
            to="/retrieve"
            className={`text-[var(--accent-secondary)] hover:text-[var(--accent-primary)] transition ${
              location.pathname === "/retrieve" ? "text-[var(--accent-primary)]" : ""
            }`}
          >
            <span className="text-[var(--accent-primary)]">03.</span> Retrieve
          </Link>
          <div className="w-px h-6 bg-[var(--bg-border)]" />
        </div>

        {/* Wallet Button */}
        <div className="wallet-button-wrapper">
          <WalletMultiButton />
          <style>{`
            .wallet-adapter-button {
              border: 1px solid var(--accent-primary) !important;
              color: var(--accent-primary) !important;
              background-color: transparent !important;
              font-family: "SF Mono", "Fira Code", monospace !important;
              font-weight: 500 !important;
              font-size: 0.875rem !important;
              padding: 0.5rem 1rem !important;
              border-radius: 0.25rem !important;
              transition: all 0.3s ease !important;
              white-space: nowrap !important;
            }

            .wallet-adapter-button:hover {
              background-color: rgba(100, 255, 218, 0.1) !important;
              box-shadow: 0 0 30px rgba(100, 255, 218, 0.3) !important;
            }

            .wallet-adapter-button:active {
              transform: scale(0.95) !important;
            }

            .wallet-adapter-modal-trigger {
              border: 1px solid var(--accent-primary) !important;
              color: var(--accent-primary) !important;
              background-color: transparent !important;
              font-family: "SF Mono", "Fira Code", monospace !important;
              font-weight: 500 !important;
              font-size: 0.875rem !important;
              padding: 0.5rem 1rem !important;
              border-radius: 0.25rem !important;
              transition: all 0.3s ease !important;
              white-space: nowrap !important;
            }

            .wallet-adapter-modal-trigger:hover {
              background-color: rgba(100, 255, 218, 0.1) !important;
              box-shadow: 0 0 30px rgba(100, 255, 218, 0.3) !important;
            }

            .wallet-adapter-modal-trigger:active {
              transform: scale(0.95) !important;
            }

            .wallet-adapter-dropdown {
              background-color: var(--bg-surface) !important;
              border: 1px solid var(--bg-border) !important;
              border-radius: 0.5rem !important;
            }

            .wallet-adapter-dropdown-list {
              background-color: var(--bg-surface) !important;
            }

            .wallet-adapter-dropdown-list-item {
              color: var(--accent-text) !important;
              font-family: "Calibre", "Inter", sans-serif !important;
            }

            .wallet-adapter-dropdown-list-item:hover {
              background-color: var(--bg-dark) !important;
              color: var(--accent-primary) !important;
            }
          `}</style>
        </div>
      </div>
    </nav>
  );
}

