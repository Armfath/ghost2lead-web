import type { ReactNode } from "react";
import { Logo } from "@/components/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F0EEE9_0%,var(--g-white)_50%)] grid place-items-center relative overflow-hidden">
      <div className="dot-bg absolute inset-0 opacity-60" />
      <div className="relative z-10 bg-[var(--g-white)] border border-[var(--g-gray-200)] rounded-[var(--r-xl)] py-[52px] px-12 w-[min(440px,calc(100vw-48px))] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_20px_60px_rgba(0,0,0,0.08)] text-center">
        <div className="absolute -inset-px rounded-[calc(var(--r-xl)+1px)] bg-[linear-gradient(135deg,var(--g-accent-mid)_0%,transparent_40%)] -z-10 opacity-40" />
        <div className="flex justify-center mb-6">
          <Logo width={48} height={48} className="w-12 h-12" />
        </div>
        {children}
      </div>
    </div>
  );
}
