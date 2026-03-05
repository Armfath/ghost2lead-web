import { AUTH_FIELDS, TOKEN_TYPE, type USER_TYPES } from "@/constants";

const { EMAIL, OTP, LEAD_ID, USER_TYPE, IS_NEW_USER, IS_ADMIN } = AUTH_FIELDS;
const { ACCESS_TOKEN } = TOKEN_TYPE;

declare global {
	type TUserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];

	type TVerifyOtpPayload = {
		[EMAIL]: string;
		[OTP]: string;
		[LEAD_ID]?: string | null;
	};

	interface UserRead extends EntityMetadata {
		[EMAIL]: string;
		[USER_TYPE]: TUserType;
		[LEAD_ID]: string | null;
	}

	interface TokenData {
		[ACCESS_TOKEN]: string;
		[IS_NEW_USER]: boolean;
		[IS_ADMIN]: boolean;
	}
}
