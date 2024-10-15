export class URLPath {
    path: string

    constructor(path: string) {
        this.path = path
        if (path === "") this.path = "/"
    }

    get parent() {
        const parts = this.path.split("/")
        if (parts.length <= 1) return new URLPath("/")
        return new URLPath(parts.slice(0, -1).join("/"))
    }

    toString() {
        return this.path
    }
}

