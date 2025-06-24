"use client";

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Generic Modal component that let the user pass their own logic
 * @returns
 */
export function Modal({
  isVisible,
  onOutsideClick,
  transparent,
  children,
  ...props
}: any) {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const componentProps = {
    className:
      "w-full max-w-[800px] h-auto max-h-[60vh] bg-white rounded-[12px] shadow-lg",
    ...props,
  };

  const handleClickOutside: MouseEventHandler<HTMLDivElement> = (event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onOutsideClick?.();
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted &&
    isVisible &&
    createPortal(
      <div
        onClick={handleClickOutside}
        className={`w-full h-screen ${
          !transparent && "bg-black/25 backdrop-blur-[2px]"
        } grid place-items-center fixed top-0 left-0 z-[9999]`}
      >
        <section {...componentProps} ref={ref}>
          {children}
        </section>
      </div>,
      document.body
    )
  );
}
