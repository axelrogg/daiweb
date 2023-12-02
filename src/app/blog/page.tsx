import Image from "next/image"
import Link from "next/link"

type BlogEntryListContent = {
    title: string
    heroImageUri: string
    author: {
        avatarUri: string
        name: string
    }
    dateCreated: Date
    sneakPeek: string
    postUri: string
}

const blogcont: BlogEntryListContent[] = [
    {
        title: "The Wonders of Technology",
        heroImageUri: "",
        author: {
            avatarUri: "https://media.vanityfair.com/photos/633b42f061a5fa19b93f1255/master/w_1600,c_limit/LGM-20221003-emma-thompson.jpg",
            name: "Emma Thompson",
        },
        dateCreated: new Date(),
        sneakPeek: "This is a sneak peek",
        postUri: "",
    },
    {
        title: "Exploring the Serene Beauty of Nature",
        heroImageUri: "",
        author: {
            avatarUri: "",
            name: "Alexander Greene",
        },
        dateCreated: new Date(),
        sneakPeek: "This is a sneak peek",
        postUri: ""
    }
]

function displayDate(date: Date) {
    // const day = String(date.getUTCDate()).padStart(2, "0");
    const months = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${month} ${year}`;
}

export default function Blog() {
    return (
        <div className="flex flex-col">
            <h1 className="flex justify-center text-6xl font-bold mb-8">
                El blog de la DAI
            </h1>
            {
                blogcont.map(({author, dateCreated, heroImageUri, sneakPeek, title, postUri}, index) => (
                    <div key={index}>
                        
                        {/* TODO: Change both Link's href uris */}

                        <Link href={"/"}>
                            <div className="my-4 p-4">
                                <Link className="flex flex-row items-center" href={"/contacto"}>
                                    <Image
                                        src={author.avatarUri}
                                        alt={`${author.name} avatar image`}
                                        width={30}
                                        height={30}
                                        style={{borderRadius: 100, marginRight: 10}}
                                        />
                                    <p>{author.name} - {displayDate(dateCreated)}</p>
                                </Link>
                                <h2 className="text-2xl font-bold">{title}</h2>
                                <p>{sneakPeek}</p>
                            </div>
                        </Link>
                        { (index < blogcont.length - 1) && <hr/>}
                    </div>
                ))
            }
        </div>
    )
}