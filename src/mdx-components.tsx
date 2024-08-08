import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ id, children }) => (
                <h1 id={id} className="mb-4 text-3xl font-bold">{children}</h1>
        ),
        h2: ({ id, children }) => (
            <h2 id={id} className="my-4 text-2xl font-bold">{children}</h2>
        ),
        h3: ({ id, children }) => (
            <h3 id={id} className="my-4 text-xl font-bold">{children}</h3>
        ),
        ul: ({ children }) => (
            <ul className="list-outside">{children}</ul>
        ),
        li: ({children}) => (
            <li className="ml-3">{children}</li>
        ),
        ol: ({ children }) => (
            <ol className="ml-7 list-outside list-decimal">{children}</ol>
        ),
        a: ({ href, children }) => (
            <a href={href} className="text-blue-500 underline lg:hover:underline">
                {children}
            </a>
        ),
        p: ({ children }) => <p className="my-1 text-base">{children}</p>,
        ...components,
    };
}
