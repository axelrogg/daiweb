import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logging/logger";
import locker from "@/lib/database/entities/lockers";

const log = logger.child({ module: "/api/users/locker/" });

export async function POST(request: NextRequest) {
    log.debug(
        {
            requestId: request.headers.get("x-request-id") || null,
            method: request.method,
        },
        "Incoming POST request to check and assign lockers"
    );

    const { email, userId } = (await request.json()) as {
        email: string;
        userId: number;
    };
    const paramsMissingFields: string[] = [];
    if (!email) {
        paramsMissingFields.push("email");
    }
    if (!userId) {
        paramsMissingFields.push("userId");
    }

    if (paramsMissingFields.length > 0) {
        log.warn(
            {
                requestId: request.headers.get("x-request-id") || null,
                email,
                userId,
                paramsMissingFields,
            },
            "Locker assignment request is missing required fields"
        );
        return NextResponse.json(
            {
                message: "Missing required fields",
                missingFields: paramsMissingFields,
            },
            { status: 400 } // 400 Bad Request
        );
    }

    let lockerInfo = null;
    try {
        lockerInfo = await locker.userLockerFromForm(email);
        if (!lockerInfo) {
            log.debug(
                {
                    requestId: request.headers.get("x-request-id"),
                    email: email,
                    userId: userId,
                },
                "No locker assigned to user was found in form table"
            );
            return NextResponse.json(
                { message: "No locker assigned to user was found" },
                { status: 200 } // 200 OK
            );
        }
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
            { status: 500 } // 400 Internal Server Error
        );
    }

    try {
        await locker.assignNewLocker(
            userId,
            lockerInfo.campus,
            lockerInfo.number
        );
        log.debug(
            {
                requestId: request.headers.get("x-request-id"),
                email: email,
                userId: userId,
            },
            `Locker ${lockerInfo.number} on ${lockerInfo.campus} was successfully assigned to user ${userId}`
        );
        return NextResponse.json(
            {
                message: "Locker assigned to user",
                locker: {
                    number: lockerInfo.number,
                    campus: lockerInfo.campus,
                },
                userId: userId,
            },
            { status: 201 } // 201 Created
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
            { status: 500 } // 400 Internal Server Error
        );
    }
}
