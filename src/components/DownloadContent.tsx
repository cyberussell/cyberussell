"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, AlertTriangle, Loader2 } from "lucide-react";

export default function DownloadContent() {
  const [state, setState] = useState<"loading" | "ready" | "expired">("loading");
  const [product, setProduct] = useState<{ title: string; file: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      setState("expired");
      return;
    }

    fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.title && data.file) {
          setProduct({ title: data.title, file: data.file });
          setState("ready");
        } else {
          setState("expired");
        }
      })
      .catch(() => setState("expired"));
  }, []);

  if (state === "loading") {
    return (
      <div className="text-center">
        <Loader2 size={32} className="text-[#FFD23F] animate-spin mx-auto mb-4" />
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70">
          Verifying your purchase...
        </p>
      </div>
    );
  }

  if (state === "expired") {
    return (
      <div className="text-center max-w-md">
        <AlertTriangle size={48} className="text-[#E8373A] mx-auto mb-4" />
        <h2 className="font-sans text-[24px] font-bold text-white mb-3">
          Link Expired or Invalid
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">
          This download link has expired or is invalid. If you already paid,
          please contact us and we&apos;ll send you the file.
        </p>
        <a
          href="/contact"
          className="bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[14px] font-bold px-6 py-3 rounded-[8px] hover:opacity-90 transition-all inline-block"
        >
          Contact Support
        </a>
      </div>
    );
  }

  return (
    <div className="text-center max-w-md">
      <CheckCircle2 size={48} className="text-[#00C97A] mx-auto mb-4" />
      <h2 className="font-sans text-[24px] font-bold text-white mb-3">
        Payment Successful!
      </h2>
      <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-2">
        Salamat sa purchase mo! Your download is ready:
      </p>
      <p className="font-sans text-[18px] font-bold text-[#FFD23F] mb-6">
        {product!.title}
      </p>
      <a
        href={product!.file}
        download
        className="bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[15px] font-extrabold px-8 py-4 rounded-[10px] hover:opacity-90 transition-all inline-flex items-center gap-2 shadow-lg shadow-[#00C97A]/20"
      >
        <Download size={18} strokeWidth={2.5} />
        Download Now
      </a>
      <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mt-4">
        This link expires in 24 hours. Download it now.
      </p>
    </div>
  );
}
