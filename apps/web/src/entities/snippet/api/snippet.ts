import api from "$shared/api/base";
import { type Options } from "ky";
import { snippetsValidator, snippetValidator, type Snippet } from "../model/snippet";
import { printError } from "$shared/lib/errors";

async function getSnippets(opts?: Options): Promise<Snippet[]> {
	try {
		const response = await api.get("", opts).json();

		const validatedResponse = snippetsValidator(response);

		return validatedResponse;
	} catch (error) {
		console.error(printError(error));
		return [];
	}
}

async function getSnippet(id: number, opts?: Options): Promise<Snippet> {
	try {
		const response = await api.get(`snippets/${id}`, opts).json();

		const validatedResponse = snippetValidator(response);

		return validatedResponse;
	} catch (error) {
		// TODO: If error is due to 404, should re-throw error, so that SvelteKit can render a 404 page; e.g., when trying to get `snippets/4`
		console.error(printError(error));
		return {
			id: -9999,
			title: "Something went wrong",
			content: "Something went wrong",
			created_at: "9999-99-99",
			expires_at: "9999-99-99",
		};
	}
}

export { getSnippets, getSnippet };
