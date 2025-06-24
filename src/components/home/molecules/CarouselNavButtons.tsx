import React from "react";
import { useSwiper } from "swiper/react";
import { useMediaQuery } from "@mui/material";

export const CarouselNavButtons = () => {
  const swiper = useSwiper();
  const isResponsive = useMediaQuery("(max-width: 1024px)");

  return (
    <div
      className={`swiper-nav-btns flex justify-between ${
        isResponsive ? "w-[350px]" : "w-[450px]"
      }`}
    >
      <button
        test-id="home_swiper_left-button"
        onClick={() => swiper.slidePrev()}
        style={{ position: "relative" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
        >
          <circle cx="19.5" cy="19.5" r="19.5" fill="black" fillOpacity="0.4" />
        </svg>
        <svg
          style={{ position: "absolute", top: "7px", left: "5px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <button
        test-id="home_swiper_right-button"
        onClick={() => swiper.slideNext()}
        style={{ position: "relative" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
        >
          <circle cx="19.5" cy="19.5" r="19.5" fill="black" fillOpacity="0.4" />
        </svg>
        <svg
          style={{ position: "absolute", top: "7px", left: "7px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};
