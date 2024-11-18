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

    function parseCodeSnippet(children: ReactNode) {
        const code: string[] = [];
        if (React.isValidElement(children) && children.type === "code") {
            if (Array.isArray(children.props.children)) {
                for (let i = 0; i < children.props.children.length; i++) {
                    if (
                        children.props.children[i].type === "span" &&
                        children.props.children[i].props.className ===
                            "hljs-comment"
                    ) {
                        code.push(children.props.children[i].props.children);
                    } else {
                        code.push(children.props.children[i]);
                    }
                }
            } else {
                code.push(children.props.children.toString());
            }
        }
        return code.join("");
    }
    function copyCodeToClipboard() {
        if (navigatorObj) {
            navigatorObj.clipboard.writeText(parseCodeSnippet(children));
            toast({
                title: "¡Copiaste el código!",
            });
        }
    }
    return (
        <pre className="my-2 flex flex-row justify-between rounded-lg bg-[#d5d6db] px-4 py-4">
            {children}
            <button onClick={copyCodeToClipboard}>
                <CopyIcon className="hover:stroke-accent" />
            </button>
        </pre>
    );
};
