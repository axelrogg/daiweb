import { auth } from "@/auth";
import user from "@/lib/database/entities/user";
import { logger } from "@/lib/logging/logger";
import { parseStudentSignUpPdfFileContent } from "@/lib/utils/sign-up-sheet-verification";
import { NextResponse } from "next/server";

const log = logger.child({ module: "/api/users/verify" });

const MAX_PAYLOAD_SIZE = 1024 * 55; // 55kB
const CURRENT_ACADEMIC_YEAR = "2024/25";
const ALLOWED_SCHOOL_NAME = "Escuela de Ingeniería Industrial";

export const POST = auth(async function POST(request) {
    log.debug(
        {
            requestId: request.headers.get("x-request-id") || null,
            method: request.method,
        },
        "Incoming POST request to verify user"
    );

    if (!request.auth || !request.auth.user || !request.auth.user.id) {
        log.debug(
            {
                authDetails: request.auth,
            },
            "Unauthorized request: Missing or invalid authentication"
        );
        return NextResponse.json(
            { message: "You're not authorized to access this resource" },
            { status: 401 } // 401 Unauthorized
        );
    }

    const contentTypeHeader = request.headers.get("content-type");
    if (!contentTypeHeader) {
        log.warn(
            {
                authDetails: request.auth,
                headers: request.headers,
            },
            "Bad request: Missing Content-Type header"
        );
        return NextResponse.json(
            { message: "Content-Type header is missing" },
            { status: 400 } // 400 Bad Request
        );
    }
    if (!contentTypeHeader.startsWith("multipart/form-data")) {
        log.warn(
            {
                authDetails: request.auth,
                contentTypeHeader,
            },
            "Unsupported Media Type: Invalid Content-Type"
        );
        return NextResponse.json(
            {
                message:
                    "Unsupported Content-Type. Please use 'multipart/form-data'",
            },
            { status: 415 } // 415 Unsupported Media Type
        );
    }

    const contentLength = request.headers.get("content-length");

    if (!contentLength) {
        log.warn(
            { authDetails: request.auth },
            "Bad request: Missing Content-Length header"
        );
        return NextResponse.json(
            { message: "Content-Length header is missing" },
            { status: 400 } // 400 Bad Request
        );
    }

    const contentLengthInt = parseInt(contentLength, 10);

    if (Number.isNaN(contentLengthInt)) {
        log.warn(
            { authDetails: request.auth, contentLength },
            "Bad request: Invalid Content-Length header"
        );
        return NextResponse.json(
            { message: "Invalid Content-Length header" },
            { status: 400 } // 400 Bad Request
        );
    }

    if (contentLengthInt > MAX_PAYLOAD_SIZE) {
        log.warn(
            { authDetails: request.auth, contentLengthInt },
            "Payload Too Large: Content-Length exceeds limit"
        );
        return NextResponse.json(
            {
                message: `Payload exceeds the 55 kB limit. Received ${contentLengthInt} bytes`,
            },
            { status: 413 } // 413 Payload Too Large
        );
    }

    const formData = await request.formData();

    const formDataMissingFields = [];

    const studentId = formData.get("student_id") as string | null;
    const fullName = formData.get("full_name") as string | null;
    const signUpSheet = formData.get("sign_up_sheet") as File | null;

    if (!studentId) {
        formDataMissingFields.push("student_id");
    }

    if (!fullName) {
        formDataMissingFields.push("full_name");
    }

    if (!signUpSheet) {
        formDataMissingFields.push("sign_up_sheet");
    }

    if (formDataMissingFields.length > 0) {
        log.warn(
            { authDetails: request.auth, formDataMissingFields },
            "Bad request: Missing required form fields"
        );
        return NextResponse.json(
            {
                message: "Missing required fields",
                missingFields: formDataMissingFields,
            },
            { status: 400 } // 400 Bad Request
        );
    }

    const signUpSheetBytes = await signUpSheet!.arrayBuffer();
    const signUpSheetBuffer = Buffer.from(signUpSheetBytes);

    try {
        const isSignUpSheetValid = await parseStudentSignUpPdfFileContent(
            signUpSheetBuffer,
            CURRENT_ACADEMIC_YEAR,
            ALLOWED_SCHOOL_NAME,
            fullName!,
            studentId!
        );
        if (!isSignUpSheetValid) {
            log.warn(
                {
                    authDetails: request.auth,
                    studentId,
                    fullName,
                },
                "Unprocessable Entity: Student data does not match the sign-up sheet"
            );
            return NextResponse.json(
                {
                    message:
                        "Student data does not match the sign-up sheet provided",
                },
                { status: 422 } // 422 Unprocessable Entity
            );
        }
    } catch (error: any) {
        log.error(
            {
                authDetails: request.auth,
                error: error.message,
                stack: error.stack,
            },
            "Bad request: Invalid PDF file in sign-up sheet"
        );
        return NextResponse.json(
            { message: "The sign-up sheet provided is not a valid PDF file" },
            { status: 400 } // 400 Bad Request
        );
    }

    try {
        await user.verify(Number(request.auth.user!.id!));
        log.info(
            {
                requestId: request.headers.get("x-request-id") || null,
                userId: request.auth.user!.id,
            },
            "User verified successfully"
        );
        return NextResponse.json(null, { status: 200 }); // 200 OK
    } catch (error: any) {
        log.error(
            {
                authDetails: request.auth,
                error: error.message,
                stack: error.stack,
            },
            "Internal Server Error: Error occurred while verifying the user"
        );
        return NextResponse.json(
            {
                message:
                    "An error occurred while processing the request. Please try again later",
            },
            { status: 500 } // 500 Internal Server Error
        );
    }
});
