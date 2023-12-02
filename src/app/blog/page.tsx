import Image from "next/image"

type BlogEntryListContent = {
    title: string
    heroImageUri: string
    author: {
        avatarUri: string
        name: string
    }
    dateCreated: Date
    sneakPeek: string
}

const blogcont: BlogEntryListContent[] = [
    {
        title: "The Wonders of Technology",
        heroImageUri: "",
        author: {
            avatarUri: "",
            name: "Emma Thompson",
        },
        dateCreated: new Date(),
        sneakPeek: "This is a sneak peek"
    },
    {
        title: "Exploring the Serene Beauty of Nature",
        heroImageUri: "",
        author: {
            avatarUri: "",
            name: "Alexander Greene",
        },
        dateCreated: new Date(),
        sneakPeek: "This is a sneak peek"
    }
]
export default function Blog() {
    return (
        <div className="w-fit px-5">
            <h1 className="text-6xl font-bold">
                Blog
            </h1>
        </div>
    )
}