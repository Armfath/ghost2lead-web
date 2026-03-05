export const envConfig = {
	API_URL: process.env.NEXT_PUBLIC_API_URL as string,
	POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
	POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST as string,
	ENV: process.env.NODE_ENV,
};
