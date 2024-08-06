import postgres from "postgres";
import envSecrets from "@/lib/environment";

const connectionString = envSecrets.server.DATABASE_CONNECTION_STR;
const sql = postgres(connectionString);

export default sql;
