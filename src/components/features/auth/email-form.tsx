"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAGES_URLS } from "@/config/pages";
import { AUTH_FIELDS } from "@/constants/auth";
import { logger } from "@/lib/logger";
import { type EmailFormData, emailSchema } from "@/schemas/auth-schema";
import { requestOtp } from "@/services/auth-service";

const { EMAIL } = AUTH_FIELDS;
const { VERIFY_OTP } = PAGES_URLS;

export function EmailForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<EmailFormData>({
		resolver: zodResolver(emailSchema),
	});

	const handleRequestCode = async (data: EmailFormData) => {
		try {
			await requestOtp(data[EMAIL]);
			const email = getValues(EMAIL);
			router.push(`${VERIFY_OTP}?${EMAIL}=${encodeURIComponent(email)}`);
		} catch (error) {
			logger.error(error);
			toast.error("Unable to send confirmation code. Please try again.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(handleRequestCode)}
			className="w-full space-y-3"
		>
			<div>
				<Input
					type="email"
					placeholder="Email"
					className="w-full h-11 rounded-full bg-[var(--g-gray-100)] border-none px-[18px] text-sm"
					aria-invalid={errors[EMAIL] ? "true" : "false"}
					{...register(EMAIL)}
				/>
				{errors[EMAIL] && (
					<p className="mt-1 text-xs text-destructive" role="alert">
						{errors[EMAIL].message}
					</p>
				)}
			</div>

			<Button
				type="submit"
				size="pill-lg"
				rounded="pill"
				className="w-full"
				disabled={isSubmitting}
			>
				{isSubmitting ? "Sending..." : "Get Confirmation Code"}
			</Button>
		</form>
	);
}
