"use client";
import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { Media } from "@/components/Media";
import Carousel from "@/components/Carousel/Carousel";
import { CMSLink } from "@/components/Link";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export type TableCarouselBlockProps = Extract<
  Page["layout"][0],
  { blockType: "tableCarouselBlock" }
>;

export const TableCarouselBlock: React.FC<
  TableCarouselBlockProps & blockNum
> = ({
  blockNum,
  tableCarouselBlockFields: { title, richText, testBenefits },
  blockName = "TableCarouselBlock",
}) => {
  const headings = [
    "Accounts",
    "Bandwidth",
    "Memes",
    "Remixes",
    "Complaints",
    "Boosters",
  ];

  const questions = Array.from(
    new Set(
      testBenefits.flatMap((test) => test.benefits).map((item) => item.name)
    )
  );

  const cellHeightClass = "h-[4rem] md:h-[6rem]";

  const colors = {
    red: "text-brandRed",
    green: "text-brandGreen",
  };

  const pagination = {
    clickable: true,
    bulletClass:
      "inline-block h-3 w-3 rounded-full mx-1.5 border border-black cursor-pointer",
    bulletActiveClass: "bg-brandGreen border-brandGreen",
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };
  return (
    <section id={blockName} className={`relative py-2 block mb-10`}>
      <div className="block w-[90%] max-w-[90rem] ml-auto mr-auto">
        <h2 className="text-center">{title}</h2>
        <RichText
          content={richText}
          className={"mb-4 text-center px-5 lg:px-40"}
        />
      </div>

      <div className="pl-8 md:pl-0 mx-auto max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className="flex">
          <div
            className={`flex-1 max-md:max-w-[50%] ${
              testBenefits.length > 3 ? "md:max-w-[33.333%]" : "mx:max-w-[50%]"
            }`}
          >
            <div className="relative text-lg">
              <div
                className={`font-bold text-center text-base md:text-lg md:pl-8 lg:pl-16 flex flex-col justify-center px-2 ${cellHeightClass}`}
              >
                <div className="max-w-[300px] w-full text-center">
                  What&apos;s included?
                </div>
              </div>
              {questions.map((heading, index) => (
                <div
                  className={`even:bg-brandDarkGrey/10 items-start p-4 md:pl-8 lg:pl-16 overflow-hidden text-sm flex flex-col justify-center line-clamp-4 ${cellHeightClass} ${
                    heading.length > 40 ? "text-xs" : "text-sm"
                  }`}
                  key={index}
                >
                  <div className="max-w-[300px] w-full text-center">
                    <p className="line-clamp-3 text-center" title={heading}>
                      {heading}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-md:max-w-[50%] md:max-w-[75%] flex-1 relative overflow-hidden">
            <Swiper
              className="!pb-8"
              pagination={pagination}
              modules={[Pagination]}
              slidesPerView={"auto"}
              loop={true}
            >
              {testBenefits.map((test, index) => (
                <SwiperSlide
                  className={`max-md:flex-none max-w-[180px] ${
                    testBenefits.length == 2
                      ? "md:max-w-[50%]"
                      : testBenefits.length > 3
                      ? "md:max-w-[25%]"
                      : "mx:max-w-[33.333%]"
                  }`}
                  key={index}
                >
                  <div className="overflow-hidden relative flex mb-2 flex-col justify-start">
                    <div className="text-lg flex-1">
                      <div
                        className={`flex flex-col justify-center items-center px-2 md:px-4 ${cellHeightClass}`}
                      >
                        <span
                          className={`font-bold text-base md:text-lg ${
                            colors[test.color ?? "green"]
                          }`}
                        >
                          {test.title}
                        </span>
                      </div>
                      {test.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className={`p-2 max-w-full md:p-4 even:bg-brandDarkGrey/10 flex items-center flex-col justify-center ${cellHeightClass}`}
                        >
                          {benefit.enabled ? (
                            <svg
                              className="h-6 md:h-8"
                              xmlns="http://www.w3.org/2000/svg"
                              width="37.647"
                              height="30"
                              viewBox="0 0 37.647 29.988"
                            >
                              <path
                                data-name="Path 18157"
                                d="M32.327,0,12.98,19.347l-7.659-7.66L0,17.008l12.98,12.98L37.647,5.32Z"
                                transform="translate(0)"
                                fill="#2b2e34"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-6 md:h-8"
                              xmlns="http://www.w3.org/2000/svg"
                              width="29.988"
                              height="30"
                              viewBox="0 0 29.988 29.988"
                            >
                              <path
                                data-name="Path 18167"
                                d="M24.667,0,14.994,9.673,5.321,0,0,5.32l9.673,9.674L0,24.667l5.321,5.321,9.673-9.673,9.673,9.673,5.321-5.321-9.673-9.673L29.988,5.32Z"
                                transform="translate(0)"
                                fill="#2b2e34"
                              />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
