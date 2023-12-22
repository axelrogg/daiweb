"use server";

import { Database } from "@/server/database";

export async function GetBorrowedItems({ userId }: { userId: string }) {
    const db = new Database();
}
