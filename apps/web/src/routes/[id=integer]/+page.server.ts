import type { PageServerLoad } from "./$types";
import { getSnippet } from "$entities/snippet/api/snippet";

export const load: PageServerLoad = async ({ fetch, params }) => {
	const id = Number(params.id);

	const snippet = await getSnippet(id, { fetch });

	return {
		snippet,
	};
};
