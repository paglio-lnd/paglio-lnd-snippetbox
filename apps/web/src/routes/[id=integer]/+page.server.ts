import * as v from "valibot";
import { HTTP_UNPROCESSABLE_ENTITY } from "$lib/http-constants";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

const SnippetSchema = v.object({
	content: v.string(),
	created_at: v.pipe(v.string(), v.isoTimestamp()),
	expires_at: v.pipe(v.string(), v.isoTimestamp()),
	id: v.number(),
	title: v.string(),
});

export const load: PageServerLoad = async ({ fetch, params }) => {
	const id = params.id;

	const response = await fetch(`http://localhost:4000/snippets/${id}`);

	if (!response.ok) {
		error(response.status, response.statusText);
	}

	const parsedJson = v.safeParse(SnippetSchema, await response.json());

	if (!parsedJson.success) {
		error(HTTP_UNPROCESSABLE_ENTITY, "parsing failed");
	}

	return {
		snippet: parsedJson.output,
	};
};
