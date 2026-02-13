import { useEffect, useRef, useState } from "react";

export default function ValentineSlideshow({ images, onDone }) {
  const [index, setIndex] = useState(0);
  const mediaRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  const current = images[index];
  const isVideo = current.src.endsWith(".mp4");

  useEffect(() => {
    let timer;

    // ⏱ If video, wait for video duration (fallback 5s)
    if (isVideo && mediaRef.current) {
      const video = mediaRef.current;

      const playVideo = async () => {
        try {
          await video.play();
        } catch (e) {}
      };

      playVideo();

      const duration =
        video.duration && !isNaN(video.duration)
          ? video.duration * 1000
          : 5000;

      timer = setTimeout(nextSlide, duration);
    } else {
      // 📸 Image timing
      timer = setTimeout(nextSlide, 3000);
    }

    return () => {
      clearTimeout(timer);
      if (mediaRef.current && isVideo) {
        mediaRef.current.pause();
        mediaRef.current.currentTime = 0;
      }
    };
  }, [index]);

  const nextSlide = () => {
    if (index < images.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      onDone();
    }
  };

  return (
    <div style={styles.center}>
      <div
        style={{
          ...styles.imageFrame,
          ...(isMobile ? styles.mobileFrame : styles.desktopFrame)
        }}
      >
        {isVideo ? (
          <video
            ref={mediaRef}
            src={current.src}
            style={styles.media}
            muted
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={current.src}
            alt=""
            style={styles.media}
            className="romantic-img"
          />
        )}
      </div>

      <p style={styles.caption}>{current.text}</p>
    </div>
  );
}

const styles = {
  center: {
    textAlign: "center",
    paddingTop: 100,
    minHeight: "100vh",
    background: "linear-gradient(135deg,#ff758c,#ff7eb3)",
    color: "white"
  },

  imageFrame: {
    margin: "0 auto",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  },

  desktopFrame: {
    width: 320,
    height: 420
  },

  mobileFrame: {
    width: "85vw",
    maxWidth: 320,
    height: "65vh",
    maxHeight: 420
  },

  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  caption: {
    marginTop: 16,
    fontSize: 18,
    padding: "0 20px"
  }
};
