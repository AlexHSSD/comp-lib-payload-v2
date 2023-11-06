import React from "react";
import { Page } from "payload-types";
import { buttonClasses } from "@/components/Button/buttonClasses";
import { Media } from "@/components/Media";
import { RichText } from "@/components/RichText";
import Image from "next/image";
import { CMSLink } from "@/components/Link";

type Props = Extract<Page["layout"][0], { blockType: "fullPageBlock" }>;

export const FullPageBlock = (props: Props) => {
  const { fullPageBlockFields } = props;
  if (!fullPageBlockFields) return null;

  let functionName = "FullPageBlock";

  const { links, title, richText, icon, background, divider } =
    fullPageBlockFields;

  const bgClasses = {
    green: "brandGreen",
    grey: "bg-grey-100 text-[#4f6c55]",
    none: "text-black",
  };

  const dividerClasses = {
    yes: "container pb-8 mb-8 relative after:absolute after:h-px after:w-[66px] after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:bg-brown",
    no: "container w-full py-12",
  };

  return (
    <section
      id={functionName}
      className={`relative py-8 w-full ${divider === "yes" ? "lg:pt-12" : ""} ${
        bgClasses[background || "none"]
      }`}
    >
      <div className={`py-12 ${dividerClasses[divider || "no"]}`}>
        {icon && typeof icon !== "string" && (
          <div className="w-12 h-12 mx-auto mb-8">
            <Media
              resource={icon}
              imgClassName={"w-full h-full"}
              priority={true}
            />
          </div>
        )}
        <h2 className="mb-8 text-2xl text-center">{title}</h2>
        <div className="text-center style-inner-text">
          <RichText content={richText} className={`space-y-4`} />
        </div>
        {links && (
          <div className="flex justify-center mt-12 space-x-4">
            {links.map(({ link }, index) => (
              <CMSLink {...link} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
