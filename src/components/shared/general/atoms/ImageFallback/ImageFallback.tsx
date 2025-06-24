import Image from "next/image";
import { useState } from "react";
import { ImageFallbackProps } from "./types";

export const ImageFallback = ({
  src,
  fallbackSrc,
  alt,
  contain,
  shouldDisplay = true,
  ...props
}: ImageFallbackProps) => {
  const [hasError, setHasError] = useState<boolean>(false);

  if (!shouldDisplay) {
    return null;
  }

  const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  
  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)


  const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`



  return hasError || !src ? (
    <Image
      src={fallbackSrc}
      style={{ objectFit: "cover" }}
      fill
      sizes='100%'
      alt={alt}
      blurDataURL={rgbDataURL(45, 58, 175)}
      placeholder='blur'
      {...props}
    />
  ) : (
    <Image
      src={src}
      style={{ objectFit: contain ? "contain" : "cover" }}
      fill
      sizes='100%'
      blurDataURL={rgbDataURL(45, 58, 175)}
      placeholder='blur'
      alt={alt}
      onError={() => {
        setHasError(true);
      }}
      {...props}
    />
  );
};
