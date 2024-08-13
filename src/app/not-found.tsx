import { Button } from "@/components/ui/button";
import { DefaultLayout } from "@/components/layouts/default-layout";
import Link from "next/link";

/**
 * Used by NextJS when a user tries to access a route that doesn't exist.
 *
 * The component's height is set using a calculated value to ensure it fits
 * within the viewport without causing overflow and the need for scrolling.
 * Initially, `min-h-screen` was employed with the intention of having the
 * component occupy the full height of the screen. However, this approach
 * didn't account for the navbar's presence, introduced by wrapping the
 * component in `DefaultLayout`, which occupies additional space at the top of
 * the viewport.
 *
 * To address this, the height is explicitly calculated as `100vh - 155px`.
 * This calculation subtracts the navbar's height from the full viewport height,
 * allowing the content of the `NotFound` page to be fully visible without
 * extending beyond the viewport's bounds and triggering a scrollbar. The
 * adjustment ensures the user can view the entire page content comfortably,
 * without unnecessary scrolling.
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/not-found}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/calc}
 */
export default function NotFoundPage() {
    return (
        <DefaultLayout>
            <div className="flex h-[calc(100dvh-155px)] w-full flex-col items-center justify-center">
                <h2 className="text-center text-4xl font-bold">
                    404 Not Found
                </h2>
                <p className="my-5">
                    ¡Ups! No pudimos encontrar lo que buscas.
                </p>
                <Button asChild>
                    <Link href="/">Vuelve al inicio</Link>
                </Button>
            </div>
        </DefaultLayout>
    );
}
