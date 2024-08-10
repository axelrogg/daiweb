import { ImgHTMLAttributes } from "react";

export const MdxImage = ({ src, alt, ...props}: ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="flex w-full my-5 justify-center items-center">
        <img
            className="object-contain drop-shadow-2xl"
            width="auto"
            src={src}
            alt={alt}
            {...props}
        />
    </div>
)
