"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GetQuotePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/contact");
  }, [router]);

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-12 w-12 border-4 border-[#0F2D52] border-t-cyan-400 rounded-full animate-spin mx-auto" />
        <p className="text-slate-600 font-bold text-sm">Redirecting to Contact & Inquiries...</p>
      </div>
    </div>
  );
}
