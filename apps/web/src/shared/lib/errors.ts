// reference: https://v5.chriskrycho.com/notes/a-reasonable-error-printing-utility-in-typescript/
function printError(error: unknown): string {
	if (!error || !(error instanceof Error)) {
		return "No Error";
	}

	let maybeCause: string | null = null;

	if (error.cause instanceof Error) {
		maybeCause = printError(error.cause);
	}

	if (error.cause) {
		maybeCause = error.cause.toString();
	}

	let cause = maybeCause ? `\n\tcaused by: ${maybeCause}` : "";
	return `${error.name}: ${error.message}${cause}`;
}

export { printError };
