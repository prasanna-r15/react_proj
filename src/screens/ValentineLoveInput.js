import { useState } from "react";

export default function ValentineLoveInput({ onSuccess }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (text.trim().toLowerCase() === "i love you") {
      onSuccess();
    } else {
      setError("Type correctly baby 😘");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div style={styles.center}>
      <h2 style={styles.title}>Type “I love you” 💕</h2>

      <input
        style={{
          ...styles.input,
          ...(error ? styles.inputError : {})
        }}
        value={text}
        autoFocus
        inputMode="text"
        enterKeyHint="done"
        placeholder="I love you"
        onKeyDown={e => e.key === "Enter" && submit()}
        onChange={e => setText(e.target.value)}
      />

      <button style={styles.btn} onClick={submit}>
        Submit 💌
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  center: {
    minHeight: "100vh",
    paddingTop: "calc(env(safe-area-inset-top) + 80px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(135deg,#ff5f9e,#ff8fab)",
    color: "white",
    textAlign: "center"
  },

  title: {
    fontSize: "clamp(20px, 5vw, 28px)",
    marginBottom: 20
  },

  input: {
    width: "80vw",
    maxWidth: 320,
    padding: "14px",
    fontSize: 18,
    borderRadius: 12,
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
    maxWidth: 260,
    padding: "14px",
    fontSize: 18,
    borderRadius: 30,
    background: "red",
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

