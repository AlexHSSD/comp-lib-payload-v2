"use client";
import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { Media } from "@/components/Media";
import Carousel from "@/components/Carousel/Carousel";
import { Classnames } from "react-alice-carousel";
import { CMSLink } from "@/components/Link";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Link from "next/link";

export type OurTeamBlockProps = Extract<
  Page["layout"][0],
  { blockType: "ourTeamBlock" }
>;

const MemberCard = (props) => {
  const { media, name, job, linkedin } = props;
  if (!media || typeof media === "string") return null;

  const content = (
    <>
      <div className="relative overflow-hidden">
        {media && typeof media !== "string" && (
          <Media
            resource={media}
            sizes="100vh"
            imgClassName="mx-auto group-hover/member:scale-105 transition-transform"
          />
        )}
      </div>
      <div className="flex flex-col gap-4 p-4 bg-brandGrey">
        {name && (
          <h3 className="h-[2em] text-center relative justify-center text-white">
            {name}
          </h3>
        )}
        {job && (
          <p className="h-[3em] text-center relative justify-center text-brandGreen">
            {job}
          </p>
        )}
      </div>
    </>
  );
  const wrapperClassnames =
    "w-full max-w-[360px] bg-brandGrey rounded-2xl overflow-hidden text-white";
  return linkedin ? (
    <Link
      href={linkedin}
      className={`${wrapperClassnames} group/member block`}
      target="_blank"
    >
      {content}
    </Link>
  ) : (
    <div className={wrapperClassnames}>{content}</div>
  );
};

export const OurTeamBlock: React.FC<OurTeamBlockProps & blockNum> = ({
  blockNum,
  ourTeamBlockFields: { member, title, richText },
  blockName = "OurTeamBlock",
}) => {
  return (
    <section
      id={blockName}
      className={`relative py-8 lg:pb-40 z-10 mb-10 mt-20 px-4`}
    >
      <div className="px-20 mb-10 text-center lg:px-80">
        {title && <h2 className="mb-5">{title}</h2>}
        {richText && (
          <RichText
            content={richText}
            className={"text-inherit text-center mb-8 text-sm space-y-2"}
          />
        )}
      </div>
      <div
        className={`containerDesktop hidden gap-2 md:flex items-center justify-center flex-wrap lg:gap-4 mt-8 md:mt-16`}
      >
        {member &&
          member.map((card, index) => <MemberCard {...card} key={index} />)}
      </div>

      {/* Wrapper for slides */}
      <div className="relative md:hidden">
        <Swiper
          className="!pb-[50px]"
          // @ts-ignore
          spaceBetween={20}
          slidesPerView={1.2}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            500: {
              slidesPerView: 2.2,
            },
          }}
        >
          {member.map((card, index) => (
            <SwiperSlide key={index}>
              <MemberCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
