import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import RetrievePage from "./pages/RetrievePage";
import DeleteAccountPage from "./pages/DeleteAccountPage";

// Context
import { AccountProvider } from "./context/AccountContext";
import { useAccount } from "./context/AccountContext";

// Hooks
import { useAccountCheck } from "./hooks";

// Motion Variants
import { pageVariants } from "./lib/motionVariants";

function AppContent() {
  const location = useLocation();
  const wallet = useWallet();
  const { hasAccount, setHasAccount } = useAccount();

  // Check if PDA exists whenever wallet connects
  useAccountCheck(setHasAccount);

  return (
    <div style={{ backgroundColor: "var(--bg-dark)" }} className="min-h-screen text-[var(--accent-text)]">
      {/* Background texture */}
      <div className="grain-texture" />

      {/* Navigation - Always visible */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute hasAccount={hasAccount}>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <UploadPage />
                  </motion.div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/retrieve"
              element={
                <ProtectedRoute hasAccount={hasAccount}>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <RetrievePage />
                  </motion.div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/delete-account"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <DeleteAccountPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AccountProvider>
        <AppContent />
      </AccountProvider>
    </Router>
  );
}

export default App;