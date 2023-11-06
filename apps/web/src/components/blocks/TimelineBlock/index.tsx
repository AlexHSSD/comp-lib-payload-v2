"use client";
import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Classnames } from "react-alice-carousel";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export type TimelineBlockProps = Extract<
  Page["layout"][0],
  { blockType: "timelineBlock" }
>;

export const TimelineBlock: React.FC<TimelineBlockProps & blockNum> = ({
  blockNum,
  timelineBlockFields: { dates, title, richText },
  blockName = "TimelineBlock",
}) => {
  const slides = dates.map(({ id, year, richText }, index) => {
    return (
      <div
        className="relative pb-12 md:pb-2 grid grid-rows-1 h-full md:grid-rows-[1fr_1fr] p-2 gap-4 md:gap-24 max-w-[295px]"
        key={index}
      >
        <div className="relative w-full p-10 pb-20 bg-white group-even:order-1 rounded-2xl shadow-cards">
          <span className="absolute z-10 top-full md:group-odd:top-full md:group-even:top-auto md:group-even:bottom-full left-1/2 -translate-x-1/2 block h-0 w-0 border-x-8 border-x-transparent border-white border-t-[16px] md:group-odd:border-t-[16px] md:group-even:border-t-0 md:group-even:border-b-[16px] border-t-white"></span>
          {year && (
            <h3 className={`mb-4 font-bold text-center text-brandGreen`}>
              {year}
            </h3>
          )}
          {richText && (
            <RichText
              content={richText}
              className={
                "space-y-4 text-black text-center mb-8 text-sm prose-a:text-brandRed prose-a:hover:text-brandGreen prose-a:transition-colors"
              }
            />
          )}
        </div>
        <div className="hidden w-full px-6 md:block"></div>

        <div className="absolute z-10 w-6 h-6 -translate-x-1/2 -translate-y-1/2 border-4 rounded-full bg-brandGrey left-1/2 top-full md:top-1/2 border-brandGreen"></div>
        <div className="absolute w-full h-1 -translate-y-1/2 bg-white rounded-full group-last:hidden left-1/2 top-full md:top-1/2"></div>
      </div>
    );
  });

  const pagination = {
    clickable: true,
    bulletClass:
      "inline-block h-4 w-4 rounded-full mx-1 border border-white cursor-pointer",
    bulletActiveClass: "bg-brandGreen",
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <section className="py-8 overflow-hidden bg-brandGrey" id={blockName}>
      <div className="container mt-4">
        {title && <h2 className="mb-4 text-center text-white">{title}</h2>}
        {richText && (
          <RichText
            content={richText}
            className={
              "space-y-4 text-white text-center mb-8 text-sm container mt-4 px-6 lg:px-80 "
            }
          />
        )}
      </div>
      {/* Wrapper for slides */}
      <div className="relative">
        <Swiper
          className="!pb-20 md:!pb-12 !pl-4"
          spaceBetween={0}
          pagination={pagination}
          modules={[Pagination]}
          slidesPerView={"auto"}
        >
          {slides.map((item, index) => (
            <SwiperSlide className="max-w-[295px] group !h-auto" key={index}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
