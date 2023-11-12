export async function request(query: string) {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${import.meta.env.DATOCMS_READ_ONLY_TOKEN}`,
	};

	if (import.meta.env.DEV) {
		headers["X-Include-Drafts"] = "true";
	}

	const res = await fetch("https://graphql.datocms.com/", {
		method: "POST",
		headers,
		body: JSON.stringify({
			query,
		}),
	});

	const data = await res.json();

	return data.data;
}
