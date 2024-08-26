import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ id, children }) => (
            <h1 id={id} className="mb-5 text-3xl font-bold">
                {children}
            </h1>
        ),
        h2: ({ id, children }) => (
            <h2 id={id} className="my-5 text-2xl font-bold">
                {children}
            </h2>
        ),
        h3: ({ id, children }) => (
            <h3 id={id} className="my-5 text-xl font-bold">
                {children}
            </h3>
        ),

        h4: ({ id, children }) => (
            <h4 id={id} className="my-5 text-lg font-medium">
                {children}
            </h4>
        ),
        ul: ({ children }) => (
            <ul className="my-4 ml-7 list-outside list-disc">{children}</ul>
        ),
        ol: ({ children }) => (
            <ol className="my-4 ml-7 list-outside list-decimal">{children}</ol>
        ),
        a: ({ href, children }) => (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-accent"
            >
                {children}
            </a>
        ),
        p: ({ children }) => <p className="my-1 text-base">{children}</p>,
        ...components,
    };
}
