import { VariantProps, cva } from "class-variance-authority";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { cn } from "@/lib/utils";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { PropsWithChildren } from "@/types";

const Callout = ({
    children,
    className,
    variant,
}: PropsWithChildren<CalloutProps & VariantProps<typeof calloutVariants>>) => {
    return (
        <Alert
            role="callout"
            className={cn(calloutVariants({ variant }), `my-3 ${className}`)}
        >
            {variantIcons[variant]}
            <AlertTitle>{getCalloutTitle(variant)}</AlertTitle>
            {children}
        </Alert>
    );
};

interface CalloutProps {
    title?: string | undefined;
    className?: string | undefined;
    variant: string;
}

const calloutVariants = cva(null, {
    variants: {
        variant: {
            info: "border-blue-500/50 text-blue-500 dark:border-blue-500 [&>svg]:text-blue-500 dark:border-blue-900/50 dark:text-blue-900 dark:dark:border-blue-900 dark:[&>svg]:text-blue-900",
            success:
                "border-green-500/50 text-green-500 dark:border-green-500 [&>svg]:text-green-500 dark:border-green-900/50 dark:text-green-900 dark:dark:border-green-900 dark:[&>svg]:text-green-900",
            warning:
                "border-yellow-600/50 text-yellow-600 dark:border-yellow-600 [&>svg]:text-yellow-600 dark:border-yellow-900/50 dark:text-yellow-900 dark:dark:border-yellow-900 dark:[&>svg]:text-yellow-900",
            error: "border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900",
        },
    },
});

const variantIcons: Record<string, React.ReactNode> = {
    info: <InformationCircleIcon className="h-6 w-6" />,
    success: <CheckCircleIcon className="h-6 w-6" />,
    warning: <ExclamationTriangleIcon className="h-6 w-6" />,
    error: <NoSymbolIcon className="h-6 w-6" />,
};

function getCalloutTitle(
    variant: "info" | "success" | "warning" | "error"
): string {
    switch (variant) {
        case "info":
            return "Info";
        case "success":
            return "Enhorabuena";
        case "warning":
            return "Cuidado";
        case "error":
            return "Error";
        default:
            // We should never be here. I'm even tempted to throw an error
            // instead of returning an empty string. Intrusive thought?
            return "";
    }
}

export { Callout, AlertDescription as CalloutDescription };
