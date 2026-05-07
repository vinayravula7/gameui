import React from "react";
import GuessGame from "./GuessGame";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Main Card containing the game */}
        <main style={styles.mainCard}>
          <GuessGame />
        </main>
      </div>
    </div>
  );
};

const styles = {
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100dvh", // Mobile address bar fix
    width: "100vw",
    background: "linear-gradient(135deg, #000000 0%, #1a4d2e 100%)",
    padding: "10px", // Screen edges ki touch avvakunda
    boxSizing: "border-box",
    overflow: "hidden", 
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "420px", // Card width koncham thaggincha (better look)
    height: "auto",
    maxHeight: "90dvh", // Screen height lo 90% mathrame teeskuntundi
    display: "flex",
    flexDirection: "column",
  },
  mainCard: {
    backgroundColor: "#ffffff",
    borderRadius: "24px", // Rounded corners inka baguntayi
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    padding: "15px 20px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto", // Card lopala content ekkuvaithe akkade scroll avthundi
    gap: "10px",
    /* Scrollbar ni hide cheyadaniki (Optional) */
    msOverflowStyle: "none", 
    scrollbarWidth: "none", 
  },
};

export default Dashboard;
