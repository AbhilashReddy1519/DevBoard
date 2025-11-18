import dotenv from "@dotenvx/dotenvx";
dotenv.config();

export const PORT = Number(process.env.PORT ?? 1000);
export const MONGODB_URL = process.env.MONGODB_URL ?? "";
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME ?? "devboard";
export const JWT_SECRET_KEY = process.env.JWT_SECRET ?? "dev-secret";
