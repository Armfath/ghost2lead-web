import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Log in — Ghost2Lead",
  description: "Log in or sign up to Ghost2Lead. It's free.",
};

export default function AuthPage() {
  return (
    <>
      <h1 className="font-serif text-heading-sm tracking-tight mb-2.5 text-[var(--g-black)]">
        Welcome to Ghost2Lead
      </h1>
      <p className="text-sm text-[var(--g-gray-400)] mb-8">
        Log in or{" "}
        <span className="text-[var(--g-accent)] font-medium cursor-pointer">
          sign up
        </span>
        {" — it's free"}
      </p>

      <input
        type="email"
        placeholder="Email"
        className="w-full py-3.5 px-[18px] rounded-full border-none bg-[var(--g-gray-100)] font-sans text-sm text-[var(--g-black)] outline-none mb-4 transition-all focus:bg-[var(--g-gray-50)] focus:shadow-[0_0_0_2px_var(--g-accent-mid)] placeholder:text-[var(--g-gray-400)]"
      />

      <Button type="button" size="pill-lg" rounded="pill" className="w-full">
        Get Confirmation Code
      </Button>

      <Link
        href="/"
        className="mt-5 inline-block text-xs text-[var(--g-gray-400)] hover:text-[var(--g-black)] transition-colors"
      >
        {"← Back to home"}
      </Link>
    </>
  );
}
