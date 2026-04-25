"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

type CatState =
  | "SLEEPING"
  | "WAKING"               // surprised — plays ALERT frames
  | "DECIDING"             // sitting still, watching cursor — plays IDLE frames
  | "RUNNING"              // committed to one direction, constant speed
  | "SITTING"              // caught breath, grooming before sleep
  | "PLAY_WITH_RIGHT_WALL"
  | "PLAY_WITH_LEFT_WALL"
  | "CLICK";

interface OnekoCatProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const SPRITE_SIZE = 32;
const PROXIMITY   = 120;   // px — cursor detection radius

// The key to non-floaty movement: position only advances when the animation
// frame flips. Each stride = exactly STEP pixels. Tune STEP to taste.
const STEP        = 7;     // px per animation frame while running
const RUN_FPS     = 8;     // strides per second

const FRAMES: Record<string, [number, number][]> = {
  SLEEPING:             [[64, 0],   [64, 32]],
  ALERT:                [[96, 64],  [224, 96]],
  IDLE:                 [[96, 96],  [224, 0]],
  WALK_LEFT:            [[96, 0],   [96, 32]],
  WALK_RIGHT:           [[128, 64], [128, 96]],
  PLAY_WITH_RIGHT_WALL: [[64, 64],  [64, 96]],
  PLAY_WITH_LEFT_WALL:  [[128, 0],  [128, 32]],
  CLICK:                [[160, 0],  [192, 0]],
};

