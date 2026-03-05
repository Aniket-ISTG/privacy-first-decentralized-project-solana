import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import RetrievePage from "./pages/RetrievePage";

// Motion Variants
import { pageVariants } from "./lib/motionVariants";

function AppContent() {
  const location = useLocation();

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
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <UploadPage />
                </motion.div>
              }
            />
            <Route
              path="/retrieve"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <RetrievePage />
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
      <AppContent />
    </Router>
  );
}

export default App;