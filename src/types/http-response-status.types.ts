type HTTPResponseStatusCodeText = "OK" | "Bad Request" | "Unprocessable Entity";

type HTTPResponseStatusCode = 200 | 400 | 422;

type HTTPStatusCodeInfo = {
    code: HTTPResponseStatusCode;
    text: HTTPResponseStatusCodeText;
};

type HTTPResponseStatus = {
    ok: HTTPStatusCodeInfo;
    badRequest: HTTPStatusCodeInfo;
    unprocessableEntity: HTTPStatusCodeInfo;
};

export type { HTTPStatusCodeInfo, HTTPResponseStatus, HTTPResponseStatusCode };
