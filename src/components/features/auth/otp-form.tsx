"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { type OtpFormData, otpSchema } from "@/schemas/auth-schema";

interface OTPFormProps {
	email: string | null;
}

export function OTPForm({ email }: OTPFormProps) {
	const router = useRouter();
	const submitButtonRef = useRef<HTMLButtonElement>(null);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<OtpFormData>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: "" },
	});

	const onSubmit = async (_data: OtpFormData) => {
		if (!email) return;
		toast.success("Code verified");
		router.push("/auth");
	};

	return (
		<form id="otp-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="flex flex-col items-center space-y-2">
				<Controller
					name="otp"
					control={control}
					render={({ field }) => (
						<InputOTP
							maxLength={6}
							pattern={REGEXP_ONLY_DIGITS}
							value={field.value}
							onChange={(value) => {
								field.onChange(value);
								if (value?.length === 6) submitButtonRef.current?.click();
							}}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
							</InputOTPGroup>
							<InputOTPSeparator />
							<InputOTPGroup>
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					)}
				/>
				{errors.otp && (
					<p className="text-sm text-destructive" role="alert">
						{errors.otp.message}
					</p>
				)}
			</div>
			<button ref={submitButtonRef} type="submit" className="hidden" />
		</form>
	);
}
