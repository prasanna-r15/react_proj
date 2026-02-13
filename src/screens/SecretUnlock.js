import { useState } from "react";

export default function SecretUnlock({ onUnlock }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const secretName = "kunju"; // 💕 change if needed

  const submit = () => {
    if (name.trim().toLowerCase() === secretName) {
      onUnlock();
    } else {
      setError("Hmm… that’s not the one 😘");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div style={styles.center}>
      <h2 style={styles.title}>Type my secret name 💕</h2>

      <input
        style={{
          ...styles.input,
          ...(error ? styles.inputError : {})
        }}
        value={name}
        autoFocus
        placeholder="Secret name…"
        inputMode="text"
        enterKeyHint="done"
        onKeyDown={e => e.key === "Enter" && submit()}
        onChange={e => setName(e.target.value)}
      />

      <button style={styles.btn} onClick={submit}>
        Unlock 💖
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  center: {
    minHeight: "100vh",
    paddingTop: "calc(env(safe-area-inset-top) + 90px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(135deg,#ff758c,#ff7eb3)",
    color: "white",
    textAlign: "center"
  },

  title: {
    fontSize: "clamp(20px, 5vw, 28px)",
    marginBottom: 20
  },

  input: {
    width: "80vw",
    maxWidth: 300,
    padding: "14px",
    fontSize: 18,
    borderRadius: 14,
    border: "none",
    outline: "none",
    textAlign: "center",
    marginBottom: 20,
    transition: "transform 0.2s"
  },

  inputError: {
    animation: "shake 0.3s"
  },

  btn: {
    width: "80vw",
    maxWidth: 240,
    padding: "14px",
    fontSize: 18,
    borderRadius: 30,
    background: "linear-gradient(135deg,#ff4d6d,#ff758c)",
    color: "white",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
  },

  error: {
    marginTop: 15,
    fontSize: 16,
    color: "#ffe4e4"
  }
};
