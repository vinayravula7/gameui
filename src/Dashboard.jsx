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
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    /* Mobile address bar issues lekunda 100dvh use cheyali */
    height: "100dvh", 
    width: "100vw",
    background: "linear-gradient(135deg, #000000 0%, #1a4d2e 100%)",
    padding: "10px", // Mobile lo space kosam koncham thaggincha
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
    overflow: "hidden", // Motham page scroll avvadu
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "500px",
    /* Card screen height kante peddadi avvakunda chusthundi */
    maxHeight: "95dvh", 
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "center",
  },
  mainCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    /* IMPORTANT: Content ekkuva unte card lopale scroll avthundi, 
       kaani main page scroll bar raadu */
    overflowY: "auto", 
    boxSizing: "border-box",
  },
};

export default Dashboard;
