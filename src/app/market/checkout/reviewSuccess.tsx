import React from "react";
import Image from "next/image";

const ReviewSuccess = () => {
  return (
    <div className="w-full sm:w-[321px] h-[419px] lg:w-[777px] md:h-[466px] flex items-center justify-center bg-indigo-50 rounded-xl py-[35px] px-[30px]">
      <div className="flex flex-col gap-[0.75rem] items-center justify-center">
        <Image
          width={158}
          height={124}
          src="/svgs/fish-swimming.svg"
          alt="Fish icon"
        />
        <div className="text-center text-zinc-700 text-xl font-bold leading-tight">
          Thank you for your feedback
        </div>
        <div className="text-center text-zinc-700 text-base font-normal leading-tight">
          We are always trying to improve
        </div>
      </div>
    </div>
  );
};

export default ReviewSuccess;
