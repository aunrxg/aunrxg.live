"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CatState = "SLEEPING" | "ALERT" | "ESCAPE" | "RESET" | "PLAY_WITH_RIGHT_WALL" | "PLAY_WITH_LEFT_WALL" | "CLICK";

interface OnekoCatProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}

// Sprite constants (32x32 frames)
const SPRITE_SIZE = 32;
const FPS = 8;
const PROXIMITY_THRESHOLD = 120;
const ESCAPE_SPEED = 2;

// Frame coordinates (x, y) in the sprite sheet (8x4 grid, 32x32 frames)
const FRAMES = {
  SLEEPING: [
    [64, 0],  // Sleeping frame 1 (Row 0, Col 2)
    [64, 32], // Sleeping frame 2 (Row 1, Col 2)
  ],
  ALERT: [
    [96, 64], // Surprised face 1 (Row 3, Col 2)
    [224, 96], // Surprised face 2 (Row 3, Col 7)
  ],
  IDLE: [
    [96, 96],  // Sitting (Row 3, Col 3)
    [224, 0], // Sitting Blink (Row 0, Col 7)
  ],
  WALK_LEFT: [
    [96, 0],   // Running Left 1 (Row 0, Col 3)
    [96, 32], // Running Left 2 (Row 1, Col 3)
  ],
  WALK_RIGHT: [
    [128, 64],   // Running Right 1 (Row 2, Col 4)
    [128, 96], // Running Right 2 (Row 3, Col 4)
  ],
  PLAY_WITH_RIGHT_WALL: [
    [64, 64],   // Play with Right wall 1 (Row 2, Col 2)
    [64, 96],   // Play with Right wall 2 (Row 3, Col 2)
  ],
  PLAY_WITH_LEFT_WALL: [
    [128, 0],   // Play with Right wall 1 (Row 0, Col 4)
    [128, 32],  // Play with Right wall 1 (Row 1, Col 4)
  ],
  CLICK: [
    [160, 0], // Mouse click 1 (Row 5, Col 0)
    [192, 0], // Mouse click 1 (Row 6, Col 0)
  ],
};

export default function OnekoCat({ titleRef }: OnekoCatProps) {
  const [state, setState] = useState<CatState>("SLEEPING");
  const [frameIndex, setFrameIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  
  const catX = useMotionValue(0);
  const springX = useSpring(catX, { stiffness: 100, damping: 20 });
  
  const [bounds, setBounds] = useState({ left: 0, right: 0, width: 0 });
  const lastInteractionTime = useRef(0);

  // Update title bounds
  const updateBounds = useCallback(() => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      const parentRect = titleRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        // Calculate relative to parent
        const left = rect.left - parentRect.left;
        const right = rect.right - parentRect.left;
        setBounds({ left, right, width: rect.width });
        
        // Initial position: center of title
        if (catX.get() === 0) {
          catX.set(left + rect.width / 2 - SPRITE_SIZE / 2);
        }
      }
    }
  }, [titleRef, catX]);

  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [updateBounds]);

  // Frame animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % 2);
    }, 3000 / FPS);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking and behavior logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!titleRef.current) return;

      const titleRect = titleRef.current.getBoundingClientRect();
      const currentX = catX.get() + titleRect.left; // Global X
      const currentY = titleRect.top - SPRITE_SIZE; // Global Y (slightly above)

      const dx = e.clientX - (currentX + SPRITE_SIZE / 2);
      const dy = e.clientY - (currentY + SPRITE_SIZE / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      const now = Date.now();

      if (state === "CLICK") return;

      if (state === "SLEEPING" && distance < PROXIMITY_THRESHOLD) {
        setState("ALERT");
        lastInteractionTime.current = now;
      } else if (state === "ALERT" && now - lastInteractionTime.current > 500) {
        setState("ESCAPE");
      } else if (state === "ESCAPE") {
        if (distance > PROXIMITY_THRESHOLD + 50) {
          setState("RESET");
          lastInteractionTime.current = now;
        } else {
          // Escape logic: move away from cursor horizontally
          const moveDir = dx > 0 ? -1 : 1;
          const targetX = catX.get() + moveDir * ESCAPE_SPEED;
          
          // Clamp within bounds
          const padding = 10;
          const leftBound = bounds.left - padding;
          const rightBound = bounds.right - SPRITE_SIZE + padding;
          const clampedX = Math.max(leftBound, Math.min(rightBound, targetX));
          
          // Wall check
          if (clampedX === rightBound && dx > 0) {
            setState("PLAY_WITH_RIGHT_WALL");
          } else if (clampedX === leftBound && dx < 0) {
            setState("PLAY_WITH_LEFT_WALL");
          } else {
            catX.set(clampedX);
            setDirection(moveDir > 0 ? "right" : "left");
          }
        }
      } else if ((state === "PLAY_WITH_RIGHT_WALL" || state === "PLAY_WITH_LEFT_WALL") && distance > PROXIMITY_THRESHOLD) {
        setState("RESET");
        lastInteractionTime.current = now;
      } else if (state === "RESET" && now - lastInteractionTime.current > 2000) {
        setState("SLEEPING");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [state, bounds, catX, titleRef]);

  // Determine current frame coordinates
  const getSpritePos = () => {
    let frameSet = FRAMES.SLEEPING;
    if (state === "ALERT") frameSet = FRAMES.ALERT;
    if (state === "ESCAPE") {
      frameSet = direction === "left" ? FRAMES.WALK_RIGHT : FRAMES.WALK_LEFT;
    }
    if (state === "PLAY_WITH_RIGHT_WALL") frameSet = FRAMES.PLAY_WITH_RIGHT_WALL;
    if (state === "PLAY_WITH_LEFT_WALL") frameSet = FRAMES.PLAY_WITH_LEFT_WALL;
    if (state === "CLICK") frameSet = FRAMES.CLICK;
    if (state === "RESET") frameSet = FRAMES.IDLE;
    
    const frame = frameSet[frameIndex % frameSet.length];
    return `-${frame[0]}px -${frame[1]}px`;
  };

  return (
    <motion.div
      onClick={() => {
        setState("CLICK");
        setTimeout(() => {
          setState("RESET");
          lastInteractionTime.current = Date.now();
        }, 1000);
      }}
      style={{
        x: springX,
        y: -SPRITE_SIZE + 5,
        position: "absolute",
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        backgroundImage: 'url("/oneko.gif")',
        backgroundPosition: getSpritePos(),
        imageRendering: "pixelated",
        pointerEvents: "auto",
        cursor: "pointer",
        zIndex: 10,
      }}
      initial={false}
    >
      {/* {state === "SLEEPING" && (
        <motion.span
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: -20, x: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-4 left-4 text-[10px] font-mono text-neutral-400 select-none"
        >
          Zzz
        </motion.span>
      )} */}
    </motion.div>
  );
}
