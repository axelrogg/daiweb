import user from "@/lib/database/entities/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { name, email, externalId, pictureUri } = (await request.json()) as {
        externalId?: string;
        email?: string;
        name?: string;
        pictureUri?: string;
    };

    if (!name || !email || !externalId || !pictureUri) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        const userId = await user.new(
            externalId,
            email,
            false,
            name,
            pictureUri
        );
        return NextResponse.json(
            { message: "User created successfully", userId: userId },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating a user", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
