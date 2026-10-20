"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mledu-progress-v1";

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch {
      // Progress remains available for this session if storage is unavailable.
    }
    setLoaded(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setCompleted((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCompleted([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return { completed, loaded, toggle, reset };
}
