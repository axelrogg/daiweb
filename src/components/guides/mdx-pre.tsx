"use client";

import { CopyIcon } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

export const MDXPre = ({ children }: { children: ReactNode }) => {
    const { toast } = useToast();
    const [navigatorObj, setNavigatorObj] = useState<Navigator | null>(null);

    useEffect(() => {
        setNavigatorObj(navigator);
    }, []);

    function copyCode() {
        if (React.isValidElement(children) && children.type === "code") {
            if (navigatorObj) {
                navigatorObj.clipboard.writeText(
                    children.props.children.toString()
                );
                toast({
                    title: "¡Copiaste el código!",
                });
            }
        }
    }

    return (
        <pre className="my-2 flex flex-row justify-between rounded-lg bg-[#d5d6db] px-4 py-4">
            {children}
            <button onClick={copyCode}>
                <CopyIcon className="hover:stroke-accent" />
            </button>
        </pre>
    );
};
