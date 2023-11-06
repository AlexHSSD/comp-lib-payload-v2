import React, { useState, useCallback } from "react";
import { Page, Test } from "payload-types";
import { buttonClasses } from "@/components/Button/buttonClasses";
import { Media } from "@/components/Media";
import { RichText } from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

type Props = Extract<Page["layout"][0], { blockType: "privateLabelingBlock" }>;

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

export const PrivateLabellingBlock = (props: Props) => {
  const { privateLabelingBlockFields } = props;
  if (!privateLabelingBlockFields) return null;

  let functionName = "PrivateLabellingBlock";

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
  } = privateLabelingBlockFields;

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
      className={`relative flex overflow-hidden flex-wrap items-center justify-center py-8 md:py-20 md:items-stretch bg-center bg-cover mb-16`}
    >
      <div
        className={`flex flex-col items-start justify-center w-full p-10 lg:w-1/2 lg:pl-20`}
      >
        <h2 className="mb-8 text-2xl">{title}</h2>
        <div className={`style-inner-text`}>
          <RichText
            content={richText}
            className={`mt-4 space-y-4 text-[1rem] text-inherit`}
          />
        </div>
        {links && (
          <div className="flex justify-center mt-12 space-x-4">
            {links.map(({ link }, index) => (
              <CMSLink {...link} key={index} className="inline-flex" />
            ))}
          </div>
        )}
      </div>
      <div className="relative z-10 w-full pb-10 lg:w-1/2 lg:pb-0">
        <div className={``}>
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
      </div>
    </section>
  );
};
