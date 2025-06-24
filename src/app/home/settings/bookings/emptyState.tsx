"use client";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { EmptyStateProps } from "./types";

const EmptyState = ({ isMobile }: EmptyStateProps) => {
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <div>
          <Image
            src={"/svgs/fish-swimming.svg"}
            alt="fish-swimming"
            width={157}
            height={157}
          />
        </div>
        <div>
          <h3 className="text-[#454545] font-medium leading-4 text-center text-lg">
            You don&apos;t have any bookings yet!
          </h3>
        </div>
        <div className="max-w-[426px]">
          <p className="font-normal leading-5 text-[#BDBDBD] text-center text-base">
            Go to the marketplace and start booking some great experiences!
          </p>
        </div>
      </div>
      <div className="mt-6 items-center flex flex-col">
        <Link href={"/market"}>
          <button
            className={`text-center bg-[#2D3AAF] border ${
              isMobile ? "rounded-xl" : "rounded-lg"
            } text-white font-medium text-sm leading-3 px-[24px] py-[14px] ${
              !isMobile && "h-[47px]"
            }`}
          >
            Go to marketplace
          </button>
        </Link>
      </div>
    </>
  );
};

export default EmptyState;
