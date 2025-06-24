import React from "react";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import moment from "moment";

function IcharterBid() {
  const isResponsive = useMediaQuery("(max-width: 1023px)");
  const isSmallDesktop = useMediaQuery("(min-width: 1024px)");
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("YYYY-MM-DD");

  return (
    <section
      id="icharter-bid"
      className="relative flex rounded-2xl items-center justify-center mb-5 w-full h-[280px] lg:mb-[52px] overflow-hidden lg:max-w-[1200px]"
      style={{ width: 'calc(100% - 32px)' }}
    >
      <div className="z-0 bg-black">
        <Image
          src="/imgs/background_icharterbid.png"
          fill
          alt="icharterbid background"
          priority
          className="w-full object-cover"
        />
        <Image
          src="/imgs/background_left_icharterbid.png"
          alt="icharterbid background"
          priority
          width={133}
          height={255}
          className="absolute top-0 -left-16 md:-left-8 lg:-left-4 h-full"
        />
        <Image
          src="/imgs/background_right_icharterbid.png"
          alt="icharterbid background"
          priority
          width={129}
          height={255}
          className="absolute top-0 -right-16 md:-right-8 lg:-right-4 h-full"
        />
      </div>
      <div
        className="relative w-full h-[212px] lg:h-[297px] flex flex-col justify-center items-center"
      >
        <Image
          src="/svgs/icharterbid.svg"
          alt="icharterbid"
          priority
          width={isSmallDesktop ? 142 : 118}
          height={isSmallDesktop ? 52 : 46}
          className="mb-1"
        />

        <div
          className="flex flex-col items-center w-full mx-2"
        >
          <p
            className="text-white w-full font-bold text-xl lg:text-[32px] max-w-[220px] md:max-w-[400px] lg:max-w-[600px] text-center leading-normal mb-4"
          >
            Last-minute charters at below advertised rates
          </p>
          <Link
            role="button"
            href={`/market?dateFrom=${formattedDate}&isBid`}
            className="flex items-center text-[#090B1F] text-sm font-medium py-2 px-4 min-h-8 rounded-lg bg-[#2DD9C3] hover:bg-[#21b5a2]"
          >
            Place a Bid
          </Link>
        </div>
      </div>
    </section>
  );
}

export default IcharterBid;
