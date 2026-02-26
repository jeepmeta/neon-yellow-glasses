import { useEffect, useLayoutEffect, useRef } from "react";

export function useOutsideClickWithScroll(
  ref: React.RefObject<HTMLElement | null>,
  callback: (event: Event) => void,
) {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handlePointer(event: PointerEvent) {
      const el = ref.current;
      if (!el) return;

      const singularity =
        document.querySelector("[data-singularity]") ||
        document.querySelector(".singularity-wrapper");
      if (singularity && singularity.contains(event.target as Node)) {
        return;
      }

      if (el.contains(event.target as Node)) return;

      callbackRef.current(event);
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callbackRef.current(event);
      }
    }

    function handleScroll(event: Event) {
      callbackRef.current(event);
    }

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);
}
