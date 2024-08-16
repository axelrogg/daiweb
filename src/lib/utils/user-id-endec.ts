import * as crypto from "crypto"

function nonce() {
    const array = new Uint32Array(5)
    return crypto.getRandomValues(array).join("")
}

export function userIdEncode(userId: number) {
    return btoa(userId + nonce())
}

export function userIdDecode(b64: string) {
    const decoded = atob(b64)
    if (Number.isNaN(Number(decoded))) {
        return null
    }
    return Number(decoded[0])
}
