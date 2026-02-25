"use client";

import { useState } from "react";
import styles from "../retro-rpg.module.css";
import DialogueBox from "./DialogueBox";

export default function NeonSignBoard() {
  const [pressed, setPressed] = useState(false);

  return (
    <DialogueBox className="bg-navy h-full flex flex-col justify-between">
      <div>
        <p className="font-vt323 text-teal text-xl mb-4">
          &#x25B6; WEEKLY EVENT
        </p>
        <h2
          className={`${styles.neonText} font-press-start text-[10px] md:text-lg leading-relaxed mb-6`}
        >
          FRIDAY
          <br />
          TRADE
          <br />
          NIGHT
        </h2>
        <div className="border-t-2 border-solid border-teal pt-4">
          <p className="font-vt323 text-cream text-2xl">
            Mong Kok MTR &mdash; Exit D
          </p>
          <p className="font-vt323 text-cream text-2xl mt-1">
            Every Friday at 19:00
          </p>
          <p className="font-vt323 text-gold text-xl mt-3">
            Trade in person. No fees. No proxies.
          </p>
        </div>
      </div>

      <button
        className={`${styles.beveledButton} ${pressed ? styles.beveledButtonPressed : ""} mt-6 w-full`}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
      >
        JOIN THE GUILD
      </button>
    </DialogueBox>
  );
}
