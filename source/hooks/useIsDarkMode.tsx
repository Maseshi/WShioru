import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useIsDarkMode() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
