import api from "$shared/api/base";
import { isHTTPError, type Options } from "ky";
import { error } from "@sveltejs/kit";
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
	} catch (err) {
		if (isHTTPError(err)) {
			console.error(printError(err));
			error(err.response.status, err.response.statusText);
		}
		console.error(printError(err));
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
