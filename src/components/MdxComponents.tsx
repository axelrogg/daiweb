// TODO: Fix element props typing. Change it to something like {children}: {children: React.ReactNode}
// Changing it creates an error in the MDXRemote components prop
export const MdxComponents = {
    h1: (props: any) => (
        <h1 className="text-4xl font-bold my-4">{props.children}</h1>
    ),
    h2: (props: any) => (
        <h2 className="text-2xl font-bold my-4">{props.children}</h2>
    ),
};
