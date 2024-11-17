import environment from "@/lib/environment";
import { logger } from "@/lib/logging/logger";
import { NextRequest, NextResponse } from "next/server";

const log = logger.child({ module: "/api/email/welcome-to-dai" });

export async function POST(request: NextRequest) {
    if (!request.headers.get("Authorization")) {
        return NextResponse.json({ status: 401 }); // 401 Unauthorized
    }

    if (
        request.headers.get("Authorization")!.split(" ")[1] !==
        environment.EMAIL_SERVICE_SECRET
    ) {
        return NextResponse.json({ status: 401 }); // 401 Unauthorized
    }

    const { name, email } = (await request.json()) as {
        name: string | undefined | null;
        email: string | undefined | null;
    };

    const missingFields: string[] = [];
    if (!name) {
        missingFields.push("name");
    }
    if (!email) {
        missingFields.push("email");
    }

    if (missingFields.length > 0) {
        log.warn(
            {
                requestId: request.headers.get("x-request-id") || null,
                email,
                name,
                missingFields,
            },
            "Request is missing required fields"
        );
        return NextResponse.json(
            {
                message: "Missing required fields",
                missingFields: missingFields,
            },
            { status: 400 }
        ); // 400 Bad Request
    }
    return NextResponse.json(
        { message: "Email sent successfully", emailId: "asd" },
        { status: 200 }
    );

    //try {
    //    const { data, error } = await emailService.emails.send({
    //        from: "DAI <info@dai.uvigo.gal>",
    //        to: [email],
    //        subject: "Tu nueva cuenta de la DAI",
    //        react: WelcomeToDAITemplate({ firstName: name }),
    //    });
    //    if (error) {
    //        console.log(error);
    //    }
    //    return NextResponse.json(data, { status: 200 });
    //} catch (error) {
    //    return NextResponse.json({ error: error }, { status: 400 });
    //}
}
