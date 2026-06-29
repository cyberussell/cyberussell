"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/mission-control/auth")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.replace("/mission-control/login");
        else setChecked(true);
      });
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
