import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./carousel.css";
import { Pagination, Navigation } from "swiper/modules";
import { CarouselNavButtons } from "./CarouselNavButtons";
import Image from "next/image";

import carousel1 from "../../../assets/images/carousel1.png";
import carousel3 from "../../../assets/images/carousel3.png";
import carousel4 from "../../../assets/images/carousel4.png";
import carousel5 from "../../../assets/images/carousel5.png";
import carousel6 from "../../../assets/images/carousel6.png";

function IcharterCarousel() {
  const carouselImages = [
    { src: carousel1 },
    { src: carousel3 },
    { src: carousel4 },
    { src: carousel5 },
    { src: carousel6 },
    { src: carousel1 },
    { src: carousel3 },
    { src: carousel4 },
    { src: carousel5 },
    { src: carousel6 },
    { src: carousel1 },
    { src: carousel3 },
    { src: carousel4 },
    { src: carousel5 },
    { src: carousel6 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  // Calculate opacity dynamically based on distance from the active slide
  const calculateOpacity = (index: number) => {
    const distance = Math.abs(activeIndex - index);
    if (distance === 0 || distance === 1 || distance === -1)
      return 1; // Active slide
    else if (distance === 2 || distance === -2) return 0.5; // Near the center
    else return 0.2; // Further away
  };

  return (
    <section className="relative w-full overflow mt-12 md:mb-0 overflow-hidden no-scroll-x">
      <div className="relative flex flex-col items-center">
        <h2 className="text-center text-xl font-bold mb-3">
          Are you ready for an adventure?
        </h2>
        <p className="text-sm text-[#707070] w-full max-w-[300px] text-center">
          Tag{" "}
          <span
            className="text-sm text-[#2D3AAF] font-bold"
            test-id="home_social-tag"
          >
            #iCharterBooking
          </span>{" "}
          on social for the chance to be featured here!
        </p>
      </div>
      <div className="flex justify-center w-screen overflow-hidden">
        <div className="mt-10 w-[1800px]">
          <Swiper
            slidesPerView={7}
            centeredSlides={true}
            spaceBetween={16}
            modules={[Pagination, Navigation]}
            onSlideChange={handleSlideChange}
            grabCursor={true}
            loop={true}
          >
            {carouselImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  className={`swiper-image ${
                    activeIndex === index ? "centered-slide" : "small-slide"
                  }`}
                  src={image.src}
                  alt={`Nature ${index + 1}`}
                  quality={100}
                  style={{ opacity: calculateOpacity(index) }}
                />
              </SwiperSlide>
            ))}

            <div className="swiper-nav-container">
              <CarouselNavButtons />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default IcharterCarousel;
