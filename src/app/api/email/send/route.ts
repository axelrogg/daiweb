import { EmailTemplate } from "@/components/email/templates/welcome";
import emailService from "@/lib/email/email-service";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const { data, error } = await emailService.emails.send({
            from: "DAI <info@dai.uvigo.gal>",
            to: ["axelrogg@icloud.com"],
            subject: "Hello",
            react: EmailTemplate({ firstName: "Axel" }),
        });
        if (error) {
            console.log(error);
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}
