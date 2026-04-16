import React from "react";

export default function SmartTitle({ title }: { title: string }) {
  const words = title.split(" ");

  // List of words that should typically act as connectors (often lowercase serif italic in this style)
  const connectorWords = [
    "for", "in", "and", "the", "to", "of", "a", "an", "with", "on", "at", "by", "is",
  ];

  return (
    <h1 className="flex flex-wrap justify-center items-baseline gap-x-3 md:gap-x-5 gap-y-1 md:gap-y-2 max-w-5xl mx-auto leading-[0.85] text-6xl md:text-[8rem]">
      {words.map((word, i) => {
        const cleanWord = word.toLowerCase();
        const isConnector = connectorWords.includes(cleanWord);

        // pseudo-random value between 0 and 1 based on index to ensure consistency
        const rand = Math.abs(Math.sin((i + 1) * 12345.67));

        // Connectors are generally serif. For non-connectors, 30% chance of serif.
        const isSerif = isConnector || (rand * 10) % 1 < 0.3;

        // Vary between Normal vs Italic
        const isItalic = isConnector ? true : isSerif ? (rand * 100) % 1 < 0.8 : (rand * 100) % 1 < 0.1;

        // Uppercase vs Lowercase
        const isUppercase = isConnector ? false : isSerif ? (rand * 1000) % 1 < 0.2 : (rand * 1000) % 1 < 0.9;

        // Slight variations in font-weight
        const weights = ["font-normal", "font-medium", "font-semibold", "font-bold", "font-black"];
        const weightIndex = Math.floor(((rand * 10000) % 1) * weights.length);
        const weightClass = isSerif ? "font-normal" : weights[weightIndex];

        // Colors: varying shades of neutral
        const colors = [
          "text-neutral-800 dark:text-neutral-200",
          "text-neutral-600 dark:text-neutral-300",
          "text-neutral-500 dark:text-neutral-400",
          "text-[#778da9] dark:text-[#a0b0c9]", 
          "text-[#6c7b95] dark:text-[#b0bdcf]",
        ];

        let colorClass = "text-neutral-800 dark:text-neutral-200";
        if (isConnector || isSerif) {
          colorClass = "text-[#d4a373] dark:text-[#e5b385]";
        } else {
          colorClass = colors[Math.floor(((rand * 100000) % 1) * colors.length)];
        }

        return (
          <span
            key={i}
            className={`
              ${isSerif ? "font-serif text-[1.1em] tracking-tight" : "font-sans tracking-tight"}
              ${isItalic ? "italic" : "not-italic"}
              ${isUppercase ? "uppercase" : "lowercase"}
              ${weightClass}
              ${colorClass}
              transition-colors duration-500 dark:hover:text-neutral-300 hover:text-neutral-950
            `}
          >
            {word}
          </span>
        );
      })}
    </h1>
  );
}
