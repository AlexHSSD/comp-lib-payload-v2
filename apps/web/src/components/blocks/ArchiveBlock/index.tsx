"use client";
import React from "react";

import type { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { Media } from "@/components/Media";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Link from "next/link";

export type ArchiveBlockProps = Extract<
  Page["layout"][0],
  { blockType: "archiveBlock" }
>;

const buttonColorClass = {
  red: "border-brandRed hover:bg-brandRed",
  green: "border-brandGreen hover:bg-brandGreen",
};

const getURL = (relationTo, slug, breadcrumbs) => {
  if (relationTo === "pages") {
    const hasBreadcrumbs =
      breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;
    if (hasBreadcrumbs) {
      return breadcrumbs[breadcrumbs.length - 1]?.url as string;
    } else {
      return `/${slug}`;
    }
  }

  if (relationTo === "tests") {
    const hasBreadcrumbs =
      breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;
    if (hasBreadcrumbs) {
      return ("/tests" + breadcrumbs[breadcrumbs.length - 1]?.url) as string;
    }
  }
  return `/${relationTo}/${slug}`;
};

const Card = ({ relationTo, value }) => {
  const {
    media,
    richText,
    shortDescription,
    color,
    id,
    title,
    breadcrumbs,
    slug,
  } = value;
  if (!media || typeof media === "string") return null;
  return (
    <div
      className={`w-full h-full mx-auto max-w-sm lg:max-w-none flex flex-col bg-white items-center gap-4 p-12 rounded-2xl shadow-cards`}
    >
      <div className="relative w-full aspect-square" key={id}>
        {media && typeof media !== "string" && (
          <Media resource={media} sizes="100vh" imgClassName="mx-auto mb-2" />
        )}
      </div>
      {title && (
        <h3
          className={`font-bold px-5 text-center h-[2em] ${
            color === "red" ? "text-brandRed" : ""
          } ${color === "green" ? "text-brandGreen" : ""}`}
        >
          {title}
        </h3>
      )}
      {shortDescription && (
        <p className="px-5 mb-4 space-y-4 text-sm text-center text-black md:text-lg line-clamp-6">
          {shortDescription}
        </p>
      )}
      <Link
        href={getURL(relationTo, slug, breadcrumbs)}
        className={`
        text-black font-bold mt-auto border-2 hover:text-white hover:border-white transition-all
        ${buttonColorClass[color ?? "red"]} 
        focus:ring-4 focus:outline-none rounded-3xl text-sm px-5 py-2.5 inline-flex justify-center w-full text-center`}
      >
        Find out more
      </Link>
    </div>
  );
};

const bgClasses = {
  grey: "bg-brandGrey text-white py-8 lg:py-16",
  none: "",
};

export const ArchiveBlock: React.FC<ArchiveBlockProps & blockNum> = (props) => {
  const {
    archiveBlockFields: {
      background,
      title,
      richText,
      displayType,
      relationTo,
      populateBy,
      limit,
      selectedDocs,
      populatedDocs,
      populatedDocsTotal,
    },
    blockNum,
  } = props;

  const docs = populateBy === "collection" ? populatedDocs : selectedDocs;

  return (
    <section
      id={`archive-${blockNum}`}
      className={`relative z-10 mb-10 mt-20 px-4 ${
        bgClasses[background ?? "none"]
      }`}
    >
      <div className="px-20 mb-10 text-center lg:px-80">
        {title && <h2 className="mb-5">{title}</h2>}
        {richText && (
          <RichText
            content={richText}
            className={"text-inherit text-center mb-8 text-sm space-y-2"}
          />
        )}
      </div>

      {displayType == "carousel" && (
        <>
          {docs && (
            <div className="relative md:hidden">
              <Swiper
                className="!pb-[50px] !pt-5 !px-8"
                // @ts-ignore
                spaceBetween={20}
                slidesPerView={"auto"}
                centeredSlides={true}
              >
                {docs.map((value, index) => (
                  <SwiperSlide className="max-w-[385px]" key={index}>
                    <Card relationTo={relationTo} {...value} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {docs && (
            <div
              className={`hidden md:flex gap-6 justify-center items-stretch`}
            >
              {docs.map((value, index) => (
                <div className="max-w-[385px] h-auto" key={index}>
                  <Card relationTo={relationTo} {...value} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
