"use client";

import React, { useState } from "react";
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
import { Pagination, Navigation, Thumbs, FreeMode } from "swiper/modules";

export type SliderSplitBlockProps = Extract<
  Page["layout"][0],
  { blockType: "sliderSplitBlock" }
>;

export const SliderSplitBlock: React.FC<SliderSplitBlockProps & blockNum> = ({
  blockNum,
  sliderSplitBlockFields: { slides, title, richText, enablePaginationButtons },
  blockName = "SliderSplitBlock",
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const renderDotsItem = ({ isActive }) => {
    return (
      <div
        className={`h-2 w-2 rounded-full border border-white cursor-pointer ${
          isActive && "bg-brandGreen"
        }`}
      />
    );
  };

  const elements = slides.map(({ media, title, richText, links }, index) => {
    if (!media || typeof media === "string") return null;
    return (
      <SwiperSlide className=" !h-auto" key={index}>
        <div className="relative grid items-stretch justify-between h-full gap-2 lg:max-w-none md:gap-6 lg:grid-cols-2">
          <div className="relative w-full z-3">
            {media && typeof media !== "string" && (
              <Media
                resource={media}
                sizes="100vh"
                imgClassName="mx-auto rounded-2xl object-cover object-center w-full"
              />
            )}
          </div>
          <div className="relative w-full h-auto px-10 py-16 overflow-hidden lg:aspect-square aspect-[1/1.5] z-3 md:p-10 bg-brandGrey rounded-2xl">
            <div className="flex flex-col justify-center h-full gap-4 text-center lg:text-left">
              <h2 className="font-bold text-white">{title}</h2>
              <RichText
                content={richText}
                className={"w-full p-0 mx-0 mb-0 text-sm lg:text-lg"}
              />
              {links && (
                <div className="flex gap-2">
                  {links.map(({ link }, index) => {
                    return <CMSLink {...link} key={index} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  const pagination = {
    clickable: true,
    bulletClass:
      "inline-block h-3 w-3 rounded-full border mx-1 border-white cursor-pointer",
    bulletActiveClass: "bg-brandGreen border-brandGreen",
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <section
      id={blockName}
      className="relative px-0 mb-20 overflow-hidden text-white z-2 pt-7 md:pt-24"
    >
      <div className="container px-10 mb-10 text-center text-black">
        <h2 className="font-bold">{title}</h2>
        <RichText
          content={richText}
          className={
            "w-full px-20 lg:px-72 mx-0 mt-8 mb-0 text-six prose-a:text-six"
          }
        />
      </div>
      <div className="container">
        <div className="max-w-lg mx-auto lg:max-w-none">
          <Swiper
            className="split-swiper"
            spaceBetween={20}
            pagination={pagination}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[Pagination, FreeMode, Navigation, Thumbs]}
          >
            {elements}
          </Swiper>
          {slides && enablePaginationButtons && (
            <Swiper
              className="gap-2 text-black not-prose"
              onSwiper={setThumbsSwiper}
              spaceBetween={48}
              slidesPerView="auto"
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {slides.map(({ id, title }, index) => (
                <SwiperSlide
                  className="text-xs max-w-fit [&.swiper-slide-thumb-active]:text-brandGreen [&.swiper-slide-thumb-active]:font-bold cursor-pointer mt-4"
                  key={index}
                >
                  <div key={id} className="text-xs">
                    {title}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};
