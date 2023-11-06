"use client";

import * as React from "react";
import { Page } from "payload-types";
import { blockNum } from "@/components/Blocks";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

export type DuskTestimonialsBlockProps = Extract<
  Page["layout"][0],
  { blockType: "duskTestimonialsBlock" }
>;

let functionName = "CustomProductBlock";

export const DuskTestimonialsBlock: React.FC<
  DuskTestimonialsBlockProps & blockNum
> = ({ blockNum, duskTestimonialsBlockFields: { testimonials } }) => (
  <section
    id={functionName}
    className="relative z-10 flex items-center flex-none flex-shrink-0 bg-mustard-400"
  >
    <div className="container relative z-10 px-0 py-16 mx-auto md:px-6 md:py-32 lg:py-64 testimonials-carousel">
      <Swiper
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="testimonials"
        autoplay={true}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
      >
        {testimonials &&
          testimonials.map(({ testimonial, name }, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex h-full px-8 my-auto md:px-28">
                  <div className="flex flex-col items-center justify-center gap-4 mx-auto text-center lg:max-w-5xl break-word">
                    <p className="text-lg font-bold md:text-xl font-primary lg:text-3xl">
                      {testimonial}
                    </p>
                    <p className="text-base md:text-lg lg:text-xl">
                      &ndash; {name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  </section>
);
