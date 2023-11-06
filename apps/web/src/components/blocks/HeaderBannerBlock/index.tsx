import React from "react";
import { Page } from "payload-types";
import { blockNum } from "@/components/Blocks";

export type HeaderBannerBlockProps = Extract<
  Page["layout"][0],
  { blockType: "headerBannerBlock" }
>;

export const HeaderBannerBlock: React.FC<HeaderBannerBlockProps & blockNum> = ({
  blockNum,
  headerBannerBlockFields: { title },
  blockName = "HeaderBannerBlock",
}) => {
  return (
    <section id={blockName} className="bg-brandGrey">
      <div className={`relative pt-24 pb-4`}>
        <div className="container">
          <h1 className="text-4xl font-bold text-center text-white md:text-left">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};
