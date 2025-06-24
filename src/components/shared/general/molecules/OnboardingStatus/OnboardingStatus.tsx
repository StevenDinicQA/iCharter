import { AppIcon } from "../../atoms/icons/AppIcon";
import Link from "next/link";
import { OnboardinStatusProps } from "./types";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CheckIcon } from "../../atoms/icons/CheckIcon";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";

export const OnboardingStatus = ({ isSecondStep }: OnboardinStatusProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="absolute bottom-0 right-0">
      <button
        className="m-[30px] w-[60px] h-[60px] bg-blue-normal rounded-full flex justify-center items-center drop-shadow-lg"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="transform translate-x-[-1px]">
          <AppIcon size={27} />
        </div>
      </button>
      {isOpen && (
        <div className="text-[#454545] p-[38px] w-[calc(100vw-20px)] box-border lg:w-[329px] max-w-[329px] mx-[10px] lg:ml-[30px] bg-white rounded-[12px] drop-shadow-lg flex flex-col items-center absolute top-0 right-[10px] transform -translate-y-full ">
          <div className="m-[10px] absolute top-0 right-0">
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <h4 className="text-[20px] font-[500] mb-[21px]">
            Let’s get started!
          </h4>
          <div className="w-full mb-[36px] flex gap-[11px] items-center">
            <p className="text-[16px] font-[500]">
              {isSecondStep ? "40%" : "0%"}
            </p>
            <div className="w-full h-[6px] bg-[#E0E2F0] rounded-full grow-1">
              <div
                className={`${
                  isSecondStep ? "w-5/12" : "w-[0%]"
                } h-full bg-blue-normal rounded-full`}
              ></div>
            </div>
          </div>
          <div className="w-full mb-[19px] flex items-center gap-[8px]">
            <div
              className={`text-blue-normal min-w-[31px] w-[31px] h-[31px] ${
                isSecondStep ? "bg-blue-normal" : "bg-[#E0E2F0]"
              } rounded-full flex justify-center items-center border border-blue-normal`}
            >
              {isSecondStep ? <CheckIcon size={16} stroke="white" /> : "1"}
            </div>
            <p className="w-full text-[16px] font-[500] text-blue-normal text-center py-[9px] bg-[#F9F9F9] rounded-[12px]">
              Complete your profile
            </p>
          </div>
          <div className="w-full flex items-center gap-[8px]">
            <div
              className={`${
                !isSecondStep && "opacity-50"
              } text-blue-normal min-w-[31px] w-[31px] h-[31px] bg-[#E0E2F0] rounded-full flex justify-center items-center border border-blue-normal`}
            >
              2
            </div>
            <p
              className={`w-full text-[16px] ${
                isSecondStep ? "text-blue-normal" : "text-[#7575759E]"
              } font-[500] text-center py-[9px] bg-[#F9F9F9] rounded-[12px]`}
            >
              Publish a listing
            </p>
          </div>
          <Button
            text="Get Onboard!"
            href={isSecondStep ? "/home/listings/new" : "/home/onboarding"}
            className="mt-[37px]"
          />
        </div>
      )}
    </div>
  );
};
