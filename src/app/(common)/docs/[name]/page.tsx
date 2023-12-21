import { MDXRemote } from "next-mdx-remote/rsc"

export default async function Doc({ params }: { params: { name: string } }) {
    const result = await fetch(`https://github.com/axelrogg/daiweb/tree/master/docs/${params.name}.md`)
    const markdown = await result.text()
    return <MDXRemote source={markdown}/>;
}
