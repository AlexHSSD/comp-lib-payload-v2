"use client";
import React from "react";
import { Page, Test } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { buttonClasses } from "@/components/Button/buttonClasses";
import { Media as MediaType } from "payload-types";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export type CardCarouselBlockProps = Extract<
  Page["layout"][0],
  { blockType: "cardCarouselBlock" }
>;

const buttonColorClass = {
  red: "border-brandRed hover:bg-brandRed",
  green: "border-brandGreen hover:bg-brandGreen",
};

const Card = (props) => {
  const { media, richText, color, links, id, title } = props;
  if (!media || typeof media === "string") return null;
  return (
    <div className="flex flex-col items-center w-full h-full max-w-sm gap-4 p-12 bg-white rounded-2xl shadow-cards">
      <div className="relative w-full aspect-square" key={id}>
        {media && typeof media !== "string" && (
          <Media resource={media} sizes="100vh" imgClassName="mx-auto mb-2" />
        )}
      </div>
      {title && (
        <h3
          className={`font-bold text-center h-[2em] ${
            color === "red" ? "text-brandRed" : ""
          } ${color === "green" ? "text-brandGreen" : ""}`}
        >
          {title}
        </h3>
      )}
      {richText && (
        <RichText
          content={richText}
          className="mb-4 space-y-4 text-sm text-center text-black md:text-lg line-clamp-6"
        />
      )}
      {links &&
        links.map(({ link }, index) => {
          return <CMSLink {...link} key={index} className="mt-auto" />;
        })}
    </div>
  );
};

export const CardCarouselBlock: React.FC<CardCarouselBlockProps & blockNum> = ({
  blockNum,
  cardCarouselBlockFields: { title, richText, cards },
  blockName = "cardCarousel",
}) => {
  return (
    <section
      id={`${blockName}-${blockNum}`}
      className={`relative py-8 z-10 mb-[175px] mt-20 px-4`}
    >
      <div className="text-center">
        {title && <h2 className="mb-5">{title}</h2>}
        {richText && (
          <RichText
            content={richText}
            className={
              "text-black max-w-screen-sm mx-auto text-center mb-8 text-sm space-y-2"
            }
          />
        )}
      </div>
      {cards && (
        <div className="relative md:hidden">
          <Swiper
            className="!pb-[50px] !px-8"
            // @ts-ignore
            spaceBetween={20}
            slidesPerView={"auto"}
            centeredSlides={true}
          >
            {cards.map((card, index) => (
              <SwiperSlide className="max-w-[385px] !h-auto" key={index}>
                <Card {...card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {cards && (
        <div
          className={`hidden md:flex gap-6 justify-center items-stretch flex-wrap`}
        >
          {cards.map((value, index) => (
            <div
              className={`max-w-[350px] ${
                cards.length > 2 ? "md:max-w-[320px]" : ""
              } ${cards.length !== 4 ? "xl:max-w-[385px]" : ""} h-auto`}
              key={index}
            >
              <Card {...value} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
