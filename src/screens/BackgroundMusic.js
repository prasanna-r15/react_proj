import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playMusic = () => {
      audioRef.current.play().catch(() => {});
      document.removeEventListener("click", playMusic);
    };

    document.addEventListener("click", playMusic);

    return () => document.removeEventListener("click", playMusic);
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/love.mp3" type="audio/mpeg" />
    </audio>
  );
}

