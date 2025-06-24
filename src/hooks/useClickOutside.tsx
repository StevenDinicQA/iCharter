import { LegacyRef, useEffect, useRef } from "react";

// We’re using a default function declaration because it seems
// that typescript can’t handle the generic’s default type scenario
// properly.

/**
 * This hook allows you to detect clicks outside a specific HTML element,
 * and triggers a callback when such a click is detected.
 * @param callback A function to run when a click outside the element is detected
 * @returns A React reference object that should be applied to the target element
 */
export function useClickOutside<T extends HTMLElement = any>(
  callback: (event: MouseEvent) => void
): LegacyRef<T> | undefined {
  const ref = useRef<T>(null);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (ref.current?.contains(event.target as Node)) {
        return;
      }

      callback(event);
    };

    document.addEventListener("click", clickOutsideHandler);

    // We should remove the event listener when the component
    // that is using this hook unmounts.
    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
