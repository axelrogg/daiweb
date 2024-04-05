import { HTTPResponseStatus } from "@/types";

export const HTTP_RESPONSE_STATUS: HTTPResponseStatus = {
    ok: {
        code: 200,
        text: "OK",
    },
    badRequest: {
        code: 400,
        text: "Bad Request",
    },
    unprocessableEntity: {
        code: 422,
        text: "Unprocessable Entity",
    },
};
