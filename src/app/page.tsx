
import { DefaultLayout } from "@/layouts/default-layout";

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
            </div>
        </DefaultLayout>
    );
}
