export async function apiGET(url: string, headers = {}) {
	try {
		const data = await fetch(url, {
			method: "GET",
			headers: headers,
		});

		return await data.json();
	} catch (err) {
		console.error("apiGET error:", err);
	}
}
