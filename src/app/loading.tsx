import { LoadingSpinner } from "@/components/loading-spinner";

export default function LoadingPage() {
    return (
        <div className="flex flex-col items-center justify-center lg:mt-32">
            <p className="mb-10 text-2xl font-bold">Cargando</p>
            <LoadingSpinner className="text-primary" />
        </div>
    );
}
