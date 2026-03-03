import { useEffect, useState } from "react";
import { useCountDown } from "./use-count-down";

type UseSendOtpOptions<T> = {
	initialCount?: number;
	defaultCounter?: number;
	sendOtpFn: (data: T) => Promise<void>;
};

export function useSendOtp<T>({
	initialCount = 0,
	defaultCounter = 30,
	sendOtpFn,
}: UseSendOtpOptions<T>) {
	const { counter, setCounter, setStartCountdown } = useCountDown(initialCount);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (initialCount > 0) setStartCountdown(true);
	}, [initialCount, setStartCountdown]);

	const resendOtp = async (data: T) => {
		if (counter > 0) throw new Error("Counter is not 0");
		setLoading(true);
		try {
			await sendOtpFn(data);
			setCounter(defaultCounter);
			setStartCountdown(true);
		} catch (error: unknown) {
			if (error) throw error;
		} finally {
			setLoading(false);
		}
	};

	return {
		counter,
		setCounter,
		setStartCountdown,
		loading,
		setLoading,
		resendOtp,
	};
}
