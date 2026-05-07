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
const dashStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Center align chesthe laptop lo baguntundi
    height: "100dvh",      // Kachithanga screen height ke set avthundi
    width: "100vw",
    background: "linear-gradient(180deg, #050505 0%, #1a4d2e 100%)",
    padding: "10px", 
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
    overflow: "hidden",   // Main screen scroll avvadu
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "380px",    // Laptop lo maree wide ga avvakunda control chesthundhi
    height: "auto",
    maxHeight: "95dvh",   // Screen height lo 95% kante ekkuva velladu
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: "22px",      // Size koncham thaggincha spacing kosam
    fontWeight: "900",
    textAlign: "center",
    margin: "5px 0",
    letterSpacing: "-0.5px",
  },
  mainCard: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    overflowY: "auto",     // Oka vela mobile screen chinnadi ithe card lopale scroll avthundi
    width: "100%",
    scrollbarWidth: "none", // Firefox lo scrollbar hide chesthundhi
    msOverflowStyle: "none", // IE lo hide
  },
  footerAction: { marginTop: "5px", width: "100%" },
  logoutBtn: {
    width: "100%",
    backgroundColor: "#1DB954",
    color: "#ffffff",
    padding: "12px",       // Padding koncham thaggincha fit avvadaniki
    borderRadius: "50px",
    border: "none",
    fontSize: "13px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  devFooter: {
    marginTop: "10px",
    fontSize: "10px",
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
  },
};

export default Dashboard;
