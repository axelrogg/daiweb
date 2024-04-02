import { HTTPResponseStatus } from "@/types";

export const HTTP_RESPONSE_STATUS: HTTPResponseStatus = {
    ok: {
        code: 200,
        title: "OK",
    },
    badRequest: {
        code: 400,
        title: "Bad Request",
    },
    unprocessableEntity: {
        code: 422,
        title: "Unprocessable Entity",
    },
};
