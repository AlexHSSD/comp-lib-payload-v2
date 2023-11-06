import React from "react";
import { Test } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

export type GetInTouchBlockProps = Extract<
  Test["layout"][0],
  { blockType: "getInTouchBlock" }
>;

export const GetInTouchBlock: React.FC<GetInTouchBlockProps & blockNum> = ({
  blockNum,
  getInTouchBlockFields: { title, richText, links },
  blockName = "GetInTouchBlock",
}) => {
  return (
    <section id={blockName} className="bg-brandTeal text-white px-10 py-16">
      <div className="container">
        <h2 className="text-center mb-4 font-bold">
          {title ? title : "Join our newsletter"}
        </h2>
        <div className="container lg:px-40">
          <RichText
            content={richText}
            className={"text-center lg:px-20 text-sm mb-8"}
          />
        </div>
        {links && (
          <div className={`flex flex-wrap gap-4 justify-center`}>
            {links.map(({ link }, index) => {
              return <CMSLink {...link} key={index} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};
