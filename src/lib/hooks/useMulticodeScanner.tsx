import { RefObject, useEffect, useState } from "react";
import { BarcodeFormat, BrowserMultiFormatReader } from "@zxing/library";

export const useMulticodeScanner = (
    stream: MediaStream | null,
    showStream: boolean,
    videoRef: RefObject<HTMLVideoElement> | null,
    onStopStreamCallback: () => void
) => {
    const [codeFound, setCodeFound] = useState<string | null>(null);
    const [codeReader, setCodeReader] =
        useState<BrowserMultiFormatReader | null>(null);

    useEffect(() => {
        const reader = new BrowserMultiFormatReader();
        setCodeReader(reader);

        return () => {
            reader.reset();
        };
    }, []);

    useEffect(() => {
        if (
            !stream ||
            !showStream ||
            !codeReader ||
            !videoRef ||
            !videoRef.current
        ) {
            return;
        }

        codeReader.decodeFromStream(
            stream,
            videoRef.current,
            (result, error) => {
                if (result) {
                    const format = result.getBarcodeFormat();
                    if (
                        format !== BarcodeFormat.QR_CODE &&
                        format !== BarcodeFormat.EAN_13
                    ) {
                        console.error("Unsupported code format: " + format);
                        codeReader.reset();
                        onStopStreamCallback();
                        return;
                    }

                    setCodeFound(result.getText());
                    codeReader.reset();
                    onStopStreamCallback();
                    return;
                }
                if (error) {
                    if (error.name !== "NotFoundException") {
                        console.error(error);
                    }
                }
            }
        );
    }, [stream, showStream, codeReader]);
    return codeFound;
};
