import envSecrets from "@/lib/environment";

function baseUrl() {
    if (envSecrets.NODE_ENV === "production") {
        return "https://dai.uvigo.gal";
    }
    if (envSecrets.NODE_ENV === "stage") {
        return "https://dev.daiweb.vercel.app";
    }
    return "http://localhost:3000";
}

const DAI_BASE_URL = baseUrl();

export default DAI_BASE_URL;
