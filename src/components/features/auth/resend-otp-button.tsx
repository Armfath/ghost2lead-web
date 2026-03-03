"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSendOtp } from "@/hooks/use-send-otp";

interface ResendOtpButtonProps {
	email: string | null;
}

export function ResendOtpButton({ email }: ResendOtpButtonProps) {
	const { counter, loading, resendOtp } = useSendOtp({
		initialCount: 30,
		defaultCounter: 30,
		sendOtpFn: async () => Promise.resolve(),
	});

	const handleResend = async () => {
		if (!email) {
			toast.error("Email is required");
			return;
		}
		try {
			await resendOtp(email);
			toast.success("Code resent successfully");
		} catch (error) {
			const err = error as Error;
			if (err.message === "Counter is not 0") {
				toast.error("Please wait before requesting a new code");
			} else {
				toast.error(err.message || "Failed to resend code");
			}
		}
	};

	const isResendDisabled = counter > 0 || loading || !email;

	return (
		<Button
			variant="link"
			className="text-sm text-[var(--g-accent)] underline hover:text-[var(--g-accent-mid)] disabled:no-underline disabled:text-[var(--g-gray-400)]"
			onClick={handleResend}
			disabled={isResendDisabled}
		>
			{counter > 0 ? `Resend code in ${counter}s` : "Resend code"}
		</Button>
	);
}
