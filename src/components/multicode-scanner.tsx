"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { useMulticodeScanner } from "@/lib/hooks/useMulticodeScanner";

export const MulticodeScanner = ({
    children,
    setScannedCode,
}: MulticodeScannerProps) => {
    const [showStream, setShowStream] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [windowDimensions, setWindowDimensions] = useState<{
        width: number;
        height: number;
    }>({ width: 0, height: 0 });

    function stopStream() {
        if (!stream) {
            return;
        }
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        setShowStream(false);
    }

    useEffect(() => {
        setWindowDimensions({
            width: window.screen.width,
            height: window.screen.height,
        });
    }, []);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
    }, []);

    const scannedCode = useMulticodeScanner(
        stream,
        showStream,
        videoRef,
        stopStream
    );

    useEffect(() => {
        setScannedCode(scannedCode);
    }, [scannedCode, setScannedCode]);

    async function getVideoPermission() {
        if (!("MediaRecorder" in window)) {
            alert(
                "Tu navegador no soporta el escáner de códigos QR. Por favor, intenta otro."
            );
            return;
        }
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: {
                        exact: "environment",
                    },
                    aspectRatio: {
                        min: 1.777777778,
                    },
                    height: {
                        ideal: windowDimensions.height,
                        min: windowDimensions.height / 2,
                    },
                },
            });
            setStream(streamData);
            setShowStream(true);
        } catch (error: any) {
            if (error.name === "NotAllowedError") {
                alert(
                    "El permiso para acceder a la cámara fue denegado. Por favor, permite el acceso a la cámara en la configuración de tu navegador."
                );
                return;
            } else {
                console.error(error);
                alert("Un error desconocido ocurrió: " + error.message);
                return;
            }
        }
    }

    return (
        <>
            <div onClick={getVideoPermission}>{children}</div>
            {showStream && (
                <div className="fixed left-0 top-0 z-40 mt-0">
                    <Button
                        onClick={stopStream}
                        className="absolute left-3 top-3 z-50 flex h-12 w-12 items-center justify-center rounded-full"
                        variant="ghost"
                    >
                        <XMarkIcon className="z-50 h-6 w-6 stroke-white" />
                        <div className="absolute z-30 h-12 w-12 rounded-full bg-black opacity-40"></div>
                    </Button>
                    <div className="absolute z-20 grid h-full w-full grid-cols-4 gap-0">
                        <div className="col-span-4 bg-black opacity-40" />
                        <div className="col-span-4 bg-black opacity-40" />
                        <div className="row-span-2 bg-black opacity-40" />
                        <div className="col-span-2 row-span-2 flex rounded-lg opacity-0" />
                        <div className="row-span-2 bg-black opacity-40" />
                        <div className="col-span-4 bg-black opacity-40" />
                        <div className="col-span-4 bg-black opacity-40" />
                    </div>
                    <video ref={videoRef} className="object-cover" />
                </div>
            )}
        </>
    );
};

interface MulticodeScannerProps {
    children: ReactNode;
    setScannedCode: (code: string | null) => void;
}
