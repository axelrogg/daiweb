import { MDXRemote } from "next-mdx-remote/rsc";
import { headers } from "next/headers";

export default async function Doc({ params }: { params: { name: string } }) {
    const result = await fetch(
        `
        https://raw.githubusercontent.com/axelrogg/daiweb/master/docs/${params.name}.md
    `,
        {
            headers: {
                Authorization: `Bearer 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`,
            },
        }
    );
    const markdown = await result.text();
    return <MDXRemote source={markdown} />;
}
