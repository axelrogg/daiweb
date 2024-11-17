import Link from "next/link";
import { Callout, CalloutDescription } from "@components/ui/callout";

export const UnverifiedCard = () => (
    <Callout variant="warning" className="max-w-lg">
        <CalloutDescription>
            Parece que no has verificado tu cuenta todavía. Para poder acceder a
            todos los beneficios de la DAI, necesitas{" "}
            <Link
                className="font-bold underline hover:text-primary"
                href="/dashboard/verificar-mi-cuenta"
            >
                verificar tu cuenta
            </Link>
            .
        </CalloutDescription>
    </Callout>
);
