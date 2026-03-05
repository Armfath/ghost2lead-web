import { envConfig } from "@/config";
import { TOKEN_TYPE } from "@/constants/auth";
import { storage } from "./storage";

const { getItem } = storage;

interface RequestOptions extends RequestInit {
	timeout?: number;
	searchParams?: Record<string, string | undefined>;
	cookies?: ServerCookies;
}

interface FetchResponse<T> {
	data: T;
	status: number;
	statusText: string;
}

async function fetchWithOptions<T>(
	url: string,
	options: RequestOptions,
): Promise<FetchResponse<T>> {
	const { timeout = 0 } = options;
	const response = await fetch(url, {
		...options,
		credentials: "include",
		signal: timeout === 0 ? undefined : AbortSignal.timeout(timeout),
	});

	const responseData = await response.json();

	if (!response.ok) {
		throw responseData;
	}

	return {
		data: responseData,
		status: response.status,
		statusText: response.statusText,
	};
}

async function request<T>(
	path: string,
	options: RequestOptions,
	accessToken?: string | null,
): Promise<TApiResponse<T>> {
	const token =
		accessToken ?? getItem(TOKEN_TYPE.ACCESS_TOKEN, options.cookies);
	if (token) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${token}`,
		};
	}

	const { data } = await fetchWithOptions<T>(
		`${envConfig.API_URL}${path}`,
		options,
	);

	return data as TApiResponse<T>;
}

export async function get<T>(
	path: string,
	options?: {
		params?: RequestOptions;
		timeout?: number;
		accessToken?: string | null;
		cookies?: ServerCookies;
	},
): Promise<TApiResponse<T>> {
	const urlParams = new URLSearchParams(
		Object.fromEntries(
			Object.entries(options?.params?.searchParams ?? {}).filter(
				([, value]) => value !== undefined,
			),
		) as Record<string, string>,
	).toString();
	const url = urlParams ? `${path}?${urlParams}` : path;
	return request<T>(
		url,
		{
			method: "GET",
			timeout: options?.timeout,
			cookies: options?.cookies,
			...(options?.params ?? {}),
		},
		options?.accessToken,
	);
}

export async function post<T>(
	path: string,
	body: unknown,
	options?: {
		config?: RequestOptions;
		params?: RequestOptions;
		cookies?: ServerCookies;
	},
): Promise<TApiResponse<T>> {
	const isFormData = body instanceof FormData;

	return request<T>(path, {
		method: "POST",
		body: isFormData ? body : JSON.stringify(body),
		headers: isFormData ? undefined : { "Content-Type": "application/json" },
		cookies: options?.cookies,
		...options?.config,
	});
}

export async function patch<T>(
	path: string,
	body: unknown,
	options?: {
		config?: RequestOptions;
		cookies?: ServerCookies;
	},
): Promise<TApiResponse<T>> {
	const isFormData = body instanceof FormData;
	return request<T>(path, {
		method: "PATCH",
		body: isFormData ? body : JSON.stringify(body),
		headers: isFormData ? undefined : { "Content-Type": "application/json" },
		cookies: options?.cookies,
		...options?.config,
	});
}

export async function del<T>(
	path: string,
	config?: RequestOptions,
): Promise<TApiResponse<T>> {
	return request<T>(path, {
		method: "DELETE",
		...config,
	});
}
