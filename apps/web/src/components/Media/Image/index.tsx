"use client";
import React from "react";
import NextImage, { StaticImageData } from "next/image";

import { Props } from "../types";

const breakpoints = {
  s: 768,
  m: 1024,
  l: 1440,
  xl: 1920,
};

export const Image: React.FC<Props> = (props) => {
  const {
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    sizes: sizesFromProps,
    resource,
    priority,
    fill,
    src: srcFromProps,
    alt: altFromProps,
    width: widthFromProps,
    height: heightFromProps,
  } = props;

  const [isLoading, setIsLoading] = React.useState(true);

  let width: number | undefined = widthFromProps;
  let height: number | undefined = heightFromProps;
  let alt = altFromProps;
  let src: StaticImageData | string | undefined = srcFromProps;
  if (!src && resource && typeof resource !== "string") {
    width = resource.width;
    height = resource.height;
    alt = resource.alt;
    src = `${process.env.NEXT_PUBLIC_AZURE_BLOB_URL}/${process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME}/${resource.filename}`;
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes =
    sizesFromProps ||
    Object.entries(breakpoints)
      .map(([, value]) => `(max-width: ${value}px) ${value}px`)
      .join(", ");

  const baseClasses = [isLoading && "bg-neutral-100", imgClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <React.Fragment>
      <NextImage
        className={`${baseClasses}`}
        src={src || ""}
        alt={alt || ""}
        onClick={onClick}
        onLoad={() => {
          setIsLoading(false);
          if (typeof onLoadFromProps === "function") {
            onLoadFromProps();
          }
        }}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
      />
    </React.Fragment>
  );
};
