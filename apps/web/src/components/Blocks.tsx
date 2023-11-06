"use client";

import React, { Fragment } from "react";

import { Page, Test } from "payload-types";
import { toKebabCase } from "@/utilities/toKebabCase";

import { RichTextBlock } from "./blocks/RichTextBlock";
import { HeroBlock } from "./blocks/HeroSliderBlock";
import { HeaderBannerBlock } from "./blocks/HeaderBannerBlock";
import { HeroFullWidthBlock } from "./blocks/HeroFullWidthBlock";
import { CardCarouselBlock } from "./blocks/CardCarouselBlock";
import { OurTeamBlock } from "./blocks/OurTeamBlock";
import { SliderSplitBlock } from "./blocks/SliderSplitBlock";
import { GalleryBlock } from "./blocks/GalleryBlock";
import { DuskTestimonialsBlock } from "./blocks/DuskTestimonialBlock";
import { ContentBlock } from "./blocks/ContentBlock";
import { FaqBlock } from "./blocks/FaqBlock";
import { FullPageBlock } from "./blocks/FullPageBlock";
import { CarouselBlock } from "./blocks/CarouselBlock";
import { CustomProductBlock } from "./blocks/CustomProductBlock";
import { ProductBlock } from "./blocks/ProductBlock";
import { ThreeColProductBlock } from "./blocks/ThreeColProductsBlock";
import { FourBlock } from "./blocks/FourBlock";
import { TimelineBlock } from "./blocks/TimelineBlock";
import { AccreditationBlock } from "./blocks/AccreditationBlock";
import { BreadcrumbsBlock } from "./blocks/BreadcrumbsBlock";
import { ContactBlock } from "./blocks/ContactBlock";
import { NewsletterBlock } from "./blocks/NewsletterBlock";
import { TestimonialBlock } from "./blocks/TestimonialBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { TableCarouselBlock } from "./blocks/TableCarouselBlock";
import { GetInTouchBlock } from "./blocks/GetInTouchBlock";
import { TestBlock } from "./blocks/TestBlock";
import { BlogArchiveBlock } from "./blocks/BlogArchiveBlock";
import { CmxCarouselBlock } from "./blocks/CmxCarouselBlock";
import { PrivateLabellingBlock } from "./blocks/PrivateLabellingBlock";

const blockComponents = {
  // blockType: ComponentName //
  richTextBlock: RichTextBlock,
  heroBlock: HeroBlock,
  headerBannerBlock: HeaderBannerBlock,
  cardCarouselBlock: CardCarouselBlock,
  ourTeamBlock: OurTeamBlock,
  sliderSplitBlock: SliderSplitBlock,
  galleryBlock: GalleryBlock,
  heroFullWidthBlock: HeroFullWidthBlock,
  duskTestimonialBlock: DuskTestimonialsBlock,
  contentBlock: ContentBlock,
  faqBlock: FaqBlock,
  fullPageBlock: FullPageBlock,
  carouselBlock: CarouselBlock,
  customProductBlock: CustomProductBlock,
  productBlock: ProductBlock,
  threeColProductBlock: ThreeColProductBlock,
  fourBlock: FourBlock,
  timelineblock: TimelineBlock,
  accreditationBlock: AccreditationBlock,
  breadcrumbsBlock: BreadcrumbsBlock,
  contactBlock: ContactBlock,
  newsletterBlock: NewsletterBlock,
  testimonialBlock: TestimonialBlock,
  videoBlock: VideoBlock,
  tableCarouselBlock: TableCarouselBlock,
  getInTouchBlock: GetInTouchBlock,
  testBlock: TestBlock,
  blogArchiveBlock: BlogArchiveBlock,
  cmxCarouselBlock: CmxCarouselBlock,
  privateLabelingBlock: PrivateLabellingBlock,
};

export type blockNum = {
  blockNum: number;
};

export const Blocks: React.FC<{
  blocks: Page["layout"] | Test["layout"];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <main className="space-y-4 md:space-y-8 lg:space-y-16">
        {blocks.map((block, index) => {
          const { blockName, blockType } = block;
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];
            const prevBlock = blocks[index - 1];
            const nextBlock = blocks[index + 1];
            console.log(blockType);
            if (Block) {
              return (
                <Fragment key={index}>
                  {/* <p>{blockType}</p> */}
                  {/* @ts-ignore */}
                  <Block
                    // @ts-ignore
                    id={toKebabCase(blockName)}
                    {...block}
                  />
                </Fragment>
              );
            }
          }
          return null;
        })}
      </main>
    );
  }

  return null;
};
