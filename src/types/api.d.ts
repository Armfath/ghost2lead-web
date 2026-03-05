import type { ERROR_CODE, HTTP_STATUS_CODE } from "@/constants/api";

declare global {
	type TApiResponse<T = unknown> = T;

	type THttpStatusCode =
		(typeof HTTP_STATUS_CODE)[keyof typeof HTTP_STATUS_CODE];

	type TErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];

	interface ApiSuccess<T> {
		success: boolean;
		data: T;
	}

	interface ApiError {
		error: TErrorCode;
		message: string | Record<string, unknown>;
	}
}
