import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DefaultLayout } from "@/layouts/default-layout";
import { DocumentTextIcon, PencilIcon } from "@heroicons/react/24/outline";

export default async function HomePage() {
    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center">
                <h1 className="mb-5 text-center text-5xl font-bold">
                    Bienvenidos a la nueva DAI
                </h1>
                <h2 className="max-w-prose text-center text-xl">
                    La web de la Delegación de Alumnos de Industriales se
                    renueva para ofrecerte la mejor experiencia de la
                    Universidad de Vigo
                </h2>
                <div className="min-w-full space-y-5 lg:grid lg:grid-cols-3 lg:gap-4">
                    <Card>
                        <CardContent className="mt-5 flex items-center justify-center">
                            <Link href="/docs">
                                <DocumentTextIcon className="h-20 w-20" />
                            </Link>
                        </CardContent>
                        <CardHeader>
                            <CardTitle>Consejos y trucos</CardTitle>
                            <CardDescription>
                                Una guía para ayudarte en todo momento.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardContent className="mt-5 flex items-center justify-center">
                            <Link href="/blog">
                                <PencilIcon className="h-20 w-20" />
                            </Link>
                        </CardContent>
                        <CardHeader>
                            <CardTitle>Un nuevo blog</CardTitle>
                            <CardDescription>
                                Un espacio para enterarte de todo lo importante.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    );
}
