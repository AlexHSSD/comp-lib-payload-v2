"use client";
import React, { useRef, useState } from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./swiper.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export type HeroBlockProps = Extract<
  Page["layout"][0],
  { blockType: "heroBlock" }
>;

const slideColors = {
  grey: "bg-brandGrey",
  red: "bg-brandRed",
  green: "bg-brandGreen",
};

const barColors = {
  red: "bg-brandGrey",
  green: "bg-brandGrey",
  grey: "bg-brandGreen",
};

export const HeroBlock: React.FC<HeroBlockProps & blockNum> = ({
  blockNum,
  heroBlockFields: { slides },
  blockName = "HeroBlock",
}) => {
  const progressEl = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState("grey");
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressEl?.current?.style.setProperty("--progress", 1 - progress);
  };

  const onSlideChange = (s: SwiperClass) => {
    const color = s.slides[s.activeIndex].getAttribute("data-color");
    setBackgroundColor(color);
  };

  const renderDotsItem = ({ isActive }) => {
    return (
      <div
        className={`h-2 w-2 rounded-full border border-white cursor-pointer ${
          isActive && "bg-brandGreen"
        }`}
      />
    );
  };

  const elements = slides.map(
    ({ media, title, richText, color, links }, index) => {
      if (!media || typeof media === "string") return null;
      return (
        <SwiperSlide
          className={`max-w-screen !h-auto`}
          key={index}
          data-color={color ?? "grey"}
        >
          <div className="container relative flex flex-col flex-wrap items-stretch justify-between h-full md:flex-row">
            <div className="relative z-3 md:w-[calc(60%-18px)] flex flex-col gap-8 justify-center py-10 px-10">
              <h1 className="font-bold text-center text-white md:text-left">
                {title}
              </h1>
              <RichText
                content={richText}
                className={"w-full p-0 mx-0 text-lg text-center md:text-left"}
              />
              {links && (
                <div
                  className={`flex flex-wrap gap-4 justify-center md:justify-start`}
                >
                  {links.map(({ link }, index) => {
                    return <CMSLink {...link} key={index} />;
                  })}
                </div>
              )}
            </div>
            <div className="relative z-3 md:w-[calc(40%-18px)]">
              <div className="">
                {media && typeof media !== "string" && (
                  <Media
                    resource={media}
                    sizes="100vh"
                    priority={true}
                    imgClassName="mx-auto mb-2 max-w-[min(512px,100%)] md:max-w-full rounded-2xl aspect-square object-cover object-center"
                  />
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    }
  );

  const pagination = {
    clickable: true,
    horizontalClass: "swiper-pagination-horizontal",
    bulletClass:
      "inline-block h-3 w-3 rounded-full border mx-1 border-white cursor-pointer",
    bulletActiveClass: "hero-dot-active",
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <section
      id={blockName}
      className={`relative z-2 text-white overflow-hidden px-0 mb-10 py-4 md:py-16 lg:py-20 xl:py-24 ${
        backgroundColor ?? "grey"
      }`}
    >
      <div
        className={`absolute top-0 left-0 h-3/4 md:h-full bg-cover bg-center w-full md:w-3/4 transition-colors md:rounded-br-3xl md:-ml-10 ${
          slideColors[backgroundColor ?? "grey"]
        }`}
      ></div>
      <Swiper
        className="hero-swiper"
        // @ts-ignore
        spaceBetween={25}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={pagination}
        modules={[Pagination, Autoplay]}
        slidesPerView={"auto"}
        loop={true}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSlideChange={onSlideChange}
      >
        {elements}
      </Swiper>
      <div
        className={`autoplay-progress absolute z-10 top-0 left-0 transition-colors h-1 w-[calc(var(--progress)*100%)] ${
          barColors[backgroundColor ?? "grey"]
        }`}
        ref={progressEl}
      ></div>
    </section>
  );
};
