"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Base AdSense unit. Renders only after client mount to prevent hydration
 * mismatches. Guards against double-push during App Router navigations.
 *
 * Usage: prefer the named variant wrappers (AdBanner, AdRectangle, etc.)
 * exported from @/components/ads/index.ts.
 */
export default function AdSense({
  adSlot,
  adFormat = "auto",
  responsive = true,
  className = "",
  style,
}: AdSenseProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const pushed = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !publisherId || pushed.current) return;
    try {
      pushed.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // non-fatal; ad blocker or AdSense not yet loaded
    }
    return () => {
      // reset on unmount so a remounted slot can re-push
      pushed.current = false;
    };
  }, [mounted, publisherId]);

  if (!publisherId || !mounted) {
    // reserve space to prevent layout shift; matches typical ad heights
    return (
      <div
        className={className}
        style={{ minHeight: style?.height ?? 90, ...style }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
