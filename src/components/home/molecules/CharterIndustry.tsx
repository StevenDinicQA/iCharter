import Image from "next/image";
import React from "react";
import { useMediaQuery } from "@mui/material";
import iCharter from "@/assets/svgs/iCharter.svg";
import DecorativeShapes from "../atoms/DecorativeShapes";
import DecorativeShapesMobile from "../atoms/DecorativeShapesMobile";
import DecorativeShapesDarkMobile from "../atoms/DecorativeShapesDarkMobile";

function CharterIndustry() {
  const isResponsive = useMediaQuery("(max-width: 1023px)");
  const isMediumSizedDevice = useMediaQuery("(min-width: 820px) and (max-width: 1023px)")

  return (
    <section className="relative w-full overflow md:mb-0 lg:h-[900px] overflow-hidden no-scroll-x">
      <div className={`relative flex flex-col items-center ${isMediumSizedDevice && 'px-[12px]'}`}>
        <h2
          className={`text-center text-3xl  md:text-5xl text-[#454545] font-medium z-10 md:w-full ${
            isResponsive ? "w-[291px] mx-auto mt-10 mb-3" : "mt-[60px]"
          }`}
        >
          Reinventing the charter industry
        </h2>
        <h4
          className={`text-center text-xl mt-3 z-10 md:w-full ${
            isResponsive ? "w-[255px] mx-auto mb-5" : ""
          }`}
        >
          Reimagining how charters and customers connect
        </h4>
      </div>
      {!isResponsive && (
        <div className="absolute top-0 left-0 w-[2509px] h-[732px] z-0">
          <Image
            src="/imgs/icons_blur.png"
            alt="icons"
            fill
            priority
            className="transform translate-x-[22%] z-0"
          />
        </div>
      )}

      <div className="relative flex flex-col justify-center items-center">
        <div className="flex flex-col lg:flex-row w-full items-center justify-center md:mt-[60px] mb-[60px] z-10 px-3 md:px-0">
          <div className={`w-full max-w-[375px] ${isResponsive ? 'max-w-[351px]' : ''}`}>
            <div className="mx-[20px] aspect-[1.09] relative">
              <Image src="/svgs/charter_steps.svg" fill alt="charter steps" />
            </div>
            <div>
              <div className={`flex items-center justify-around mt-[36px] mb-[32px] lg:mt-2 lg:mb-0 relative ${isResponsive ? 'max-w-[351px]' : ''}`}>
                <div className="lg:hidden absolute left-[56px]">
                  <DecorativeShapesMobile />
                </div>
                <div className="pl-8 lg:pl-0">
                  <h3
                    className={`font-medium text-2xl text-[#454545] ${
                      isResponsive
                        ? "w-[160px] mx-auto mb-2"
                        : "mb-4 text-center"
                    }`}
                  >
                    Charters
                  </h3>
                  <p
                    className={`text-sm text-[#454545] ${
                      isResponsive
                        ? "w-[160px] mx-auto"
                        : "w-[220px] text-center"
                    }`}
                  >
                    Publish on the marketplace all type of experiences in a few
                    simple steps!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`w-full max-w-[375px] ${isResponsive ? 'max-w-[351px]' : ''}`}>
            <div className="mx-[20px] aspect-[1.09] relative">
              <Image src="/svgs/icharter_step.svg" fill alt="iCharter" />
            </div>
            <div className={`flex items-center justify-around mt-[27px] mb-[27px] lg:mt-2 lg:mb-0 relative ${isResponsive ? 'max-w-[351px]' : ''}`}>
              <div className="lg:hidden absolute left-[56px]">
                <DecorativeShapesDarkMobile />
              </div>
              <div className="pl-8 lg:pl-0">
                <h3
                  className={`font-medium text-2xl text-[#454545] ${
                    isResponsive ? "w-[160px] mx-auto mb-2" : "text-center mb-4"
                  }`}
                >
                  iCharter
                </h3>
                <p
                  className={`text-sm text-[#454545] ${
                    isResponsive
                      ? "w-[160px] mx-auto"
                      : "w-[240px] text-center mx-auto"
                  }`}
                >
                  Connecting charter and customer needs through technology and
                  innovative features
                </p>
              </div>
            </div>
          </div>
          <div className={`w-full max-w-[375px] ${isResponsive ? 'max-w-[351px]' : ''}`}>
          <div className="mx-[20px] aspect-[1.09] relative">
              <Image src="/svgs/charter_steps.svg" fill alt="charter steps" />
          </div>
            <div className={`flex items-center justify-around mt-[27px] mb-[27px] lg:mt-2 lg:mb-0 relative ${isResponsive ? 'max-w-[351px]' : ''}`}>
              <div className="lg:hidden absolute left-[56px]">
                <DecorativeShapesMobile />
              </div>
              <div className="pl-8 lg:pl-0">
                <h3
                  className={`font-medium text-2xl text-[#454545] ${
                    isResponsive ? "w-[180px] mx-auto mb-2" : "text-center mb-4"
                  }`}
                >
                  Customers
                </h3>
                <p
                  className={`text-sm text-[#454545] ${
                    isResponsive
                      ? "w-[180px] mx-auto"
                      : "w-[265px] text-center"
                  }`}
                >
                  Experience just bending a rod or catching the fish of a
                  lifetime. Watch some dolphins or dinner on the water
                </p>
              </div>
            </div>
          </div>
        </div>
        {!isResponsive && <DecorativeShapes />}
      </div>
    </section>
  );
}

export default CharterIndustry;
