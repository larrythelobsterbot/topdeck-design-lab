"use client";

import { useRef, useState } from "react";
import styles from "../retro-rpg.module.css";
import DialogueBox from "./DialogueBox";

const trades = [
  {
    name: "Force of Will",
    set: "Alliances",
    condition: "Near Mint",
    price: "HK$ 2,800",
  },
  {
    name: "Ragavan, Nimble Pilferer",
    set: "MH2",
    condition: "Lightly Played",
    price: "HK$ 650",
  },
  {
    name: "The One Ring",
    set: "LTR",
    condition: "Near Mint",
    price: "HK$ 4,200",
  },
];

export default function TradingBoard() {
  const [hoveredTrade, setHoveredTrade] = useState<
    (typeof trades)[number] | null
  >(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const updatePreviewPos = (e: React.MouseEvent) => {
    previewRef.current?.style.setProperty(
      "--preview-x",
      `${e.clientX + 20}px`
    );
    previewRef.current?.style.setProperty(
      "--preview-y",
      `${e.clientY - 100}px`
    );
  };

  return (
    <DialogueBox className="bg-cream">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 border-b-2 md:border-b-0 md:border-r-2 border-solid border-navy pb-4 md:pb-0 md:pr-6">
          <h2 className="font-press-start text-navy text-[10px] md:text-sm leading-relaxed">
            HAVE /
            <br />
            WANT
          </h2>
          <div className="border-t-2 border-solid border-navy mt-4 pt-4">
            <p className="font-vt323 text-navy text-xl">
              TopDeck.hk meetups
            </p>
            <p className="font-vt323 text-teal text-xl mt-1">
              Tsim Sha Tsui MTR &mdash; Exit A1
            </p>
            <p className="font-vt323 text-navy text-xl mt-1">
              Every Saturday 14:00
            </p>
          </div>
          <div className="border-t-2 border-solid border-terracotta mt-4 pt-4">
            <p className="font-vt323 text-terracotta text-lg">
              &#x25B6; 12 traders active in HK
            </p>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="border-b-2 border-solid border-navy pb-2 mb-0 grid grid-cols-3 gap-2">
            <span className="font-press-start text-navy text-[10px]">
              CARD
            </span>
            <span className="font-press-start text-navy text-[10px]">
              COND.
            </span>
            <span className="font-press-start text-navy text-[10px] text-right">
              PRICE
            </span>
          </div>

          {trades.map((trade) => (
            <div
              key={trade.name}
              data-interactive
              className={`${styles.tradeRow} grid grid-cols-3 gap-2`}
              onMouseEnter={(e) => {
                setHoveredTrade(trade);
                updatePreviewPos(e);
              }}
              onMouseLeave={() => setHoveredTrade(null)}
              onMouseMove={updatePreviewPos}
            >
              <div>
                <span className="font-vt323 text-navy text-xl">
                  {trade.name}
                </span>
                <span className="font-vt323 text-teal text-lg block">
                  {trade.set}
                </span>
              </div>
              <span className="font-vt323 text-navy text-xl">
                {trade.condition}
              </span>
              <span className="font-vt323 text-gold text-2xl text-right">
                {trade.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={previewRef}
        className={`${styles.cardPreview} ${hoveredTrade ? styles.cardPreviewVisible : ""}`}
      >
        {hoveredTrade && (
          <>
            <div className={styles.cardPreviewImage}>
              <span className="font-press-start text-teal text-[8px] text-center leading-relaxed px-2">
                {hoveredTrade.name}
              </span>
            </div>
            <p className="font-vt323 text-navy text-lg mt-2">
              {hoveredTrade.set}
            </p>
            <p className="font-vt323 text-gold text-lg">
              {hoveredTrade.price}
            </p>
          </>
        )}
      </div>
    </DialogueBox>
  );
}
