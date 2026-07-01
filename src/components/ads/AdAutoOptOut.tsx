"use client";

import { useEffect } from "react";

/**
 * Drop this component anywhere on a "manual" page to signal to the AdSense
 * runtime that Auto Ads should not inject extra units on this page.
 *
 * This uses Google's page-level parameter override. For belt-and-suspenders
 * protection also exclude the URL in AdSense dashboard:
 *   Auto ads → Manage → URL groups → Add exclusion.
 */
export default function AdAutoOptOut() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    if (!publisherId) return;
    try {
      // Pushing an explicit config with enable_page_level_ads: false tells the
      // AdSense loader not to inject automatic placements on this page.
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle).push({
        google_ad_client: publisherId,
        enable_page_level_ads: false,
      });
    } catch {
      // non-fatal
    }
  }, [publisherId]);

  return null;
}
