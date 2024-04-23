import { useState, useCallback } from "react";

export const useHttp = () => {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url) => {
		setLoaded(false);
		try {
			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(`Could not fetch ${url}, status: ${res.status}`)
			}

			const data = await res.json();

			setLoaded(true);
			return data

		} catch (e) {
			setLoaded(true);
			setError(e.message);
			throw e
		}
	}, [])

	const clearError = () => setError(null)

	return { loaded, error, request, clearError }
}