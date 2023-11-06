import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";

export type RichTextBlockProps = Extract<
  Page["layout"][0],
  { blockType: "richTextBlock" }
>;

export const RichTextBlock: React.FC<RichTextBlockProps & blockNum> = ({
  blockNum,
  richTextBlockFields: { align, backgroundColor, richText, links },
}) => {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const flexAlignment = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const backgrounds = {
    black: "bg-black text-white",
    white: "bg-white",
    none: "",
  };

  return (
    <section
      id={`richTextBlock-${blockNum}`}
      className={`py-4 mt-12 ${alignment[align ?? "left"]} ${
        backgrounds[backgroundColor || "none"]
      }`}
    >
      <div className="container py-12 lg:py-20">
        <RichText content={richText} className={"space-y-4"} />
        {links && (
          <div
            className={`flex flex-wrap gap-4 ${flexAlignment[align ?? "left"]}`}
          >
            {links.map(({ link }, index) => (
              <CMSLink {...link} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
