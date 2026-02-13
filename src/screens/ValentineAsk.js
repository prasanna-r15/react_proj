import { useEffect, useRef, useState } from "react";

export default function ValentineAsk({ onYes }) {
  const noRef = useRef(null);
  const [pos, setPos] = useState({ top: "55%", left: "55%" });
  const [msg, setMsg] = useState("");

  const messages = [
    "Nice try 😏",
    "You can’t say NO 😈",
    "Touching NO is illegal 🚫",
    "Only YES is allowed 💘",
    "My heart says NO to NO 💔"
  ];

  const moveNo = () => {
    const top = Math.random() * 70 + 10;
    const left = Math.random() * 70 + 10;

    setPos({ top: `${top}%`, left: `${left}%` });
    setMsg(messages[Math.floor(Math.random() * messages.length)]);
  };

  /* 📱 Mobile + Desktop proximity detection */
  useEffect(() => {
    const handleMove = e => {
      const point = e.touches ? e.touches[0] : e;
      const btn = noRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const dx = point.clientX - (rect.left + rect.width / 2);
      const dy = point.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) moveNo();
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div style={styles.center}>
      <h1 style={styles.title}>Will you be my Valentine? 💖</h1>

      <div style={styles.buttonArea}>
        <button style={styles.yes} onClick={onYes}>
          YES 💘
        </button>

        <button
          ref={noRef}
          style={{ ...styles.no, top: pos.top, left: pos.left }}
          onMouseEnter={moveNo}
          onTouchStart={moveNo}
        >
          NO 💔
        </button>
      </div>

      {msg && <p style={styles.message}>{msg}</p>}
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
    background: "linear-gradient(135deg,#ff5f9e,#ff8fab)",
    color: "white",
    fontFamily: "cursive",
    textAlign: "center"
  },

  title: {
    fontSize: "clamp(24px, 6vw, 34px)",
    marginBottom: 40
  },

  buttonArea: {
    position: "relative",
    width: "100%",
    maxWidth: 400,
    height: 260
  },

  yes: {
    padding: "16px 36px",
    fontSize: 20,
    borderRadius: 40,
    background: "linear-gradient(135deg,#ff1e56,#ff4d6d)",
    color: "white",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    zIndex: 2
  },

  no: {
    position: "absolute",
    padding: "14px 28px",
    fontSize: 18,
    borderRadius: 40,
    background: "#ffd6e0",
    color: "#ff1e56",
    border: "none",
    cursor: "pointer",
    transition: "top 0.25s ease, left 0.25s ease",
    zIndex: 1
  },

  message: {
    marginTop: 30,
    fontSize: 18,
    opacity: 0.9
  }
};
