import styles from "../retro-rpg.module.css";
import DialogueBox from "./DialogueBox";

export default function MascotBadge() {
  return (
    <div className={styles.mascotBadge}>
      <DialogueBox className="bg-cream text-center">
        <div className="relative">
          <span className={`${styles.sparkle} absolute top-0 left-0`}>
            ✦
          </span>
          <span
            className={`${styles.sparkleDelay1} absolute top-0 right-0`}
          >
            ✦
          </span>
          <span
            className={`${styles.sparkleDelay2} absolute bottom-0 left-1/2 -translate-x-1/2`}
          >
            ✦
          </span>

          <div className="text-4xl py-2">🃏🤖</div>

          <p className="font-vt323 text-navy text-xl leading-tight mt-1">
            CARD
            <br />
            GOLEM
          </p>
        </div>
      </DialogueBox>
    </div>
  );
}
