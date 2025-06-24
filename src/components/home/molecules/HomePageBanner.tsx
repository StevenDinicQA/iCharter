import React from "react";
import SearchBarContainer from './SearchBarContainer';
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

function HomePageBanner() {
  const isResponsive = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full h-[430px] relative -top-[83px] md:-top-[155px] -mb-[64px] md:-mb-[126px] flex flex-col items-center rounded-b-[28px] md:rounded-none bg-[#2D3AAF]">
      <div className="flex justify-center w-full">
      <Image
        src="/imgs/background_rod.png"
        fill
        alt="rod"
        priority
        className="absolute mx-auto max-w-[1024px] z-0 object-cover rounded-b-[28px] md:rounded-none"
      />

      <div className={`relative flex flex-col md:mt-[118px] pt-[92px] pb-4 max-w-[1200px] mx-0 md:mx-4 w-full ${isResponsive ? "w-full px-4" : "" }`}>
        <div className="w-full">
          <h1 className={`text-white text-2xl md:text-5xl text-start mb-2 font-bold`}>
            Choose your next memory
          </h1>
          <h3 className="text-sm mb-3 md:mb-6 md:text-xl text-[#CECECE] text-start">
            Find the right experience in just one click.
          </h3>
        </div>
        <SearchBarContainer isResponsive={isResponsive} />
      </div>
      </div>
    </div>
  );
}

export default HomePageBanner;
