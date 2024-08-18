import { auth } from "@/auth";
import user from "@/lib/database/entities/user";
import { parseStudentSignUpPdfFileContent } from "@/lib/utils/sign-up-sheet-verification";
import { NextResponse } from "next/server";

const MAX_PAYLOAD_SIZE = 1024 * 55; // 55kB
const CURRENT_ACADEMIC_YEAR = "2024/25";
const ALLOWED_SCHOOL_NAME = "Escuela de Ingeniería Industrial";

export const POST = auth(async function POST(request) {
    if (!request.auth || !request.auth.user || !request.auth.user.id) {
        return NextResponse.json(
            { message: "You're not authorized to access this resource" },
            { status: 401 } // 401 Unauthorized
        );
    }

    const contentTypeHeader = request.headers.get("content-type");
    if (!contentTypeHeader) {
        return NextResponse.json(
            { message: "Content-Type header is missing" },
            { status: 400 } // 400 Bad Request
        );
    }
    if (!contentTypeHeader.startsWith("multipart/form-data")) {
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
        return NextResponse.json(
            { message: "Content-Length header is missing" },
            { status: 400 } // 400 Bad Request
        );
    }

    const contentLengthInt = parseInt(contentLength, 10);

    if (Number.isNaN(contentLengthInt)) {
        return NextResponse.json(
            { message: "Invalid Content-Length header" },
            { status: 400 } // 400 Bad Request
        );
    }

    if (contentLengthInt > MAX_PAYLOAD_SIZE) {
        return NextResponse.json(
            {
                message:
                    "Payload exceeds the 55 kB limit. Received ${contentLengthInt} bytes",
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
            return NextResponse.json(
                {
                    message:
                        "Student data does not match the sign-up sheet provided",
                },
                { status: 422 } // 422 Unprocessable Entity
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            { message: "The sign-up sheet provided is not a valid PDF file" },
            { status: 400 } // 400 Bad Request
        );
    }

    try {
        await user.verify(Number(request.auth.user!.id!));
        return NextResponse.json(null, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                message:
                    "An error occurred while processing the request. Please try again later",
            },
            { status: 500 } // 500 Internal Server Error
        );
    }
});
