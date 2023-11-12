export async function request(query: string) {
	const res = await fetch("https://graphql.datocms.com/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${import.meta.env.DATOCMS_READ_ONLY_TOKEN}`,
			"X-Include-Drafts": import.meta.env.DEV.toString(),
		},
		body: JSON.stringify({
			query,
		}),
	});

	const data = await res.json();

	return data.data;
}
