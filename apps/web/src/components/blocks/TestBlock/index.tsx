import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Classnames } from "react-alice-carousel";
import { Media } from "@/components/Media";
import { buttonClasses } from "@/components/Button/buttonClasses";

export type TestBlockProps = Extract<
  Page["layout"][0],
  { blockType: "testBlock" }
>;

const bgClasses = {
  blue: "bg-blue-400 text-white",
  grey: "bg-grey-100 text-brown",
  none: "bg-white text-brown",
};

export const TestBlock: React.FC<TestBlockProps & blockNum> = ({
  blockNum,
  testBlockFields: { tests, title, richText, background },
  blockName = "TestBlock",
}) => {
  const renderDotsItem = ({ isActive }) => {
    return (
      <div
        className={`h-2 w-2 rounded-full border border-brown cursor-pointer ${
          isActive && "bg-brown"
        }`}
      />
    );
  };

  let bg = [""];
  let reverse = ["flex-row-reverse"];
  let className = [""];
  let backgroundImage = [""];
  let getAssetURL = [""];
  let bodyClassName = [""];
  let images = [""];

  const slides = tests.map(({ media, id, links }, index) => {
    if (!media || typeof media === "string") return null;
    return (
      <div
        key={id}
        className="relative w-[90%] px-2 h-80 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="relative w-full h-full">
          {media && typeof media !== "string" && (
            <Media
              resource={media}
              sizes="100vw"
              fill={true}
              imgClassName="object-cover"
            />
          )}
        </div>
        {links && (
          <div className="flex mt-12 space-x-4">
            {links.map(({ link }, index) => (
              <a
                className={buttonClasses(link.appearance)}
                key={index}
                href={link.url}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  });

  return (
    <section
      id={blockName}
      className={`relative py-8 z-10 mb-[175px] ${
        background === "grey" ? "bg-grey-400 text-white" : "bg-white text-brown"
      }`}
    >
      <div className="container relative pb-8 mb-16 false">
        <h2 className={"mb-8 text-2xl text-center text-inherit"}>{title}</h2>
        <div className={"text-center style-inner-text"}>
          <RichText
            content={richText}
            className={`mt-4 space-y-4 text-[1rem] text-inherit`}
          />
        </div>
      </div>
      <div className="relative"></div>
    </section>
  );
};
