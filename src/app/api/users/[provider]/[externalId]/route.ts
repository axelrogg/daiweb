import user from "@/lib/database/entities/user";
import { logger } from "@/lib/logging/logger";
import { NextRequest, NextResponse } from "next/server";

const log = logger.child({ module: "/api/users/[provider]/[externalId]" });

export async function GET(
    request: NextRequest,
    { params }: { params: { provider: string; externalId: string } }
) {
    log.debug(
        {
            requestId: request.headers.get("x-request-id") || null,
            method: request.method,
            params,
        },
        "Incoming GET request to fetch user id"
    );

    const { provider, externalId } = params;

    if (!provider || !externalId) {
        log.warn(
            { requestId: request.headers.get("x-request-id") || null, params },
            "Bad request: Missing provider or externalId parameters"
        );
        return NextResponse.json(
            { error: "Missing provider or externalId params" },
            { status: 400 } // 400 Bad Request
        );
    }

    if (provider !== "google") {
        log.warn(
            {
                requestId: request.headers.get("x-request-id") || null,
                provider,
            },
            "Bad request: Unsupported provider"
        );
        return NextResponse.json(
            { error: "Unsupported provider" },
            { status: 400 } // 400 Bad Request
        );
    }

    try {
        const userId = await user.accountId(externalId);
        log.info(
            {
                requestId: request.headers.get("x-request-id") || null,
                externalId,
            },
            "User not found for the given externalId"
        );
        if (!userId) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 } // 404 Not Found
            );
        }
        log.info(
            {
                requestId: request.headers.get("x-request-id") || null,
                userId,
                externalId,
            },
            "User found successfully"
        );
        return NextResponse.json(
            {
                userId: userId,
            },
            { status: 200 } // 200 OK
        );
    } catch (error: any) {
        log.error(
            {
                requestId: request.headers.get("x-request-id") || null,
                error: error.message,
                stack: error.stack,
            },
            "Internal server error while fetching user"
        );
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 } // 500 Internal Server Error
        );
    }
}
