import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const AuthForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    newPassword: "",
  });

  const API_BASE_URL = "https://game-3fvh.onrender.com/auth";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isForgotPassword) {
        if (!isOtpSent) {
          // Fixed ESLint warning by removing unused 'res'
          await axios.post(`${API_BASE_URL}/forgot-password`, {
            email: formData.email,
          });
          setMessage("OTP Sent! Check your email.");
          setIsOtpSent(true);
        } else {
          // Fixed ESLint warning
          await axios.post(`${API_BASE_URL}/reset-password`, {
            email: formData.email,
            otp: formData.otp,
            newPassword: formData.newPassword,
          });
          setMessage("Password reset successful!");
          setTimeout(() => {
            setIsForgotPassword(false);
            setIsOtpSent(false);
            setIsLogin(true);
          }, 2000);
        }
      } else if (isLogin) {
        const res = await axios.post(`${API_BASE_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });

        if (res.data) {
          localStorage.setItem("token", res.data);
          setMessage("Login Successful! Redirecting...");
          setTimeout(() => {
            if (onLogin) onLogin();
            navigate("/dashboard");
          }, 800);
        }
      } else {
        if (!isOtpSent) {
          // Fixed ESLint warning
          await axios.post(`${API_BASE_URL}/signup`, {
            email: formData.email,
            password: formData.password,
          });
          setMessage("OTP Sent! Please verify your email.");
          setIsOtpSent(true);
        } else {
          // Fixed ESLint warning
          await axios.post(`${API_BASE_URL}/verify`, {
            email: formData.email,
            otp: formData.otp,
          });
          setMessage("Account verified! You can now login.");
          setIsOtpSent(false);
          setIsLogin(true);
        }
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong. Please try again.";
      setMessage(errorMsg);
    } finally {
      if (!isLogin || isForgotPassword || !localStorage.getItem("token")) {
        setLoading(false);
      }
    }
  };

  return (
    <div style={authStyles.container}>
      <div style={authStyles.contentWrapper}>
        <h2 style={authStyles.headerTitle}>Mind vs Number</h2>

        <div style={authStyles.mainCard}>
          <div style={authStyles.innerPadding}>
            <h2 style={authStyles.title}>
              {isForgotPassword
                ? "RESET PASSWORD"
                : isLogin
                  ? "MIND VS NUMBER"
                  : "JOIN GAME"}
            </h2>
            <p style={authStyles.subtitle}>
              {isForgotPassword
                ? "Recover your account"
                : "Pick a number between 1 to 100"}
            </p>

            <form onSubmit={handleAuth} style={authStyles.form}>
              <div style={authStyles.inputWrapper}>
                <label style={authStyles.label}>Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="sv@gmail.com"
                  style={authStyles.input}
                  onChange={handleChange}
                  required
                />
              </div>

              {(isLogin || (!isLogin && !isOtpSent)) && !isForgotPassword && (
                <div style={authStyles.inputWrapper}>
                  <label style={authStyles.label}>Password</label>
                  <div style={authStyles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      style={authStyles.inputPassword}
                      onChange={handleChange}
                      required
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      style={authStyles.eyeIcon}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </div>
              )}

              {isOtpSent && (
                <div style={authStyles.inputWrapper}>
                  <label style={authStyles.label}>
                    {isForgotPassword ? "New Password" : "Verification OTP"}
                  </label>
                  <input
                    type={isForgotPassword ? "password" : "text"}
                    name={isForgotPassword ? "newPassword" : "otp"}
                    placeholder={
                      isForgotPassword ? "New Password" : "Enter 6-digit OTP"
                    }
                    style={authStyles.input}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {isForgotPassword && isOtpSent && (
                <div style={authStyles.inputWrapper}>
                  <label style={authStyles.label}>Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    style={authStyles.input}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div style={authStyles.actionRow}>
                {isLogin && (
                  <label style={authStyles.rememberMe}>
                    <input type="checkbox" /> Remember me
                  </label>
                )}
                {isLogin && (
                  <span
                    style={authStyles.forgotLink}
                    onClick={() => {
                      setIsForgotPassword(true);
                      setMessage("");
                    }}
                  >
                    Forgot password?
                  </span>
                )}
              </div>

              <button
                type="submit"
                style={loading ? authStyles.btnDisabled : authStyles.btn}
                disabled={loading}
              >
                {loading
                  ? "PROCESSING..."
                  : isForgotPassword
                    ? isOtpSent
                      ? "RESET"
                      : "SEND OTP"
                    : isLogin
                      ? "SIGN IN"
                      : "SIGN UP"}
              </button>
            </form>

            {message && (
              <p
                style={{
                  ...authStyles.message,
                  color:
                    message.toLowerCase().includes("error") ||
                    message.toLowerCase().includes("wrong") ||
                    message.toLowerCase().includes("fail")
                      ? "#e74c3c"
                      : "#1DB954",
                }}
              >
                {message}
              </p>
            )}

            <p style={authStyles.footerText}>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                style={authStyles.signupLink}
                onClick={() => {
                  setIsLogin(!isLogin);
                  setIsForgotPassword(false);
                  setIsOtpSent(false);
                  setMessage("");
                }}
              >
                {isForgotPassword
                  ? "Back to Login"
                  : isLogin
                    ? "Sign up free"
                    : "Sign in"}
              </span>
            </p>
          </div>
        </div>

        <div style={authStyles.devFooter}>
          © {new Date().getFullYear()} All Rights Reserved | Developed by{" "}
          <span style={{ fontWeight: "700", color: "#1DB954" }}>
            Vinay Ravula
          </span>
        </div>
      </div>
    </div>
  );
};

const authStyles = {
container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // 100vh ki badulu 100dvh (Dynamic Viewport Height) use chey
    height: "100dvh", 
    width: "100vw",
    background: "linear-gradient(180deg, #050505 0%, #1a4d2e 100%)",
    padding: "15px", // Padding koncham thagginchu mobile kosam
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden", // Emi bayataki vellakunda control chesthundhi
    boxSizing: "border-box", // Padding valla height badagakunda chusthundhi
},
  contentWrapper: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  headerTitle: {
    color: "#fff",
    fontSize: "26px",
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
  },
  innerPadding: { padding: "40px 25px" },
  title: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#121212",
    textAlign: "center",
    margin: "0 0 5px 0",
    letterSpacing: "0.5px",
  },
  subtitle: {
    fontSize: "12px",
    color: "#6a6a6a",
    textAlign: "center",
    marginBottom: "30px",
  },
  form: { textAlign: "left" },
  inputWrapper: { marginBottom: "15px" },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    display: "block",
    marginBottom: "8px",
    color: "#121212",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#ebf2ff",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },
  passwordContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputPassword: {
    width: "100%",
    padding: "14px",
    paddingRight: "40px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#ebf2ff",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    cursor: "pointer",
    color: "#6a6a6a",
  },
  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0 25px 0",
  },
  rememberMe: {
    fontSize: "13px",
    color: "#666",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  forgotLink: {
    fontSize: "13px",
    color: "#1DB954",
    fontWeight: "700",
    cursor: "pointer",
  },
  btn: {
    width: "100%",
    backgroundColor: "#121212",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "16px",
    fontWeight: "900",
    fontSize: "14px",
    cursor: "pointer",
    letterSpacing: "1px",
  },
  btnDisabled: {
    width: "100%",
    backgroundColor: "#ccc",
    color: "white",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "900",
    cursor: "not-allowed",
  },
  footerText: {
    marginTop: "25px",
    fontSize: "13px",
    color: "#6a6a6a",
    textAlign: "center",
  },
  signupLink: { color: "#1DB954", fontWeight: "800", cursor: "pointer" },
  message: {
    fontSize: "13px",
    marginTop: "15px",
    fontWeight: "600",
    textAlign: "center",
  },
  devFooter: {
    marginTop: "20px",
    fontSize: "11px",
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
  },
};

export default AuthForm;
