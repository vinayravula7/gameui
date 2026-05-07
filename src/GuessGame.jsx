import React, { useState } from "react";
import axios from "axios";
import {
  Target,
  User,
  Trophy,
  Hash,
  BarChart3,
  RotateCcw,
  CheckCircle2,
  LogOut,
} from "lucide-react";

// --- GUESS GAME COMPONENT ---
const GuessGame = () => {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Can you guess it?");
  const [lastGuess, setLastGuess] = useState("-");
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const API_BASE_URL = "https://game-3fvh.onrender.com/api/game";

  const handleGuess = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${API_BASE_URL}/guess?guess=${guess}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseText = res.data;
      setMessage(responseText);
      setLastGuess(guess);
      setAttempts((prev) => prev + 1);
      setIsCorrect(responseText.toLowerCase().includes("correct"));
    } catch (err) {
      setMessage("Session expired or error connecting.");
    } finally {
      setLoading(false);
    }
  };

  const resetGame = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_BASE_URL}/reset`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setMessage("Can you guess it?");
      setGuess("");
      setLastGuess("-");
      setAttempts(0);
      setIsCorrect(false);
    } catch (err) {
      setMessage("Failed to restart. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={gameStyles.card}>
      <div style={gameStyles.header}>
        <div style={gameStyles.iconCircle}>
          <Target size={30} color="#1DB954" />
        </div>
        <h1 style={gameStyles.title}>MIND VS NUMBER</h1>
        <p style={gameStyles.subtitle}>Pick a number between 1 to 100</p>
      </div>

      <div style={gameStyles.infoBox}>
        <span style={{ fontSize: "20px" }}>🎲</span>
        <div style={{ textAlign: "left" }}>
          <p style={gameStyles.infoPara}>System has picked a secret number.</p>
          <strong style={{ color: "#1DB954", fontSize: "13px" }}>
            {isCorrect ? "Success!" : "Your turn to guess"}
          </strong>
        </div>
      </div>

      <div style={gameStyles.section}>
        <div style={gameStyles.labelRow}>
          <User size={16} color="#1DB954" />
          <span style={gameStyles.labelText}>Enter Your Guess</span>
        </div>
        <form onSubmit={handleGuess} style={gameStyles.inputRow}>
          <input
            type="number"
            style={gameStyles.input}
            placeholder="1-100"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={isCorrect || loading}
            required
          />
          <button
            type="submit"
            style={
              isCorrect || loading
                ? gameStyles.guessBtnDisabled
                : gameStyles.guessBtn
            }
            disabled={loading || isCorrect}
          >
            {loading ? "..." : "GUESS"}
          </button>
        </form>
      </div>

      <div style={gameStyles.section}>
        <div style={gameStyles.labelRow}>
          <Trophy size={16} color="#1DB954" />
          <span style={gameStyles.labelText}>Result</span>
        </div>
        <div
          style={{
            ...gameStyles.resultBox,
            backgroundColor: isCorrect ? "#f0fff4" : "#fcfcfc",
            borderColor: isCorrect ? "#1DB954" : "#eee",
          }}
        >
          {isCorrect ? (
            <CheckCircle2 color="#1DB954" size={28} />
          ) : (
            <Target color="#bdc3c7" size={28} />
          )}
          <div style={{ textAlign: "left" }}>
            <h3 style={gameStyles.resultHead}>
              {isCorrect ? "Brilliant!" : "Feedback"}
            </h3>
            <p
              style={{
                ...gameStyles.resultPara,
                color: isCorrect
                  ? "#1DB954"
                  : message === "Can you guess it?"
                    ? "#636e72"
                    : "#e74c3c",
                fontWeight: message === "Can you guess it?" ? "400" : "700",
              }}
            >
              {isCorrect ? `Correct! The number was ${guess}.` : message}
            </p>
          </div>
        </div>
      </div>

      <div style={gameStyles.statsBar}>
        <div style={gameStyles.statItem}>
          <Hash size={18} color="#1DB954" />
          <div style={gameStyles.statCol}>
            <span style={gameStyles.statLabel}>Last Guess</span>
            <span style={gameStyles.statValue}>{lastGuess}</span>
          </div>
        </div>
        <div style={gameStyles.statItem}>
          <BarChart3 size={18} color="#1DB954" />
          <div style={gameStyles.statCol}>
            <span style={gameStyles.statLabel}>Attempts</span>
            <span style={gameStyles.statValue}>{attempts}</span>
          </div>
        </div>
      </div>

      {isCorrect && (
        <button onClick={resetGame} style={gameStyles.playAgain}>
          <RotateCcw size={18} /> PLAY AGAIN
        </button>
      )}
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
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

// --- STYLES ---
const gameStyles = {
  card: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  header: { textAlign: "center" },
  iconCircle: {
    background: "#f0fdf4",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 8px",
  },
  title: {
    fontSize: "18px",
    color: "#121212",
    margin: 0,
    fontWeight: "900",
    letterSpacing: "0.5px",
  },
  subtitle: { fontSize: "12px", color: "#6a6a6a", margin: "4px 0" },
  infoBox: {
    background: "#f8f8f8",
    padding: "10px",
    borderRadius: "12px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    border: "1px solid #eee",
  },
  infoPara: { margin: 0, fontSize: "12px", color: "#6a6a6a" },
  section: { display: "flex", flexDirection: "column", gap: "8px" },
  labelRow: { display: "flex", alignItems: "center", gap: "6px" },
  labelText: { fontWeight: "700", color: "#121212", fontSize: "13px" },
  inputRow: { display: "flex", flexDirection: "column", gap: "10px" },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d9d9d9",
    backgroundColor: "#fcfcfc",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none",
  },
  guessBtn: {
    width: "100%",
    backgroundColor: "#121212",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  guessBtnDisabled: {
    width: "100%",
    backgroundColor: "#ccc",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: "bold",
  },
  resultBox: {
    padding: "12px",
    borderRadius: "12px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    border: "1px solid #eee",
  },
  resultHead: {
    margin: 0,
    fontSize: "14px",
    color: "#121212",
    fontWeight: "700",
  },
  resultPara: { margin: "2px 0 0", fontSize: "13px" },
  statsBar: {
    display: "flex",
    justifyContent: "space-around",
    background: "#f9f9f9",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #eee",
  },
  statItem: { display: "flex", alignItems: "center", gap: "8px" },
  statCol: { display: "flex", flexDirection: "column" },
  statLabel: {
    fontSize: "9px",
    color: "#999",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  statValue: { fontSize: "16px", fontWeight: "800", color: "#121212" },
  playAgain: {
    backgroundColor: "#1DB954",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "30px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "5px",
  },
};

const dashStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #050505 0%, #1a4d2e 100%)",
    padding: "20px 15px",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  headerTitle: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "900",
    textAlign: "center",
    margin: "15px 0",
    letterSpacing: "-0.5px",
  },
  mainCard: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    overflow: "hidden",
    width: "100%",
  },
  footerAction: { marginTop: "5px", width: "100%" },
  logoutBtn: {
    width: "100%",
    backgroundColor: "#1DB954",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "50px",
    border: "none",
    fontSize: "14px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 10px 20px rgba(29, 185, 84, 0.2)",
  },
  devFooter: {
    marginTop: "20px",
    fontSize: "11px",
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    lineHeight: "1.6",
  },
};

export default Dashboard;
