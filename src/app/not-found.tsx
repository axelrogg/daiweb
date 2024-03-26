import { Button } from "@/components/ui/button";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import Link from "next/link";

export default function NotFound() {
    return (
        <DefaultLayout>
            <div className="mt-20 flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold">404 Not Found</h2>
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
