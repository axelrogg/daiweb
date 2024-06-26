import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { BookText, Feather } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center">
                <h1 className="mb-5 text-center text-5xl font-bold">
                    Bienvenidos a la nueva DAI
                </h1>
                <div className="min-w-full space-y-5">
                    <Card>
                        <CardContent className="mt-5 flex items-center justify-center">
                            <Link href="/docs">
                                <BookText className="h-20 w-20" />
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
                                <Feather className="h-20 w-20" />
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
