"use client";
import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const getBreakpoint = (width: number): Breakpoint => {
  if (width <= 320) return "xs";
  if (width <= 550) return "sm";
  if (width <= 780) return "md";
  if (width <= 1440) return "lg";
  return "xl";
};

/**
 * useBreakpoint()
 * Returns the current breakpoint label, screen dimensions, and helpers (both exact and max-*)
 */
export function useBreakpoint() {
  const getSize = () => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1440,
    height: typeof window !== "undefined" ? window.innerHeight : 900,
  });

  const [size, setSize] = useState(getSize());
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(
    getBreakpoint(size.width)
  );

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setSize({ width: innerWidth, height: innerHeight });
      setBreakpoint(getBreakpoint(innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isXs = breakpoint === "xs";
  const isSm = breakpoint === "sm";
  const isMd = breakpoint === "md";
  const isLg = breakpoint === "lg";
  const isXl = breakpoint === "xl";

  // Derived “max” states
  const isMaxSm = isXs || isSm;
  const isMaxMd = isXs || isSm || isMd;
  const isMaxLg = isXs || isSm || isMd || isLg;

  return {
    breakpoint,
    width: size.width,
    height: size.height,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMaxSm,
    isMaxMd,
    isMaxLg,
  };
}
