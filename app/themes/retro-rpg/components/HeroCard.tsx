import styles from "../retro-rpg.module.css";
import DialogueBox from "./DialogueBox";

export default function HeroCard() {
  return (
    <DialogueBox className="bg-cream">
      <div
        className={`${styles.steppedCorners} bg-navy flex items-center justify-center aspect-[4/3]`}
      >
        <div className="text-center">
          <p className="font-press-start text-teal text-[8px] md:text-xs mb-4">
            &#x2660; FEATURED CARD &#x2660;
          </p>
          <p className="font-press-start text-cream text-[10px] md:text-sm leading-relaxed">
            BLACK LOTUS
          </p>
          <p className="font-vt323 text-gold text-2xl mt-3">
            Alpha Edition &mdash; 1993
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-press-start text-navy text-[8px] md:text-xs leading-relaxed">
          TopDeck.hk Verified Listing
        </h2>
        <p className="font-vt323 text-navy text-2xl mt-2">
          Hong Kong&rsquo;s rarest find &mdash; NM, authenticated by TopDeck
          sellers
        </p>
      </div>

      <div className={styles.priceTag}>
        <span className="font-press-start text-cream text-[8px] md:text-xs">
          HK$ 888,000
        </span>
      </div>
    </DialogueBox>
  );
}
