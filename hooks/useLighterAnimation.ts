"use client";

import { useEffect, useMemo, useState } from "react";

type LighterState = "closed" | "opening" | "open" | "closing";

type UseLighterAnimationOptions = {
  frames: string[];
  frameDuration?: number; // ms
  isLive: boolean;
};

export function useLighterAnimation({
  frames,
  frameDuration = 120,
  isLive,
}: UseLighterAnimationOptions) {
  const [state, setState] = useState<LighterState>("closed");
  const [index, setIndex] = useState(0);

  const hasFrames = frames.length > 0;

  useEffect(() => {
    if (!hasFrames) {
      setState(isLive ? "open" : "closed");
      return;
    }

    if (isLive && (state === "closed" || state === "closing")) {
      setState("opening");
      setIndex(0);
    }

    if (!isLive && (state === "open" || state === "opening")) {
      setState("closing");
      setIndex(frames.length - 1);
    }
  }, [isLive, hasFrames, state, frames.length]);

  useEffect(() => {
    if (!hasFrames) return;
    if (state !== "opening" && state !== "closing") return;

    const forward = state === "opening";
    const atEnd = forward ? index >= frames.length - 1 : index <= 0;

    if (atEnd) {
      setState(forward ? "open" : "closed");
      return;
    }

    const id = setTimeout(() => {
      setIndex((prev) => (forward ? prev + 1 : prev - 1));
    }, frameDuration);

    return () => clearTimeout(id);
  }, [state, index, frames, frameDuration, hasFrames]);

  const currentFrame = useMemo(() => {
    if (!hasFrames) return null;
    if (state === "closed") return null;
    if (state === "open") return frames[frames.length - 1];
    return frames[index];
  }, [state, frames, index, hasFrames]);

  return {
    state,
    currentFrame,
    isClosed: state === "closed",
    isOpen: state === "open",
    isOpening: state === "opening",
    isClosing: state === "closing",
  };
}
