import { useEffect, useState } from "react";

export function useCountDown(initialCount: number) {
	const [counter, setCounter] = useState(initialCount);
	const [startCountdown, setStartCountdown] = useState(false);

	useEffect(() => {
		if (!startCountdown || counter <= 0) return;
		const timer = setTimeout(() => {
			setCounter((prev) => {
				const next = prev - 1;
				if (next === 0) setStartCountdown(false);
				return next;
			});
		}, 1000);
		return () => clearTimeout(timer);
	}, [startCountdown, counter]);

	return { counter, setCounter, setStartCountdown };
}
