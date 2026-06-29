"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/mission-control/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/mission-control");
    } else {
      setError("Invalid password");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center px-6">
      <div className="w-full max-w-[360px]">
        <div className="mb-8 text-center">
          <h1 className="font-sans text-[24px] font-bold text-white mb-1">Mission Control</h1>
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40">Cyberussell Internal</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full bg-[#14141e] border border-white/[0.08] rounded-lg py-3 px-4 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-white/20 transition-colors font-[family-name:var(--font-inter)]"
          />
          {error && (
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#E8373A]">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] font-bold text-[14px] py-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
