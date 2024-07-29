"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const VideoStreamCanvas = ({
    showStream,
    onStop,
}: VideoStreamCanvasProps) => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const winWidth = window.screen.width;
    const winHeight = window.screen.height;

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
    }, [stream]);

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
                    aspectRatio: winWidth / winHeight,
                    height: { ideal: 1080 },
                },
            });
            setStream(streamData);
        } catch (err: any) {
            if (err.name === "NotAllowedError") {
                alert(
                    "El permiso para acceder a la cámara fue denegado. Por favor, permite el acceso a la cámara en la configuración de tu navegador."
                );
                return;
            } else {
                alert("Un error desconocido ocurrió: " + err.message);
                return;
            }
        }
    }

    function stopStream() {
        if (!stream) {
            return;
        }
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        onStop();
    }

    return (
        <>
            <Button onClick={getVideoPermission}>Scan</Button>
            {showStream && (
                <div className="fixed left-0 top-0 mt-0">
                    <Button
                        onClick={stopStream}
                        className="absolute left-3 top-3 z-40 flex h-12 w-12 items-center justify-center rounded-full"
                        variant="ghost"
                    >
                        <XMarkIcon className="z-40 h-6 w-6 stroke-white" />
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
                    <video
                        ref={videoRef}
                        className="object-cover"
                        height={winHeight}
                        width={winWidth}
                    />
                </div>
            )}
        </>
    );
};

interface VideoStreamCanvasProps {
    showStream: boolean;
    onStop: Function;
}
