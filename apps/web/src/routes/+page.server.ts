import * as v from "valibot";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

const SnippetSchema = v.object({
	content: v.string(),
	created_at: v.pipe(v.string(), v.isoTimestamp()),
	expires_at: v.pipe(v.string(), v.isoTimestamp()),
	id: v.number(),
	title: v.string(),
});

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch("http://localhost:4000");

	if (!response.ok) {
		error(response.status, response.statusText);
	}

	const parsedJson = v.safeParse(v.array(SnippetSchema), await response.json());

	if (!parsedJson.success) {
		return {
			snippets: [],
		};
	}

	return {
		snippets: parsedJson.output,
	};
};
