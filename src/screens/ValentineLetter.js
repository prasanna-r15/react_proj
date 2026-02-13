import { useEffect, useRef, useState } from "react";

export default function ValentineLetter({ letter }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (index < letter.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + letter[index]);
        setIndex(index + 1);
      }, 45);

      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [index, letter]);

  /* 🔥 AUTO SCROLL EFFECT */
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [displayed]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💖 My Love Letter 💖</h1>

      <pre style={styles.text}>
        {displayed}
        {!done && <span style={styles.cursor}>|</span>}
      </pre>

      {done && <p style={styles.footer}>Forever yours ❤️</p>}

      {/* Invisible scroll anchor */}
      <div ref={containerRef} />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "calc(env(safe-area-inset-top) + 60px) 20px 40px",
    background: "linear-gradient(135deg,#ff758c,#ff7eb3)",
    color: "white",
    fontFamily: "cursive",
    textAlign: "center",
    animation: "fadeIn 1.5s ease"
  },

  title: {
    fontSize: "clamp(24px, 6vw, 36px)",
    marginBottom: 30
  },

  text: {
    maxWidth: 720,
    margin: "0 auto",
    whiteSpace: "pre-wrap",
    fontSize: "clamp(16px, 4.5vw, 20px)",
    lineHeight: "1.7",
    letterSpacing: "0.3px"
  },

  cursor: {
    display: "inline-block",
    marginLeft: 2,
    animation: "blink 1s step-end infinite"
  },

  footer: {
    marginTop: 40,
    fontSize: "clamp(18px, 5vw, 22px)",
    opacity: 0.9,
    animation: "fadeUp 1.5s ease"
  }
};
