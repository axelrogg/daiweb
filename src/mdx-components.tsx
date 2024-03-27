import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="mb-4 text-4xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="my-4 text-3xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="my-4 text-2xl font-bold">{children}</h3>
        ),
        ul: ({ children }) => (
            <ul className="ml-8 list-outside list-disc">{children}</ul>
        ),
        ol: ({ children }) => (
            <ol className="ml-8 list-outside list-decimal">{children}</ol>
        ),
        p: ({ children }) => <p className="my-1 text-base">{children}</p>,
        ...components,
    };
}
