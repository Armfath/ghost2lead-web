import { API_ENDPOINTS } from "@/config";
import { get, post } from "@/lib/fetch";

const { GET_USER_PROFILE, REQUEST_OTP, VERIFY_OTP } = API_ENDPOINTS.AUTH;

export async function getUserProfile(): Promise<UserRead> {
	return get<UserRead>(GET_USER_PROFILE);
}

export async function getServerUserProfile(
	cookies: ServerCookies,
): Promise<UserRead> {
	return get<UserRead>(GET_USER_PROFILE, { cookies });
}

export async function requestOtp(email: string): Promise<string> {
	return post<string>(REQUEST_OTP, { email });
}

export async function verifyOtp(payload: {
	email: string;
	otp: string;
	lead_id?: string | null;
}): Promise<TokenData> {
	return post<TokenData>(VERIFY_OTP, payload);
}
