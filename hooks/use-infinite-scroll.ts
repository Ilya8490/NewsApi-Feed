"use client";

import { useEffect, useRef } from "react";

export function useInfiniteScroll(onIntersect: () => void, enabled = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, onIntersect]);

  return ref;
}
