import pino, { Logger } from "pino";
import envSecrets from "@/lib/environment";

export const logger: Logger =
    envSecrets.NODE_ENV === "production"
        ? // JSON in production
          pino({ level: "warn" })
        : // Pretty print in development
          pino({ level: "debug" });
