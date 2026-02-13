import { useEffect } from "react";

export default function FloatingHearts() {
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.className = "floating-heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 6000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return null;
}
