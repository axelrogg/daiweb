import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxComponents } from "@/components/MdxComponents";

export default async function Doc({ params }: { params: { name: string } }) {
    const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
    if (!ACCESS_TOKEN) {
        throw new Error("Github access token was not set");
    }

    const result = await fetch(
        `
        https://raw.githubusercontent.com/axelrogg/daiweb/master/docs/${params.name}.md
    `,
        {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        }
    );

    const markdown = await result.text();
    return <MDXRemote source={markdown} components={{ ...MdxComponents }} />;
}
