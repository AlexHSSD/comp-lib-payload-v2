"use client";
import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import Carousel from "@/components/Carousel/Carousel";
import { buttonClasses } from "@/components/Button/buttonClasses";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export type TestimonialBlockProps = Extract<
  Page["layout"][0],
  { blockType: "testimonialBlock" }
>;

const quoteClass = {
  red: "fill-brandRed",
  green: "fill-brandGreen",
};

export const TestimonialBlock: React.FC<TestimonialBlockProps & blockNum> = ({
  blockNum,
  testimonialBlockFields: { title, richText, testimonials, background },
  blockName = "TestimonialBlock",
}) => {
  const slides = testimonials.map(
    ({ id, title, richText, job, color }, index) => {
      return (
        <div
          className="w-full h-full px-8 bg-white rounded-2xl shadow-cards py-28"
          key={index}
        >
          <div className="relative flex justify-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51.479"
              height="43"
              viewBox="0 0 51.479 43"
            >
              <path
                className={quoteClass[color ?? "green"]}
                fill="#7bb69d"
                d="M51.707,6.75H41.347l-6.84,12.981V49.75h21.5V19.731H45.647Zm-30.1,0H11.247L4.528,19.731V49.75H25.907V19.731H14.888Z"
                transform="translate(-4.528 -6.75)"
              />
            </svg>
          </div>
          {richText && (
            <RichText
              content={richText}
              className={"space-y-4 text-black text-center mb-8 text-sm mt-8"}
            />
          )}
          {title && (
            <h3 className={`mb-2 font-bold text-center text-black`}>{title}</h3>
          )}
          {job && (
            <p
              className={`mb-4 text-center ${
                color === "red" ? "text-brandRed" : ""
              } ${color === "green" ? "text-brandGreen" : ""}`}
            >
              {job}
            </p>
          )}
        </div>
      );
    }
  );

  const pagination = {
    clickable: true,
    bulletClass:
      "h-4 w-4 rounded-full mx-1 border border-white cursor-pointer hidden lg:inline-block",
    bulletActiveClass: "bg-brandGreen",
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <section
      id={blockName}
      className={`relative py-8 lg:py-32 z-10 bg-brandGrey text-white`}
    >
      <div className="container relative pb-8 mb-16 false">
        <h2 className={"mb-8 text-center text-inherit"}>{title}</h2>
        <div className={"text-center style-inner-text"}>
          <RichText
            content={richText}
            className={`mt-4 space-y-4 text-[1rem] text-inherit px-10 lg:px-60`}
          />
        </div>
      </div>
      <div className="relative">
        <Swiper
          className="!pb-[50px] !px-10"
          // @ts-ignore
          pagination={pagination}
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {slides.map((item, index) => (
            <SwiperSlide className="!h-auto" key={index}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
