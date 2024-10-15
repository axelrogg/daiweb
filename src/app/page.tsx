import { NavBar } from "@/components/layouts/complements/navbar";
import { Footer } from "@/components/layouts/complements/footer";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { LayoutDashboardIcon } from "lucide-react";

export default async function HomePage() {
    return (
        <div className="flex min-h-dvh flex-col">
            <div className="lg:mx-20 2xl:mx-80">
                <NavBar />
            </div>
            <div className="flex w-full w-full flex-col items-center justify-center space-y-1 divide-solid bg-line-in-motion bg-cover">
                <div className="flex h-[90svh] flex-col items-center justify-center space-y-3 px-4">
                    <h1 className="text-center text-5xl font-bold">
                        Esta es la DAI
                    </h1>
                    <h2 className="text-center text-xl">
                        Explora la nueva web de la Delegación de Alumnos de
                        Industriales: tu guía en la Universidad de Vigo
                    </h2>
                </div>
                <div className="flex h-[90svh] flex-col items-center justify-center space-y-3 px-4 lg:flex-row">
                    <LayoutDashboardIcon className="h-2/5 w-2/5 text-primary" />
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-center text-5xl font-bold">
                            Accede a tu propio dashboard
                        </h1>
                        <h2 className="text-center text-xl">
                            Descubre tu dashboard personal: toda la información
                            y recursos que necesitas, a un clic de distancia.
                        </h2>
                    </div>
                </div>
                <div className="flex h-[90svh] flex-row flex-col items-center justify-center space-y-3 px-4 lg:flex-row">
                    <DocumentTextIcon className="h-2/5 w-2/5 stroke-purple-800 lg:hidden" />
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-center text-5xl font-bold">
                            Revisa nuestras guías
                        </h1>
                        <h2 className="text-center text-xl">
                            Encuentra toda la información que necesitas para
                            navegar tu vida universitaria
                        </h2>
                    </div>
                    <DocumentTextIcon className="hidden h-2/5 w-2/5 stroke-purple-800 lg:flex" />
                </div>
            </div>
            <Footer />
        </div>
    );
}
