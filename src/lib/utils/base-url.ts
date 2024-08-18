import envSecrets from "@/lib/environment";


function baseUrl() {
    if (envSecrets.NODE_ENV === "production") {
        return "https://daiweb.vercel.app"
    }
    if (envSecrets.NODE_ENV === "stage") {
        return "https://dev.daiweb.vercel.app"
    }
    return "http://localhost:3000"
}

const BASE_URL = baseUrl()

export default BASE_URL;
