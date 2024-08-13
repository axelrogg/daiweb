import { LoadingSpinner } from "@/components/loading-spinner";
import { MainLogo } from "@/components/main-logo";
import Image from "next/image";

export default function LoadingPage() {
    return (
        <div className="group flex h-[80vh] flex-col items-center justify-center space-y-4">
            <div className="animate-pulse ">
                <Image
                    src="/logo-dai.svg"
                    alt="DAI logo"
                    width={80}
                    height={62}
                    priority
                />
            </div>
            <p className="text-center text-xl font-bold">Cargando...</p>
        </div>
    );
}
