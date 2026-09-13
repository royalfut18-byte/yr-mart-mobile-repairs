"use client";

import { useEffect, useState } from "react";
import { getOpenState, type OpenState } from "@/lib/hours";

/**
 * Live "Open now / Closed" badge. Renders a neutral placeholder on the server so
 * the markup matches, then fills in from the visitor's clock on mount and keeps
 * itself honest with a one-minute tick.
 */
export function OpenPill({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const isOpen = state?.isOpen ?? false;
  const dot = isOpen ? "bg-emerald-400" : "bg-amber-brand";

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 backdrop-blur ${
        compact ? "px-3 py-1.5" : "w-full justify-center px-4 py-3"
      }`}
      suppressHydrationWarning
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className={`absolute inline-flex h-full w-full rounded-full ${dot} animate-pulse-ring`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      <span className={`font-semibold ${compact ? "text-xs" : "text-sm"} text-white`}>
        {state ? state.label : "Opening hours"}
      </span>
      <span className={`${compact ? "text-xs" : "text-sm"} text-white/50`}>
        {state ? state.detail : "10am daily"}
      </span>
    </div>
  );
}
