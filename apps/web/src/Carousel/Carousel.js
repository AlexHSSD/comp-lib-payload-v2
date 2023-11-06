'use client';
import React, { useState, useCallback } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const Carousel = ({ paddingPct = 0, paddingLeft = 20, paddingRight = 20, items = [], className = '' }) => {
  const percent = paddingPct;
  const [padding, setPadding] = useState(0);

  const renderDotsItem = ({ isActive }) => {
      return <div className={`h-4 w-4 rounded-full mx-1 border border-white cursor-pointer ${isActive && 'bg-brandGreen'}`} />
  };

  const measuredRef = useCallback(node => {
    if (node !== null && node !== undefined ) {
      setPadding(node.offsetWidth * percent);
    }
    return node
  }, [percent]);

  const resizeCheckPercent = useCallback( () => {
    measuredRef();
  }, [measuredRef])

  return (
    <div ref={measuredRef} className={`wideSpacing ${className}`}>
      <Swiper
        spaceBetween={50}
        slidesPerView={"auto"}
      >
        {items.map( (item, index) => <SwiperSlide className="max-w-sm" key={index}>{item}</SwiperSlide>)}
      </Swiper>
      {/* <AliceCarousel
        mouseTracking
        items={items} 
        paddingRight={paddingPct ? padding : paddingRight }
        paddingLeft={paddingPct ? padding : paddingLeft}
        onResized={resizeCheckPercent}
        disableButtonsControls={true}
        renderDotsItem={renderDotsItem}
        // autoPlay
        autoPlayStrategy="none"
        autoPlayInterval={5000}
      /> */}
    </div>
  );
};

export default Carousel
