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
    padding: "20px", // Laptop lo margins baguntayi
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "450px", // Laptop lo card width ni koncham pencha
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    height: "auto",
    maxHeight: "95dvh",
  },
  headerTitle: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "900",
    textAlign: "center",
    margin: "0 0 5px 0",
    letterSpacing: "-0.5px",
  },
  mainCard: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
    overflowY: "auto",
    width: "100%",
    // Scrollbar ni hide chesthundhi cleanliness kosam
    scrollbarWidth: "none", 
    msOverflowStyle: "none",
  },
  footerAction: { 
    width: "100%",
    marginTop: "5px"
  },
  logoutBtn: {
    width: "100%",
    backgroundColor: "#1DB954",
    color: "#ffffff",
    padding: "14px",
    borderRadius: "50px",
    border: "none",
    fontSize: "14px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  devFooter: {
    marginTop: "10px",
    fontSize: "11px",
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
  },
};

export default Dashboard;
