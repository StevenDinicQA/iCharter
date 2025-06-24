import { CheckIcon } from "@/components/shared/general/atoms/icons/CheckIcon";
import { StepProps } from "./types";

export const Step = ({ number, isActive, isComplete }: StepProps) => {
  return (
    <div
      className={`${
        isActive || isComplete
          ? "text-white bg-[#2D3AAF]"
          : "text-[#7f7f7f] border border-[#7f7f7f]"
      } text-[16px] w-[38px] h-[38px] flex justify-center items-center rounded-full`}
    >
      {isComplete ? <CheckIcon size={18} stroke="white" /> : number}
    </div>
  );
};
