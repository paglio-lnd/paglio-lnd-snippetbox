function formatDate(
	date: string | Date | undefined,
	options: {
		dateStyle: Intl.DateTimeFormatOptions["dateStyle"];
		locale: string;
	} = {
		dateStyle: "medium",
		locale: "de",
	},
): string {
	if (!date) {
		return "";
	}

	const formatter = new Intl.DateTimeFormat(options.locale, {
		dateStyle: options.dateStyle,
	});

	if (typeof date === "string") {
		return formatter.format(new Date(date));
	}

	return formatter.format(date);
}

export { formatDate };
