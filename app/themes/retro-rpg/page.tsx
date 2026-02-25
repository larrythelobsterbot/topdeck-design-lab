"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./retro-rpg.module.css";
import HeroCard from "./components/HeroCard";
import NeonSignBoard from "./components/NeonSignBoard";
import MascotBadge from "./components/MascotBadge";
import TradingBoard from "./components/TradingBoard";

const HEADING_TEXT = "TopDeck.hk Design Lab";

export default function RetroRpgPage() {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorHover, setCursorHover] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const neonRef = useRef<HTMLDivElement>(null);
  const tradeRef = useRef<HTMLDivElement>(null);

  // Typewriter — letter-by-letter reveal via setInterval
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(HEADING_TEXT.slice(0, i));
      if (i >= HEADING_TEXT.length) {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  // Custom cursor — track mouse, detect interactive targets
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current?.style.setProperty("--cursor-x", `${e.clientX}px`);
      cursorRef.current?.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "button, a, [role='button'], [data-interactive]"
      );
      setCursorHover(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Stepped parallax scroll for background text
  useEffect(() => {
    const STEP = 50;
    const FACTOR = 0.15;
    let lastStepped = 0;

    const handleScroll = () => {
      const stepped = Math.floor(window.scrollY / STEP) * STEP;
      if (stepped !== lastStepped) {
        lastStepped = stepped;
        bgTextRef.current?.style.setProperty(
          "--parallax-y",
          `${-stepped * FACTOR}px`
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal — IntersectionObserver triggers stepped CSS animations
  useEffect(() => {
    const sections = [
      { ref: heroRef, anim: styles.slideFromLeft },
      { ref: neonRef, anim: styles.slideFromRight },
      { ref: tradeRef, anim: styles.slideFromBottom },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = sections.find(
            (s) => s.ref.current === entry.target
          );
          if (match) {
            entry.target.classList.remove(styles.scrollHidden);
            entry.target.classList.add(match.anim);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`graph-paper min-h-screen bg-cream ${styles.cursorHide}`}>
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${cursorHover ? styles.cursorHover : ""}`}
      />

      <div ref={bgTextRef} className={styles.bgText}>
        TOPDECK
      </div>

      <span className={`${styles.pageSparkle} top-[100px] left-[5%]`}>
        ✦
      </span>
      <span
        className={`${styles.pageSparkle} ${styles.pageSparkle2} top-[320px] right-[7%]`}
      >
        ✦
      </span>
      <span
        className={`${styles.pageSparkle} ${styles.pageSparkle3} top-[580px] left-[3%]`}
      >
        ✦
      </span>
      <span
        className={`${styles.pageSparkle} ${styles.pageSparkle4} top-[440px] right-[4%]`}
      >
        ✦
      </span>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        <div className={styles.notifBell}>🔔</div>

        <h1 className="font-press-start text-navy text-[10px] md:text-2xl border-b-4 border-solid border-navy pb-4 mb-8">
          {displayedText}
          <span className={styles.typewriterCaret}>&#x2588;</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div
            ref={heroRef}
            className={`md:col-span-7 relative ${styles.scrollHidden}`}
          >
            <HeroCard />
            <MascotBadge />
          </div>

          <div
            ref={neonRef}
            className={`md:col-span-5 ${styles.scrollHidden}`}
          >
            <NeonSignBoard />
          </div>

          <div
            ref={tradeRef}
            className={`md:col-span-12 mt-4 ${styles.scrollHidden}`}
          >
            <TradingBoard />
          </div>
        </div>
      </div>
    </div>
  );
}
