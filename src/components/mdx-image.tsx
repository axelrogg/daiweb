import { ImgHTMLAttributes } from "react";

export const MdxImage = ({
    src,
    alt,
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="my-5 flex w-full items-center justify-center">
        <img
            className="object-contain drop-shadow-2xl"
            width="auto"
            src={src}
            alt={alt}
            {...props}
        />
    </div>
);
