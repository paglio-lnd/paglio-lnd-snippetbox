import type { PageServerLoad } from "./$types";
import { getSnippets } from "$entities/snippet/api/snippet";

export const load: PageServerLoad = async ({ fetch }) => {
	const snippets = await getSnippets({ fetch });

	return {
		snippets,
	};
};
