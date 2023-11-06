import React from "react";
import { Page } from "payload-types";
import { Media } from "@/components/Media";
import { CMSLink } from "@/components/Link";

type Props = Extract<Page["layout"][0], { blockType: "heroFullWidthBlock" }>;

const layouts = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export const HeroFullWidthBlock = (props: Props) => {
  const { heroFullWidthBlockFields } = props;
  if (!heroFullWidthBlockFields) return null;

  const {
    links,
    media,
    icon,
    layout,
    title,
    text,
    overlayicon,
    color,
    heroBanner,
  } = heroFullWidthBlockFields;

  let functionName = "HeroFullWidthBlock";

  return (
    <section id={functionName} className={`relative z-20 pt-24 w-full`}>
      <div className="absolute top-0 w-full h-full -z-10">
        <div
          className={`relative w-full h-full before:bg-white before:bg-opacity-50 before:z-10 before:absolute before:w-full before:h-full md:before:hidden`}
        >
          {media && typeof media !== "string" && (
            <Media
              resource={media}
              priority={true}
              sizes="100vw"
              fill={true}
              imgClassName={`absolute bottom-0 object-cover ${
                heroBanner === true ? "" : "top-0"
              }`}
            />
          )}
        </div>
      </div>
      <div
        className={`${
          heroBanner === true ? "min-h-[600px]" : "min-h-[500px]"
        } relative py-24 container flex flex-col ${
          color === "black" ? "text-black" : "text-green-400"
        } ${layouts[layout || "left"]}`}
      >
        <div className="flex justify-center max-w-full">
          {icon && typeof icon !== "string" && (
            <div className="w-[100px] h-[100px] relative">
              <Media
                resource={icon}
                sizes="100px"
                priority={true}
                fill={true}
              />
            </div>
          )}
        </div>
        {title && <h1 className={`font-medium md:text-4xl`}>{title}</h1>}
        {text && <p className={`max-w-md mt-4 leading-tight`}>{text}</p>}

        {links && (
          <div className="flex mt-12 space-x-4">
            {links.map(({ link }, index) => (
              <CMSLink {...link} key={index} />
            ))}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 z-10 transform translate-x-1/2 translate-y-1/2 right-1/2 w-11 h-11">
        {overlayicon && typeof overlayicon !== "string" && (
          <div className="w-[100px] h-[100px] relative">
            <Media resource={overlayicon} sizes="100vw" priority={true} />
          </div>
        )}
      </div>
    </section>
  );
};
