"use client";
import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export type FourBlockProps = Extract<
  Page["layout"][0],
  { blockType: "fourBlock" }
>;

export const FourBlock: React.FC<FourBlockProps & blockNum> = ({
  blockNum,
  fourBlockFields: { blocks, title, richText },
  blockName = "FourBlock",
}) => {
  const slides = blocks.map(({ media, id, title, richText, color }, index) => {
    if (!media || typeof media === "string") return null;
    return (
      <div className="w-full max-w-sm p-10 mx-auto" key={index}>
        <div className="relative w-full h-full" key={id}>
          {media && typeof media !== "string" && (
            <Media resource={media} sizes="100vh" imgClassName="mx-auto mb-2" />
          )}
        </div>
        <div className="">
          {title && (
            <h3
              className={`mb-4 font-bold text-center ${
                color === "red" ? "text-brandRed" : ""
              } ${color === "green" ? "text-brandGreen" : ""}`}
            >
              {title}
            </h3>
          )}
          {richText && (
            <RichText
              content={richText}
              className={"space-y-4 text-black text-center mb-8 text-sm"}
            />
          )}
        </div>
      </div>
    );
  });

  return (
    <section id={blockName} className="mt-20 mb-8">
      <div className="px-20 mb-10 text-center lg:px-40">
        {title && <h2 className="mb-5">{title}</h2>}
        {richText && (
          <RichText
            content={richText}
            className={"text-inherit text-center mb-8 text-sm space-y-2"}
          />
        )}
      </div>
      <div className="container hidden grid-cols-1 gap-2 mt-8 containerDesktop lg:grid lg:grid-cols-4 lg:gap-2 lg:mt-16">
        {blocks &&
          blocks.map(({ media, title, color, richText }, index) => (
            <div key={index} className="p-2 col">
              <div className="w-full max-w-sm">
                <div className="relative">
                  {media && typeof media !== "string" && (
                    <Media
                      resource={media}
                      sizes="100vh"
                      imgClassName="mx-auto mb-2 p-5"
                    />
                  )}
                </div>
                <div className="">
                  {title && (
                    <h3
                      className={`mb-4 font-bold text-center ${
                        color === "red" ? "text-brandRed" : ""
                      } ${color === "green" ? "text-brandGreen" : ""}`}
                    >
                      {title}
                    </h3>
                  )}
                  {richText && (
                    <RichText
                      content={richText}
                      className={
                        "space-y-4 text-black text-center mb-8 text-sm"
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="relative lg:hidden">
        <Swiper
          className=""
          // @ts-ignore
          spaceBetween={-50}
          slidesPerView={"auto"}
          loop={true}
          centeredSlides={true}
        >
          {slides.map((item, index) => (
            <SwiperSlide className="max-w-[385px]" key={index}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
