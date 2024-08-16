import { EnvironmentSecrets } from "@/types";

const {
    AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET,
    AUTH_SECRET,
    DATABASE_CONNECTION_STR,
} = process.env as any as EnvironmentSecrets;

export default {
    AUTH_GOOGLE_ID: AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: AUTH_GOOGLE_SECRET,
    AUTH_SECRET: AUTH_SECRET,
    DATABASE_CONNECTION_STR: DATABASE_CONNECTION_STR,
} as EnvironmentSecrets;
