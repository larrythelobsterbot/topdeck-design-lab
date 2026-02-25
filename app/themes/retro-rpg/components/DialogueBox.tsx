import styles from "../retro-rpg.module.css";

export default function DialogueBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.dialogueBox} ${className}`}>
      <span className={styles.cornerTL}>╔</span>
      <span className={styles.cornerTR}>╗</span>
      <span className={styles.cornerBL}>╚</span>
      <span className={styles.cornerBR}>╝</span>
      {children}
    </div>
  );
}
