import { z } from "zod";

export const emailSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

export type EmailFormData = z.infer<typeof emailSchema>;

export const otpSchema = z.object({
	otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export type OtpFormData = z.infer<typeof otpSchema>;
