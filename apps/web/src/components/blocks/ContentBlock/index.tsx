import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { Media } from "@/components/Media";
import StandardBlock from "@/components/blocks/ContentBlock/blocks/StandardBlock";
import QuoteBlock from "@/components/blocks/ContentBlock/blocks/QuoteBlock";
import MediaBlock from "@/components/blocks/ContentBlock/blocks/MediaBlock";

const blockComponents = {
  // blockType: ComponentName //
  standardBlock: StandardBlock,
  quoteBlock: QuoteBlock,
  mediaBlock: MediaBlock,
};

export type ContentBlockProps = Extract<
  Page["layout"][0],
  { blockType: "contentBlock" }
>;

export const ContentBlock: React.FC<ContentBlockProps & blockNum> = ({
  blockNum,
  contentBlockFields: { leftLayout: leftBlocks, rightLayout: rightBlocks },
  blockName = "ContentBlock",
}) => {
  const hasLeftBlocks =
    leftBlocks && Array.isArray(leftBlocks) && leftBlocks.length > 0;

  const hasRightBlocks =
    rightBlocks && Array.isArray(rightBlocks) && rightBlocks.length > 0;

  return (
    <section
      id={blockName}
      className="relative grid flex-wrap items-center justify-center p-10 overflow-hidden md:grid-cols-2 md:items-stretch gap-y-2 gap-x-5 lg:p-20"
    >
      {hasLeftBlocks &&
        leftBlocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];
            if (Block) {
              return (
                <React.Fragment key={index}>
                  {/* @ts-ignore */}
                  <Block
                    // @ts-ignore
                    id={blockType}
                    {...block}
                  />
                </React.Fragment>
              );
            }
          }
          return null;
        })}

      {hasRightBlocks &&
        rightBlocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <React.Fragment key={index}>
                  {/* @ts-ignore */}
                  <Block
                    // @ts-ignore
                    id={blockType}
                    {...block}
                  />
                </React.Fragment>
              );
            }
          }
          return null;
        })}
    </section>
  );
};
