import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

export type AccreditationBlockProps = Extract<
  Page["layout"][0],
  { blockType: "accreditationBlock" }
>;

export const AccreditationBlock: React.FC<
  AccreditationBlockProps & blockNum
> = ({
  blockNum,
  accreditationBlockFields: { title, accreditations },
  blockName = "AccreditationBlock",
}) => {
  return (
    <section id={blockName} className="container my-16">
      <div className="container">
        {title && <h2 className="mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-2 gap-2 p-4 mt-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 lg:mt-8">
          {accreditations &&
            accreditations.map(({ media, title }, index) => (
              <div key={index} className="p-2 col">
                <div className="relative">
                  {media && typeof media !== "string" && (
                    <Media
                      resource={media}
                      sizes="100vh"
                      imgClassName="mx-auto mb-2"
                    />
                  )}
                  {title && (
                    <h2 className="relative justify-center mb-8 text-center">
                      {title}
                    </h2>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
