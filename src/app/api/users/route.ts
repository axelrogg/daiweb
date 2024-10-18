import user from "@/lib/database/entities/user";
import { logger } from "@/lib/logging/logger";
import { NextRequest, NextResponse } from "next/server";

const log = logger.child({ module: "/api/users/" });

export async function POST(request: NextRequest) {
    log.debug(
        {
            requestId: request.headers.get("x-request-id") || null,
            method: request.method,
        },
        "Incoming POST request to create a user"
    );

    const { name, email, externalId, pictureUri } = (await request.json()) as {
        externalId?: string | undefined | null;
        email?: string | undefined | null;
        name?: string | undefined | null;
        pictureUri?: string | undefined | null;
    };

    const userParamsMissingFields: string[] = [];
    if (!name) {
        userParamsMissingFields.push("name");
    }

    if (!email) {
        userParamsMissingFields.push("email");
    }

    if (userParamsMissingFields.length > 0) {
        log.warn(
            {
                requestId: request.headers.get("x-request-id") || null,
                externalId,
                email,
                name,
                pictureUri,
                userParamsMissingFields,
            },
            "User creation request is missing required fields"
        );

        return NextResponse.json(
            {
                message: "Missing required fields",
                missingFields: userParamsMissingFields,
            },
            { status: 400 } // 400 Bad Request
        );
    }

    const emailDomain = email!.split("@");

    try {
        const userId = await user.new(
            externalId!,
            email!,
            true
                ? emailDomain[1] === "dai.uvigo.gal" ||
                      emailDomain[1] === "dai.uvigo.es"
                : false,
            name,
            pictureUri
        );
        log.info(
            {
                requestId: request.headers.get("x-request-id") || null,
                userId,
                externalId,
                email,
                name,
                pictureUri,
            },
            "New user was created successfully"
        );
        return NextResponse.json(
            { message: "User created successfully", userId: userId },
            { status: 201 } // 200 Created
        );
    } catch (error: any) {
        log.error(
            {
                requestDetails: request.headers.get("x-request-id") || null,
                error: error.message,
                stack: error.stack,
            },
            "Error occurred while creating a new user"
        );
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 } // 500 Internal Server Error
        );
    }
}
