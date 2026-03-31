/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "astro:actions" {
	export class ActionError extends Error {
		type: string;
		code: string;
		status: number;
		constructor(params: { message?: string; code: string; stack?: string });
	}
	export type ActionInputError<T = any> = ActionError & {
		type: "AstroActionInputError";
		fields: Record<string, string[]>;
	};
	export function isInputError<T = any>(error?: unknown): error is ActionInputError<T>;
	export function isActionError(error?: unknown): error is ActionError;
}
