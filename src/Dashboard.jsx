import React from "react";
import GuessGame from "./GuessGame";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={dashStyles.container}>
      <div style={dashStyles.contentWrapper}>
        <h2 style={dashStyles.headerTitle}>Mind vs Number</h2>

        <main style={dashStyles.mainCard}>
          <GuessGame />
        </main>

        <div style={dashStyles.footerAction}>
          <button onClick={handleLogout} style={dashStyles.logoutBtn}>
            <LogOut size={18} /> LOG OUT
          </button>
        </div>

        <div style={dashStyles.devFooter}>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
          <p>
            Developed by{" "}
            <span style={{ fontWeight: "700", color: "#1DB954" }}>
              Vinay Ravula
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const dashStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100dvh",
    width: "100vw",
    background: "linear-gradient(180deg, #050505 0%, #1a4d2e 100%)",
    padding: "10px",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "380px",
    height: "auto",
    maxHeight: "98dvh",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "900",
    textAlign: "center",
    margin: "5px 0",
    letterSpacing: "-0.5px",
  },
  mainCard: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    overflowY: "auto",
    width: "100%",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  footerAction: { 
    width: "100%",
    marginTop: "2px"
  },
  logoutBtn: {
    width: "100%",
    backgroundColor: "#1DB954",
    color: "#ffffff",
    padding: "12px",
    borderRadius: "50px",
    border: "none",
    fontSize: "13px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
  },
  devFooter: {
    marginTop: "5px",
    fontSize: "10px",
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    lineHeight: "1.2",
  },
};

export default Dashboard;
