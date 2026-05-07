import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthForm from "./AuthForm";
import Dashboard from "./Dashboard.jsx";

function App() {
  // Use state to track authentication so React re-renders on change
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token") !== null);

  // Function to be called by AuthForm upon successful login
  const handleLoginSuccess = () => {
    setIsAuth(true);
  };

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(localStorage.getItem("token") !== null);
    };

    // Listen for storage events (helpful if logout happens in another tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthForm onLogin={handleLoginSuccess} />
            )
          }
        />

        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/" replace />}
        />

        {/* Fallback for any undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
