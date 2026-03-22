import HomePage from "../../pages/HomePage";

/**
 * ProtectedRoute Component
 * Protects routes that require an initialized storage account
 * Redirects to HomePage if user doesn't have an account
 */
function ProtectedRoute({ children, hasAccount }) {
  if (!hasAccount) {
    return <HomePage />;
  }
  return children;
}

export default ProtectedRoute;
