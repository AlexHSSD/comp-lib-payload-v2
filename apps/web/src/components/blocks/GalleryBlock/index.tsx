"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

import { Page } from "payload-types";
import { Media } from "@/components/Media";
import { blockNum } from "@/components/Blocks";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

export type GalleryBlockProps = Extract<
  Page["layout"][0],
  { blockType: "galleryBlock" }
>;

let functionName = "GalleryBlock";

export const GalleryBlock: React.FC<GalleryBlockProps & blockNum> = ({
  blockNum,
  galleryBlockFields: { images },
}) => (
  <section id={functionName} className="relative z-10 py-8 text-white lg:py-16">
    <Swiper
      navigation={true}
      modules={[Pagination, Navigation]}
      className="gallery"
      slidesPerView={1.2}
      centeredSlides={true}
      spaceBetween={20}
      breakpoints={{
        640: {
          spaceBetween: 40,
          slidesPerView: 1.4,
        },
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
    >
      {images &&
        images.map(({ media }, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full overflow-hidden rounded-lg cursor-auto aspect-video">
              {media && typeof media !== "string" && <Media resource={media} />}
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  </section>
);
