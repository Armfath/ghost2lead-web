import type { Metadata } from "next";
import Link from "next/link";
import { OTPForm, ResendOtpButton } from "@/components/features/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_FIELDS } from "@/constants/auth";

const { EMAIL } = AUTH_FIELDS;

export const metadata: Metadata = {
  title: "Verify code — Ghost2Lead",
  description: "Enter the 6-digit code we sent to your email.",
};

interface VerifyOTPPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VerifyOTPPage({
  searchParams,
}: VerifyOTPPageProps) {
  const params = await searchParams;
  const email = Array.isArray(params[EMAIL])
    ? params[EMAIL][0]
    : params[EMAIL] ?? null;

  return (
    <>
      <h1 className="font-serif text-heading-sm tracking-tight mb-2.5 text-[var(--g-black)]">
        Check your email
      </h1>
      <Input
        type="email"
        value={email ?? ""}
        readOnly
        className="w-full h-11 bg-[var(--g-gray-100)] rounded-full border-none mb-4"
      />
      <p className="text-sm text-[var(--g-gray-600)] mb-4">
        We sent you a 6-digit login code. Enter it below.
      </p>
      <OTPForm email={email} />
      <div className="text-center my-4">
        <ResendOtpButton email={email} />
      </div>
      <Button
        type="submit"
        form="otp-form"
        size="pill-lg"
        rounded="pill"
        className="w-full"
      >
        Verify Code
      </Button>
      <Link
        href="/auth"
        className="mt-5 inline-block text-xs text-[var(--g-gray-400)] hover:text-[var(--g-black)] transition-colors"
      >
        ← Back to login
      </Link>
    </>
  );
}
