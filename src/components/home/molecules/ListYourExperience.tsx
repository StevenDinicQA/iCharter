import Image from "next/image";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

function ListYourExperience() {

  const { user } = useAuthContext();

  return (
    <section className="relative w-full mt-[54px] h-[345px] lg:h-[467px] flex flex-col items-center bg-[#11153E] overflow-hidden">
      <Image
        src="/imgs/background_list_your_boat.png"
        width={1920}
        height={208}
        alt="list your boat"
        priority
        className="h-[208px] object-cover absolute -bottom-8 lg:bottom-0"
      />
      <div className="w-full flex-col lg:flex-row justify-center items-center text-left lg:text-left flex absolute z-1">
        <div className="flex items-start justify-center md:flex-1">
          <div
            className="flex flex-col items-center w-full px-6 mb-10"
          >
            <p className="font-bold text-xl lg:text-[40px] text-white mt-[42px]">
              Are you a Captain ?
            </p>
            <h3 className="text-base font-medium lg:text-2xl text-white mt-5">
              List your experience!
            </h3>
            <p className="text-xs text-center my-1 lg:my-3 text-[#E3E3E3]">
              List your boat on iCharter and be able to sell all the experiences you have to offer!
            </p>
            {(user && user.charterProfile || !user) && (
              <Link href={user && user.charterProfile ? "/home/listings/new" : "/auth/sign-up"}>
                <button
                  className="flex items-center gap-2 text-sm text-[#2D3AAF] font-medium py-3 px-7 rounded-xl h-10 bg-white hover:bg-[#d6d9f5]"
                  test-id="home_list-boat"
                >
                  <p>List your boat</p>
                  <ArrowForwardIcon />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListYourExperience;
