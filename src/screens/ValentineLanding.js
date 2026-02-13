import { useState } from "react";
import ValentineAsk from "./ValentineAsk";
import ValentineSlideshow from "./ValentineSlideshow";
import ValentineLoveInput from "./ValentineLoveInput";
import ValentineLetter from "./ValentineLetter";
import FloatingHearts from "./FloatingHearts";
import BackgroundMusic from "./BackgroundMusic";
import SecretUnlock from "./SecretUnlock";

export default function ValentineLanding() {
  const [step, setStep] = useState(1);

  const images = [
  {
    src: "/1.png",
    text: "The day you entered my life, every missing piece quietly fell into place ❤️"
  },
  {
    src: "/2.png",
    text: "Your smile is my favorite sight, my safest place, my forever comfort 💖"
  },
  {
    src: "/3.png",
    text: "With you by my side, even forever feels too short 💍"
  },
  {
    src: "/4.png",
    text: "Every memory with you is a chapter I want to relive again and again 💕"
  },
  {
    src: "/5.png",
    text: "You turned my ordinary life into a love story I never knew I needed 💘"
  },
  {
    src: "/6.png",
    text: "In the loud chaos of the world, your presence is my calm and my peace 🤍"
  },
  {
    src: "/7.png",
    text: "Loving you isn’t a choice — it’s the most natural thing my heart does 💓"
  },
  {
    src: "/8.png",
    text: "No matter where life leads us, my heart will always find its way back to you 🌹"
  },
  {
    src: "/9.png",
    text: "When everything feels uncertain, holding onto you feels like home 🤍"
  },
  {
    src: "/10.mp4",
    text: "Every heartbeat of mine whispers your name, over and over 💓"
  },
  {
    src: "/11.png",
    text: "With you, even the simplest moments become the most precious memories 🌹"
  },
  {
    src: "/12.png",
    text: "No matter how many tomorrows come, I know my forever is you ❤️"
  }
];

  const [confetti, setConfetti] = useState(false);

  const loveLetter = `
My love ❤️,

Since 2017, you have been my Valentine —
not just on one special day,
but on every ordinary day that became special because of you.

From the moment you walked into my life,
everything slowly started to make sense.
The chaos felt quieter,
the smiles felt warmer,
and my heart finally knew where it belonged.

You have stood by me through every phase,
every high and every low,
loving me in ways I didn’t even know I needed.
With you, I learned what patience feels like,
what comfort truly means,
and how beautiful love can be when it is real.

I don’t want you just for today.
I don’t want you just for this Valentine.
I want you for every tomorrow,
every laugh, every tear,
every dream we build together.

No matter where life takes us,
no matter how many years pass,
my heart will always choose you —
just like it has since 2017.

So today, tomorrow, and forever,
be my Valentine,
be my love,
be my always 💘
`;

  return (
    <>
      {/* Global effects */}
      <BackgroundMusic />
      <FloatingHearts />

      {/* Screens */}
      {step === 1 && <ValentineAsk
  onYes={() => {
    setConfetti(true);
    setStep(2);
  }}
/>}
      {step === 2 && (
        <ValentineSlideshow images={images} onDone={() => setStep(3)} />
      )}
      {step === 3 && <ValentineLoveInput onSuccess={() => setStep("unlock")} />}
      {step === 4 && <ValentineLetter letter={loveLetter} />}
      {step === "unlock" && (
  <SecretUnlock onUnlock={() => setStep(4)} />
)}
    </>
  );
}




