import user from "@/lib/database/entities/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { provider: string; externalId: string } }
) {
    if (params.provider !== "google" || !params.externalId) {
        return NextResponse.json(
            { error: "Invalid provider or missing externalId" },
            { status: 400 }
        );
    }
    try {
        const userId = await user.accountId(params.externalId);
        if (!userId) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            {
                userId: userId,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
