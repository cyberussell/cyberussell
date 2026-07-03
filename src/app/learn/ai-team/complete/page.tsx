"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Medal, ScrollText, Save, Rocket, Monitor, LayoutDashboard, Loader2, AlertCircle, User, Mail } from "lucide-react";

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (c: object) => { requestAccessToken: () => void };
        };
      };
    };
    FB?: { init: (c: object) => void; login: (cb: (r: { authResponse?: { accessToken: string; userID: string } }) => void, opts: object) => void };
    fbAsyncInit?: () => void;
  }
}

const BENEFITS = [
  { icon: Medal, color: "#FFD23F", text: "Earn your AI Team Bida Badge" },
  { icon: ScrollText, color: "#818CF8", text: "Receive your personalized certificate" },
  { icon: Save, color: "#34D399", text: "Save your learning progress forever" },
  { icon: Rocket, color: "#60A5FA", text: "Unlock Pillar 4" },
  { icon: Monitor, color: "#FB923C", text: "Continue learning across any device" },
  { icon: LayoutDashboard, color: "#F472B6", text: "View your personal learning dashboard" },
];

export default function CompletePage() {
  const [mode, setMode] = useState<"celebrate" | "signin">("celebrate");
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleReady, setGoogleReady] = useState(false);
  const [fbReady, setFbReady] = useState(false);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const fbAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

  useEffect(() => {
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (d.learner) window.location.href = "/learn/ai-team/assessment";
    });

    // Load Google Identity Services (oauth2 token client — opens a real popup)
    if (googleClientId) {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.onload = () => setGoogleReady(true);
      document.head.appendChild(s);
    }

    // Load Facebook SDK
    if (fbAppId) {
      window.fbAsyncInit = () => {
        window.FB?.init({ appId: fbAppId, cookie: true, xfbml: true, version: "v19.0" });
        setFbReady(true);
      };
      const s = document.createElement("script");
      s.src = "https://connect.facebook.net/en_US/sdk.js";
      document.head.appendChild(s);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function signInWithGoogle() {
    if (!googleReady || !window.google || !googleClientId) {
      setMode("signin");
      return;
    }
    setLoading(true);
    setError("");

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: googleClientId,
      scope: "email profile",
      callback: async (response: { access_token?: string; error?: string }) => {
        if (response.error || !response.access_token) {
          setError("Google sign-in was cancelled or failed.");
          setLoading(false);
          return;
        }
        try {
          // Get user info from Google
          const userRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: { Authorization: `Bearer ${response.access_token}` },
          });
          const googleUser = await userRes.json();

          const res = await fetch("/api/learner/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "google_token",
              name: googleUser.name,
              email: googleUser.email,
              avatar: googleUser.picture,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            window.location.href = "/learn/ai-team/assessment";
          } else {
            setError(data.error || "Sign-in failed. Please try again.");
            setLoading(false);
          }
        } catch {
          setError("Network error. Please try again.");
          setLoading(false);
        }
      },
    });

    tokenClient.requestAccessToken();
  }

  function signInWithFacebook() {
    if (!fbReady || !window.FB) { setMode("signin"); return; }
    window.FB.login(
      async (response) => {
        if (!response.authResponse) { setError("Facebook sign-in cancelled"); return; }
        setLoading(true); setError("");
        const res = await fetch("/api/learner/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "facebook", ...response.authResponse }),
        });
        const data = await res.json();
        if (res.ok) {
          window.location.href = "/learn/ai-team/assessment";
        } else {
          setError(data.error || "Facebook sign-in failed");
          setLoading(false);
        }
      },
      { scope: "email,public_profile" }
    );
  }

  async function handleEmailRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) { setError("Please fill in your name and email."); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/learner/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "register", name: form.name, email: form.email }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = "/learn/ai-team/assessment";
    } else {
      setError(data.error || "Registration failed");
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-[520px]">

          <div className="text-center mb-8">
            <div className="text-[56px] mb-4">🎉</div>
            <h1 className="font-sans text-[32px] md:text-[40px] font-bold text-white mb-3 leading-tight">
              Congratulations!
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/60 leading-relaxed">
              You have successfully completed<br />
              <span className="text-white font-semibold">Pillar 3: Meet Your AI Team.</span>
            </p>
          </div>

          <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl p-6 mb-6">
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-relaxed mb-5 text-center">
              You&rsquo;re one step away from earning your Cyberussell AI Team achievement.
              <br />
              <span className="text-white/90 font-medium">Take the final assessment to earn your AI Team Bida Badge and personalized certificate.</span>
            </p>

            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {BENEFITS.map(({ icon: Icon, color, text }) => (
                <div key={text} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <Icon size={16} style={{ color }} strokeWidth={1.8} className="shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/65 leading-tight">{text}</span>
                </div>
              ))}
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-red-400">{error}</p>
              </div>
            )}

            {mode === "celebrate" && (
              <div className="space-y-3">
                <button
                  onClick={signInWithGoogle}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl bg-white text-[#1a1a1a] font-[family-name:var(--font-inter)] text-[15px] font-bold hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin text-gray-600" /> : (
                    <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" /><path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" /><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" /><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" /></svg>
                  )}
                  Continue with Google
                </button>

                <button
                  onClick={fbAppId ? signInWithFacebook : () => setMode("signin")}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl bg-[#1877F2] text-white font-[family-name:var(--font-inter)] text-[15px] font-bold hover:bg-[#1877F2]/90 transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin text-white" /> : (
                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  )}
                  Continue with Facebook
                </button>

                <div className="text-center pt-1">
                  <button onClick={() => setMode("signin")} className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white/60 transition-colors">
                    Already have an account? <span className="text-[#FFD23F] font-medium">Sign In</span>
                  </button>
                </div>
              </div>
            )}

            {mode === "signin" && (
              <form onSubmit={handleEmailRegister} className="space-y-3">
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-[#0e0e18] border border-white/[0.08] rounded-xl py-3 pl-10 pr-4 text-white text-[15px] placeholder-white/20 focus:outline-none focus:border-white/20 font-[family-name:var(--font-inter)]"
                  />
                </div>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-[#0e0e18] border border-white/[0.08] rounded-xl py-3 pl-10 pr-4 text-white text-[15px] placeholder-white/20 focus:outline-none focus:border-white/20 font-[family-name:var(--font-inter)]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#22C55E] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold hover:bg-[#22C55E]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 size={15} className="animate-spin" /> Creating account...</> : "Create Free Account & Continue"}
                </button>
                <div className="flex gap-3 justify-center pt-1">
                  {googleClientId && (
                    <button type="button" onClick={signInWithGoogle} disabled={loading} className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/50 transition-colors">
                      Use Google instead
                    </button>
                  )}
                  <button type="button" onClick={() => setMode("celebrate")} className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/50 transition-colors">
                    ← Back
                  </button>
                </div>
              </form>
            )}

            <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 text-center mt-4 leading-relaxed">
              By continuing, you agree to the{" "}
              <a href="/terms" className="text-white/40 hover:text-white/60 underline">Terms of Service</a>{" "}
              and{" "}
              <a href="/privacy" className="text-white/40 hover:text-white/60 underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
