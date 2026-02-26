import { useEffect, useLayoutEffect, useRef } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  callback: (event: Event) => void
) {
  const callbackRef = useRef(callback);

  // Update callback ref AFTER render, not during render
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handlePointer(event: PointerEvent) {
      const el = ref.current;
      if (!el) return;
      if (el.contains(event.target as Node)) return;
      callbackRef.current(event);
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callbackRef.current(event);
      }
    }

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [ref]);
}
