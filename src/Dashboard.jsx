import React from "react";
import GuessGame from "./GuessGame";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Main Card containing the game and its internal footer/logout */}
        <main style={styles.mainCard}>
          <GuessGame />
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #000000 0%, #1a4d2e 100%)",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "center",
  },
  mainCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    padding: "20px",
  },
};

export default Dashboard;
