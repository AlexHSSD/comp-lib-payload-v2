import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Blocks } from "@/components/Blocks";
import { fetchTest, fetchTests } from "@/graphql";
import { mergeOpenGraph } from "@/seo/mergeOpenGraph";
import TestDetails from "@/components/TestDetails";

const Page = async ({ params: { slug } }) => {
  const test = await fetchTest(slug);

  if (!test) return notFound();

  return (
    <React.Fragment>
      <TestDetails
        title={test.title}
        subheading={test.subheading}
        richText={test.richText}
        featuredImage={test.media}
      />
      <Blocks blocks={test.layout} />
    </React.Fragment>
  );
};

export default Page;

export async function generateStaticParams() {
  const pages = await fetchTests();
  return pages.map(({ breadcrumbs, slug }) => {
    return {
      slug: breadcrumbs?.[breadcrumbs.length - 1]?.url
        ?.replace(/^\/|\/$/g, "")
        .split("/"),
    };
  });
}

export async function generateMetadata({
  params: { slug },
}): Promise<Metadata> {
  const page = await fetchTest(slug);

  const ogImage =
    typeof page?.meta?.image === "object" &&
    page?.meta?.image !== null &&
    "url" in page?.meta?.image &&
    `${process.env.NEXT_PUBLIC_CMS_URL}${page.meta.image.url}`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    title: page?.meta?.title || "Component Library Placeholder Title",
    description: page?.meta?.description,
    openGraph: mergeOpenGraph({
      title: page?.meta?.title || "Component Library Placeholder Title",
      url: Array.isArray(slug) ? slug.join("/") : "/",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  };
}
