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
    /* 1. Use dynamic viewport height to avoid mobile address bar issues */
    height: "100dvh", 
    width: "100vw",
    
    /* 2. Critical: padding valla height penchakunda box-sizing set cheyali */
    boxSizing: "border-box",
    
    background: "linear-gradient(135deg, #000000 0%, #1a4d2e 100%)",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
    
    /* 3. Prevent any accidental content overflow */
    overflow: "hidden",
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
