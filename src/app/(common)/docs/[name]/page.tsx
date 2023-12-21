import { MDXRemote } from "next-mdx-remote/rsc";

// TODO: Fix element props typing. Change it to something like {children}: {children: React.ReactNode}
// Changing it creates an error in the MDXRemote components prop
const components = {
    h1: (props: any) => (
        <h1 className="text-4xl font-bold my-4">{props.children}</h1>
    ),
    h2: (props: any) => (
        <h2 className="text-2xl font-bold my-2">{props.children}</h2>
    ),
};

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
    return <MDXRemote source={markdown} components={{ ...components }} />;
}
