import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Blocks } from "@/components/Blocks";
import { fetchBlog, fetchBlogs } from "@/graphql";
import { mergeOpenGraph } from "@/seo/mergeOpenGraph";
import BlogDetails from "@/components/BlogDetails";

const Page = async ({ params: { slug } }) => {
  const blog = await fetchBlog(slug);

  if (!blog) return notFound();

  return (
    <React.Fragment>
      <BlogDetails
        title={blog.title}
        subheading={blog.subheading}
        richText={blog.richText}
        featuredImage={blog.media}
      />
      <Blocks blocks={blog.layout} />
    </React.Fragment>
  );
};

export default Page;

export async function generateStaticParams() {
  const pages = await fetchBlogs();
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
  const page = await fetchBlog(slug);

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
