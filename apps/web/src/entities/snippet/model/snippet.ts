import * as v from "valibot";

const SnippetSchema = v.object({
	content: v.string(),
	created_at: v.pipe(v.string(), v.isoTimestamp()),
	expires_at: v.pipe(v.string(), v.isoTimestamp()),
	id: v.number(),
	title: v.string(),
});

export type Snippet = v.InferOutput<typeof SnippetSchema>;

export function snippetValidator(input: unknown): Snippet {
	try {
		const parsedInput = v.parse(SnippetSchema, input);
		return parsedInput;
	} catch (error) {
		throw new Error("Failed to validate input", { cause: error });
	}
}

export function snippetsValidator(input: unknown): Snippet[] {
	try {
		const parsedInput = v.parse(v.array(SnippetSchema), input);
		return parsedInput;
	} catch (error) {
		throw new Error("Failed to validate input", { cause: error });
	}
}
