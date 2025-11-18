// global.d.ts
// Place at project root under /src so TS finds it (make sure "include" in tsconfig contains "src/**/*.ts" and "src/**/*.d.ts")
import type { Request } from "express";

declare global {
	namespace Express {
		interface Request {
			/**
			 * Payload extracted from a verified JWT.
			 * - userId: required for auth flows that need a user identity
			 * - role: optional (admin | user | etc)
			 * - aud / iss / iat / exp may be present if included in the token
			 */
			payload?: {
				userId?: string;
				role?: string;
				iat?: number;
				exp?: number;
			};
		}
	}
}

export {}; // keep this file a module (avoids global-scope problems)
