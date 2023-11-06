import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  siteName: "Component Library",
  title: "Component Library",
  description: "description.",
  images: "/images/jpg/ogImage.jpg",
};

export const mergeOpenGraph = (
  og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
