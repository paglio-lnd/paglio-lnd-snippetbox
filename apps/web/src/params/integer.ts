import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param: string): boolean => /^[0-9]+$/.test(param)) satisfies ParamMatcher;
