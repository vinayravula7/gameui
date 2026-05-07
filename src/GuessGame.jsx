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
      await axios.post(`${API_BASE_URL}/reset`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
          <Target size={24} color="#1DB954" />
        </div>
        <h1 style={gameStyles.title}>MIND VS NUMBER</h1>
        <p style={gameStyles.subtitle}>Pick a number between 1 to 100</p>
      </div>

      <div style={gameStyles.infoBox}>
        <span style={{ fontSize: "18px" }}>🎲</span>
        <div style={{ textAlign: "left" }}>
          <p style={gameStyles.infoPara}>System has picked a secret number.</p>
          <strong style={{ color: "#1DB954", fontSize: "12px" }}>
            {isCorrect ? "Success!" : "Your turn to guess"}
          </strong>
        </div>
      </div>

      <div style={gameStyles.section}>
        <div style={gameStyles.labelRow}>
          <User size={14} color="#1DB954" />
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
            style={isCorrect || loading ? gameStyles.guessBtnDisabled : gameStyles.guessBtn}
            disabled={loading || isCorrect}
          >
            {loading ? "..." : "GUESS"}
          </button>
        </form>
      </div>

      <div style={gameStyles.section}>
        <div style={gameStyles.labelRow}>
          <Trophy size={14} color="#1DB954" />
          <span style={gameStyles.labelText}>Result</span>
        </div>
        <div style={{
            ...gameStyles.resultBox,
            backgroundColor: isCorrect ? "#f0fff4" : "#fcfcfc",
            borderColor: isCorrect ? "#1DB954" : "#eee",
          }}>
          {isCorrect ? <CheckCircle2 color="#1DB954" size={24} /> : <Target color="#bdc3c7" size={24} />}
          <div style={{ textAlign: "left" }}>
            <h3 style={gameStyles.resultHead}>{isCorrect ? "Brilliant!" : "Feedback"}</h3>
            <p style={{
                ...gameStyles.resultPara,
                color: isCorrect ? "#1DB954" : message === "Can you guess it?" ? "#636e72" : "#e74c3c",
                fontWeight: message === "Can you guess it?" ? "400" : "700",
              }}>
              {isCorrect ? `Correct! The number was ${guess}.` : message}
            </p>
          </div>
        </div>
      </div>

      <div style={gameStyles.statsBar}>
        <div style={gameStyles.statItem}>
          <Hash size={16} color="#1DB954" />
          <div style={gameStyles.statCol}>
            <span style={gameStyles.statLabel}>Last</span>
            <span style={gameStyles.statValue}>{lastGuess}</span>
          </div>
        </div>
        <div style={gameStyles.statItem}>
          <BarChart3 size={16} color="#1DB954" />
          <div style={gameStyles.statCol}>
            <span style={gameStyles.statLabel}>Attempts</span>
            <span style={gameStyles.statValue}>{attempts}</span>
          </div>
        </div>
      </div>

      {isCorrect && (
        <button onClick={resetGame} style={gameStyles.playAgain}>
          <RotateCcw size={16} /> PLAY AGAIN
        </button>
      )}
    </div>
  );
};

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
        <button onClick={handleLogout} style={dashStyles.logoutBtn}>
          <LogOut size={16} /> LOG OUT
        </button>
        <div style={dashStyles.devFooter}>
          <p>© {new Date().getFullYear()} Developed by <span style={{ color: "#1DB954", fontWeight: "700" }}>Vinay Ravula</span></p>
        </div>
      </div>
    </div>
  );
};

const gameStyles = {
  card: { padding: "15px", display: "flex", flexDirection: "column", gap: "12px" },
  header: { textAlign: "center" },
  iconCircle: { background: "#f0fdf4", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 5px" },
  title: { fontSize: "16px", color: "#121212", margin: 0, fontWeight: "900" },
  subtitle: { fontSize: "11px", color: "#6a6a6a", margin: "2px 0" },
  infoBox: { background: "#f8f8f8", padding: "8px", borderRadius: "10px", display: "flex", gap: "8px", alignItems: "center", border: "1px solid #eee" },
  infoPara: { margin: 0, fontSize: "11px", color: "#6a6a6a" },
  section: { display: "flex", flexDirection: "column", gap: "5px" },
  labelRow: { display: "flex", alignItems: "center", gap: "5px" },
  labelText: { fontWeight: "700", color: "#121212", fontSize: "12px" },
  inputRow: { display: "flex", gap: "8px" },
  input: { flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #d9d9d9", fontSize: "14px", outline: "none" },
  guessBtn: { backgroundColor: "#121212", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" },
  guessBtnDisabled: { backgroundColor: "#ccc", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px" },
  resultBox: { padding: "10px", borderRadius: "10px", display: "flex", gap: "10px", alignItems: "center", border: "1px solid #eee" },
  resultHead: { margin: 0, fontSize: "13px", fontWeight: "700" },
  resultPara: { margin: 0, fontSize: "12px" },
  statsBar: { display: "flex", justifyContent: "space-around", background: "#f9f9f9", padding: "10px", borderRadius: "10px", border: "1px solid #eee" },
  statItem: { display: "flex", alignItems: "center", gap: "5px" },
  statCol: { display: "flex", flexDirection: "column" },
  statLabel: { fontSize: "8px", color: "#999", textTransform: "uppercase", fontWeight: "700" },
  statValue: { fontSize: "14px", fontWeight: "800", color: "#121212" },
  playAgain: { backgroundColor: "#1DB954", color: "white", border: "none", padding: "10px", borderRadius: "20px", fontWeight: "800", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
};

const dashStyles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100dvh", width: "100vw", background: "linear-gradient(180deg, #050505 0%, #1a4d2e 100%)", padding: "10px", boxSizing: "border-box", overflow: "hidden" },
  contentWrapper: { width: "100%", maxWidth: "420px", maxHeight: "98dvh", display: "flex", flexDirection: "column", gap: "10px" },
  headerTitle: { color: "#fff", fontSize: "20px", fontWeight: "900", textAlign: "center", margin: "0" },
  mainCard: { backgroundColor: "#ffffff", borderRadius: "20px", boxShadow: "0 15px 35px rgba(0,0,0,0.5)", width: "100%", overflowY: "auto" },
  logoutBtn: { backgroundColor: "#1DB954", color: "#ffffff", padding: "12px", borderRadius: "50px", border: "none", fontSize: "13px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer" },
  devFooter: { fontSize: "10px", color: "rgba(255, 255, 255, 0.4)", textAlign: "center" },
};

export default Dashboard;
