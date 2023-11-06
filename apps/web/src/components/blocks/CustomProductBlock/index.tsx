"use client";

import React from "react";
import { useState } from "react";
import { Page } from "payload-types";
import { buttonClasses } from "@/components/Button/buttonClasses";
import { RichText } from "@/components/RichText";
import { Media } from "@/components/Media";
import Image from "next/image";
import { CMSLink } from "@/components/Link";

type Props = Extract<Page["layout"][0], { blockType: "customProductBlock" }>;

export const CustomProductBlock = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { customProductBlockFields } = props;
  if (!customProductBlockFields) return null;

  let functionName = "CustomProductBlock";

  const { title, links, elements } = customProductBlockFields;

  const tabContentVariant = {
    active: {
      visibility: "visible",
      opacity: 1,
    },
    inactive: {
      visibility: "hidden",
      opacity: 0,
    },
  };
  return (
    <section
      id={functionName}
      className="relative w-full py-12 overflow-hidden text-white bg-green-400 lg:py-32"
    >
      <div className="absolute top-0 left-0 w-6/12 transform -translate-y-1/4 md:w-3/12">
        <span className="pt-[68%] block"></span>
        <Image
          alt="CMX hex overlay"
          src="/images/svg/tabs-hex-before.svg"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="container text-center">
        {title && <h2 className="text-xl">{title}</h2>}

        {elements && (
          <ul className="my-8 flex flex-col max-w-[200px] mx-auto md:max-w-none md:flex-row md:items-stretch md:justify-between pb-4 list-none">
            {elements.map(({ name }, index) => (
              <li
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative cursor-pointer pb-2 border-b not-last:mb-2 md:not-last:mb-0 md:pb-6 border-white text-left md:text-center md:flex-1 before:absolute before:w-3 before:h-3 before:bottom-0 before:rounded-full before:border-white before:border before:transform before:translate-y-1/2 md:before:right-1/2 before:right-0 before:z-20 md:after:absolute md:after:h-1 md:after:bottom-0 md:after:w-1/2 md:first:after:left-0 md:last:after:right-0 md:after:translate-y-1/2 md:transform md:after:bg-green-400 md:after:hidden md:first:after:block md:last:after:block ${
                  activeIndex === index
                    ? "before:bg-white"
                    : "before:bg-green-400"
                }`}
              >
                {name}
              </li>
            ))}
          </ul>
        )}

        {elements && (
          <div className="relative flex items-start w-full mt-8 lg:items-center md:px-16 lg:px-24">
            {elements.map(({ name, richText }, index) => (
              <div
                className={`style-inner-text w-full -mr-[100%] ${
                  index === activeIndex ? "visible" : "invisible"
                }`}
                key={index}
              >
                <RichText
                  key={index}
                  content={richText}
                  className="mt-4 space-y-4"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {links && (
        <div className="flex justify-center mt-12 space-x-4">
          {links.map(({ link }, index) => (
            <CMSLink {...link} key={index} />
          ))}
        </div>
      )}
      <div className="absolute bottom-0 right-0 w-4/12 transform translate-x-1/4 md:w-3/12">
        <span className="pt-[68%] block"></span>
        <Image
          alt="CMX hex overlay"
          src="/images/svg/tabs-hex-after.svg"
          fill={true}
        />
      </div>
    </section>
  );
};
