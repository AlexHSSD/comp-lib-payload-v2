import React, { useState, useCallback } from "react";
import { Page, Test } from "payload-types";
import { buttonClasses } from "@/components/Button/buttonClasses";
import { Media } from "@/components/Media";
import { Media as MediaType } from "payload-types";
import { RichText } from "@/components/RichText";
import { Swiper, SwiperSlide } from "swiper/react";
import { CMSLink } from "@/components/Link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

type Props = Extract<Page["layout"][0], { blockType: "cmxCarouselBlock" }>;

const bgClasses = {
  green: "bg-green-400 text-white",
  grey: "bg-grey-100 text-brown",
  none: "bg-white text-brown",
};

const btnColorClass = {
  green: "green",
  white: "white",
  none: "",
};

export const CmxCarouselBlock = (props: Props) => {
  const { cmxCarouselBlockFields } = props;
  if (!cmxCarouselBlockFields) return null;

  let functionName = "CarouselBlock";

  const {
    title,
    richText,
    links,
    products,
    background,
    icon,
    image,
    style,
    logo,
  } = cmxCarouselBlockFields;

  // const [padding, setPadding] = useState(0);

  const renderDotsItem = ({ isActive }) => {
    return (
      <div
        className={`h-2 w-2 rounded-full border border-brown cursor-pointer ${
          isActive && "bg-brown"
        }`}
      />
    );
  };

  // const measuredRef = useCallback((node) => {
  //   if (node !== null && node !== undefined) {
  //     setPadding(node.offsetWidth * 0.3);
  //   }
  //   return node;
  // }, []);

  //   const resizeCheckPercent = useCallback(() => {
  //     measuredRef();
  //   }, [measuredRef]);

  let bg = [""];
  let reverse = ["flex-row-reverse"];
  let className = [""];
  let backgroundImage = [""];
  let getAssetURL = [""];
  let bodyClassName = [""];
  let images = [""];

  const Slide = ({ media }) => {
    if (!products || typeof products === "string") return null;
    return (
      <div className="relative w-full px-2 md:px-4 lg:px-8 h-80">
        <div className="relative w-full h-full">
          {products && typeof products !== "string" && (
            <Media
              resource={media}
              sizes="100vw"
              priority={true}
              fill={true}
              imgClassName="object-cover"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id={functionName}
      className={`relative py-8 lg:py-12 z-10 mb-[100px] pb-[200px] lg:pb-[200px] ${
        background === "green"
          ? "bg-green-400 text-white"
          : "bg-white text-brown"
      }`}
    >
      <div className="container relative pb-8 mb-16 false">
        {typeof logo !== "string" && (
          <Media
            resource={logo}
            priority={true}
            imgClassName="mx-auto mt-12 mb-8 w-12 h-12"
          />
        )}
        <h2 className={"mb-8 text-2xl text-center text-inherit"}>{title}</h2>
        <div className={"text-center style-inner-text"}>
          <RichText
            content={richText}
            className={`mt-4 space-y-4 text-[1rem] text-inherit`}
          />
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-0 w-8/12 transform -translate-y-1/2 md:w-4/12 -translate-x-1/4 left-1/2">
          {typeof image !== "string" && (
            <Media
              resource={image}
              priority={true}
              imgClassName="w-full h-full"
            />
          )}
        </div>
        <Swiper
          className="!pb-[50px] !px-8"
          // @ts-ignore
          spaceBetween={20}
          slidesPerView={"auto"}
          centeredSlides={true}
        >
          {products &&
            products.map(({ media, id }) => (
              <SwiperSlide className="max-w-[385px] !h-auto" key={id}>
                <Slide media={media} />
              </SwiperSlide>
            ))}
        </Swiper>{" "}
      </div>
    </section>
  );
};