// Each state plays at a different cadence — sleeping should feel languid,
// running snappy. This is what makes the cat feel alive vs robotic.
const STATE_FPS: Record<CatState, number> = {
  SLEEPING:             1.5,
  WAKING:               3,
  DECIDING:             2.5,
  RUNNING:              RUN_FPS,
  SITTING:              1.8,
  PLAY_WITH_RIGHT_WALL: 7,
  PLAY_WITH_LEFT_WALL:  7,
  CLICK:                4,
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function OnekoCat({ titleRef }: OnekoCatProps) {
  const [displayState, setDisplayState] = useState<CatState>("SLEEPING");
  const [frameIndex,   setFrameIndex]   = useState(0);
  const [catLeft,      setCatLeft]      = useState(0);
  const [direction,    setDirection]    = useState<"left" | "right">("right");

  // ── Refs — all mutation lives here so the RAF loop never goes stale ──────
  const stateRef        = useRef<CatState>("SLEEPING");
  const posRef          = useRef(0);
  const dirRef          = useRef<"left" | "right">("right");
  const boundsRef       = useRef({ left: 0, right: 0 });
  const mouseRef        = useRef({ x: -9999, y: -9999 });
  const stateEnteredRef = useRef(Date.now());
  const frameTimerRef   = useRef(0);
  const frameIdxRef     = useRef(0);
  const rafRef          = useRef<number | null>(null);
  const initializedRef  = useRef(false);
  const sitDurRef       = useRef(2000);

  // Per-cat personality — randomised once on mount
  const personality = useRef({
    wakeDelay:   400 + Math.random() * 500,  // ms of surprise before deciding
    decideDelay: 200 + Math.random() * 300,  // ms of "oh no" stare before bolt
  });

  // ── Helpers ───────────────────────────────────────────────────────────────

  const getGlobalCenter = useCallback(() => {
    if (!titleRef.current) return { x: 0, y: 0 };
    const r = titleRef.current.getBoundingClientRect();
    return { x: r.left + posRef.current + SPRITE_SIZE / 2, y: r.top };
  }, [titleRef]);

  const mouseToCat = useCallback(() => {
    const c  = getGlobalCenter();
    const dx = mouseRef.current.x - c.x;
    const dy = mouseRef.current.y - c.y;
    return { dist: Math.sqrt(dx * dx + dy * dy), dx };
  }, [getGlobalCenter]);

  const changeState = useCallback((
    next: CatState,
    runDir?: "left" | "right",
  ) => {
    if (stateRef.current === next) return;
    stateRef.current        = next;
    stateEnteredRef.current = Date.now();
    frameIdxRef.current     = 0;
    frameTimerRef.current   = 0;

    if (runDir) {
      dirRef.current = runDir;
      setDirection(runDir);
    }
    if (next === "SITTING") {
      sitDurRef.current = 1500 + Math.random() * 1500;
    }
    setDisplayState(next);
  }, []);

  // ── Bounds ────────────────────────────────────────────────────────────────

  const updateBounds = useCallback(() => {
    if (!titleRef.current) return;
    const r = titleRef.current.getBoundingClientRect();
    const p = titleRef.current.parentElement?.getBoundingClientRect();
    if (!p) return;
    boundsRef.current = { left: r.left - p.left, right: r.right - p.left };

    if (!initializedRef.current) {
      initializedRef.current = true;
      const { left, right } = boundsRef.current;
      posRef.current = left + (right - left) / 2 - SPRITE_SIZE / 2;
      setCatLeft(posRef.current);
    }
  }, [titleRef]);

  // ── Game loop ─────────────────────────────────────────────────────────────

  useEffect(() => {
    let lastTs = 0;
    const WALL_PAD = 6;

    const tick = (ts: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const dt      = Math.min(ts - lastTs, 50);
      lastTs        = ts;

      const elapsed = Date.now() - stateEnteredRef.current;
      const { dist, dx } = mouseToCat();
      const { left, right } = boundsRef.current;
      const L = left  - WALL_PAD;
      const R = right - SPRITE_SIZE + WALL_PAD;

      // ── State logic ────────────────────────────────────────────────────

      switch (stateRef.current) {

        case "SLEEPING":
          if (dist < PROXIMITY) changeState("WAKING");
          break;

        case "WAKING":
          // Play surprised frames, then move to deciding
          if (elapsed > personality.current.wakeDelay) changeState("DECIDING");
          break;

        case "DECIDING":
          // Hold a beat, stare at the cursor, then bolt opposite direction.
          // Direction locked here — cat commits and doesn't second-guess.
          if (elapsed > personality.current.decideDelay) {
            changeState("RUNNING", dx > 0 ? "left" : "right");
          }
          break;

        case "RUNNING":
          // Position ticks happen inside the animation-frame block below.
          // Only transition logic lives here.
          if (dist > PROXIMITY + 80) changeState("SITTING");
          break;

        case "SITTING":
          if (dist < PROXIMITY) {
            // Cursor came back — evaluate which side and run the opposite way
            changeState("RUNNING", dx > 0 ? "left" : "right");
          } else if (elapsed > sitDurRef.current) {
            changeState("SLEEPING");
          }
          break;

        case "PLAY_WITH_LEFT_WALL":
        case "PLAY_WITH_RIGHT_WALL":
          if (dist > PROXIMITY + 40) changeState("SITTING");
          break;

        case "CLICK":
          break;
      }

      // ── Animation frame tick ───────────────────────────────────────────
      //
      // IMPORTANT: position advances ONLY on a frame flip.
      // This couples stride length (STEP px) to the visual leg cycle,
      // eliminating the "floating" / "sliding" effect entirely.

      const fps = STATE_FPS[stateRef.current];
      frameTimerRef.current += dt;

      if (frameTimerRef.current >= 1000 / fps) {
        frameTimerRef.current -= 1000 / fps;

        const nextFrame = (frameIdxRef.current + 1) % 2;
        frameIdxRef.current = nextFrame;
        setFrameIndex(nextFrame);

        // Only move while running
        if (stateRef.current === "RUNNING") {
          const delta  = dirRef.current === "left" ? STEP : -STEP;
          const newPos = Math.max(L, Math.min(R, posRef.current + delta));

          posRef.current = newPos;
          setCatLeft(newPos);

          if (newPos <= L) {
            changeState(dist < PROXIMITY ? "PLAY_WITH_LEFT_WALL" : "SITTING");
          } else if (newPos >= R) {
            changeState(dist < PROXIMITY ? "PLAY_WITH_RIGHT_WALL" : "SITTING");
          }
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [changeState, mouseToCat]);

  // ── Event listeners ───────────────────────────────────────────────────────

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [updateBounds]);

  // ── Sprite ────────────────────────────────────────────────────────────────

  const getSpritePos = (): string => {
    let key = "SLEEPING";
    switch (displayState) {
      case "WAKING":               key = "ALERT"; break;
      case "DECIDING":             key = "IDLE"; break;
      case "RUNNING":              key = direction === "left" ? "WALK_LEFT" : "WALK_RIGHT"; break;
      case "SITTING":              key = "IDLE"; break;
      case "PLAY_WITH_RIGHT_WALL": key = "PLAY_WITH_RIGHT_WALL"; break;
      case "PLAY_WITH_LEFT_WALL":  key = "PLAY_WITH_LEFT_WALL"; break;
      case "CLICK":                key = "CLICK"; break;
    }
    const [fx, fy] = FRAMES[key][frameIndex % 2];
    return `-${fx}px -${fy}px`;
  };

  const handleClick = useCallback(() => {
    if (stateRef.current === "CLICK") return;
    changeState("CLICK");
    setTimeout(() => changeState("SITTING"), 1000);
  }, [changeState]);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      onClick={handleClick}
      style={{
        position:           "absolute",
        left:               catLeft,
        top:                -SPRITE_SIZE + 5,
        width:              SPRITE_SIZE,
        height:             SPRITE_SIZE,
        backgroundImage:    'url("/oneko.gif")',
        backgroundPosition: getSpritePos(),
        backgroundSize:     "auto",
        imageRendering:     "pixelated",
        pointerEvents:      "auto",
        cursor:             "pointer",
        zIndex:             10,
        willChange:         "left, background-position",
      }}
    />
  );
}