import user from "@/lib/database/entities/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { name, email, externalId, pictureUri } = (await request.json()) as {
        externalId?: string;
        email?: string;
        name?: string;
        pictureUri?: string;
    };

    const userParamsMissingFields = [];
    if (!name) {
        userParamsMissingFields.push(name);
    }

    if (!email) {
        userParamsMissingFields.push(email);
    }

    if (userParamsMissingFields.length > 0) {
        return NextResponse.json(
            {
                message: "Missing required fields",
                missingFields: userParamsMissingFields,
            },
            { status: 400 } // 400 Bad Request
        );
    }

    try {
        const userId = await user.new(
            externalId!,
            email!,
            false,
            name,
            pictureUri
        );
        return NextResponse.json(
            { message: "User created successfully", userId: userId },
            { status: 201 } // 200 Created
        );
    } catch (error: any) {
        console.error("Error creating a user", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 } // 500 Internal Server Error
        );
    }
}
