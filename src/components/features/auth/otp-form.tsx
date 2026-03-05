"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { PAGES_URLS } from "@/config/pages";
import { ANALYTICS_EVENTS, STORAGE_KEYS } from "@/constants";
import { AUTH_FIELDS, TOKEN_TYPE } from "@/constants/auth";
import { logger } from "@/lib/logger";
import { storage } from "@/lib/storage";
import { type OtpFormData, otpSchema } from "@/schemas/auth-schema";
import { trackEventWithLead } from "@/services/analytics-service";
import { verifyOtp } from "@/services/auth-service";

const { LEAD_ID_KEY, ACCESS_TOKEN_KEY } = STORAGE_KEYS;
const { EMAIL, OTP, LEAD_ID, IS_NEW_USER } = AUTH_FIELDS;
const { ACCESS_TOKEN } = TOKEN_TYPE;
const { USER_DASHBOARD } = PAGES_URLS;

interface OTPFormProps {
	email: string | null;
}

export function OTPForm({ email }: OTPFormProps) {
	const router = useRouter();
	const submitButtonRef = useRef<HTMLButtonElement>(null);
	const otpInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		otpInputRef.current?.focus();
	}, []);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<OtpFormData>({
		resolver: zodResolver(otpSchema),
		defaultValues: { [OTP]: "" },
	});

	const ILeadId = storage.getItem(LEAD_ID_KEY);

	const handleVerifyOtp = async (data: OtpFormData) => {
		if (!email) {
			toast.error("Email is required");
			return;
		}

		try {
			const storedLeadId = storage.getItem(LEAD_ID_KEY);

			const payload: TVerifyOtpPayload = {
				[EMAIL]: email,
				[OTP]: data[OTP],
				[LEAD_ID]: storedLeadId,
			};

			const response = await verifyOtp(payload);

			storage.setItem(ACCESS_TOKEN_KEY, response[ACCESS_TOKEN]);

			if (response[IS_NEW_USER]) {
				trackEventWithLead(ANALYTICS_EVENTS.SIGNED_UP);
			}

			toast.success("Code verified");
			router.push(USER_DASHBOARD);
		} catch (error) {
			logger.error("AUTH_OTP_VERIFY_ERROR", error);
			toast.error("Invalid code. Please try again.");
		}
	};

	return (
		<form
			id="otp-form"
			onSubmit={handleSubmit(handleVerifyOtp)}
			className="space-y-4"
		>
			{ILeadId && (
				<p className="text-sm text-[var(--g-gray-600)] mb-4">
					Your lead ID is {ILeadId}
				</p>
			)}
			<div className="flex flex-col items-center space-y-2">
				<Controller
					name={OTP}
					control={control}
					render={({ field }) => (
						<InputOTP
							ref={otpInputRef}
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
			<button
				ref={submitButtonRef}
				type="submit"
				className="hidden"
				disabled={isSubmitting}
			/>
		</form>
	);
}
