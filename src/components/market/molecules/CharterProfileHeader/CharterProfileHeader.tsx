import { CharterProfileHeaderProps } from "./types";
import { ImageFallback } from "@/components/shared/general/atoms/ImageFallback";
import Image from "next/image";
import anchor from "@/assets/svgs/anchor.svg";

export const CharterProfileHeader = ({
  isResponsive,
  profilePictureUrl,
  rating,
  tripsCount = 0,
  listingsCount = 0,
}: CharterProfileHeaderProps) => {
  const componentWebView = (
    <div className="h-[215px] w-full text-[#454545] pl-[60px] pr-[38px] py-6 bg-white border border-[#EFEFEF] rounded-[12px] flex xl:justify-between lg:justify-around">
      <div className="w-[172px] h-[172px] rounded-full overflow-hidden relative">
        <ImageFallback
          src={profilePictureUrl}
          fallbackSrc="/svgs/icharter_icon.svg"
          alt="Charter profile picture"
        />
      </div>
      <div className="h-full items-center xl:gap-[47px] lg:gap-8 inline-flex">
        <div className="xl:w-[262px] lg:w-[200px] h-[139px] p-4 bg-[#f9f9f9] rounded-lg border border-gray-200 justify-between items-start flex flex-col">
          <div className="text-gray-500 text-sm font-semibold leading-4">
            Reviews
          </div>
          <div className="text-gray-700 text-4xl font-semibold leading-10 flex gap-[4px]">
            {
              rating > 0 ?  rating  : '-'
            }
            <Image src={anchor} width={34} height={35} alt="iCharter" />
          </div>
        </div>
        <div className="xl:w-[262px] lg:w-[200px] h-[139px] p-4 bg-[#f9f9f9] rounded-lg border border-gray-200 justify-between items-start flex flex-col">
          <div className="text-gray-500 text-sm font-semibold leading-4">
            Trips
          </div>
          <div className="text-gray-700 text-4xl font-semibold leading-10">
            {tripsCount}
          </div>
        </div>
        <div className="xl:w-[262px] lg:w-[200px] h-[139px] p-4 bg-[#f9f9f9] rounded-lg border border-gray-200 justify-between items-start flex flex-col">
          <div className="text-gray-500 text-sm font-semibold leading-4">
            Listings
          </div>
          <div className="text-gray-700 text-4xl font-semibold leading-10">
            {listingsCount}
          </div>
        </div>
      </div>
    </div>
  );

  const componentResponsiveView = (
    <div className="w-full h-[214px] px-[25px] py-[21px] bg-white rounded-xl flex-col justify-start items-center gap-2.5 inline-flex">
      <div className="justify-start items-start inline-flex gap-9">
        <div className="w-[172px] h-[172px] rounded-full overflow-hidden relative">
          <ImageFallback
            src={profilePictureUrl}
            fallbackSrc="/svgs/icharter_icon.svg"
            alt="Charter profile picture"
          />
        </div>
        <div className="flex-col justify-start items-start gap-5 inline-flex">
          <div className="flex-col justify-start items-start gap-1 flex">
            <div className="text-zinc-500 text-sm font-medium leading-none">
              Reviews
            </div>
            <div className="justify-start items-start gap-[5px]">
              <div className="text-zinc-700 text-xl font-medium leading-3 gap-[4px] flex items-center">
                {
                  rating > 0 ?  rating  : '-'
                }
                <Image src={anchor} width={21} height={19} alt="iCharter" />
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-1 flex">
            <div className="text-zinc-500 text-sm font-medium leading-none">
              Trips
            </div>
            <div className="justify-start items-start gap-[5px] inline-flex">
              <div className="text-zinc-700 text-xl font-medium leading-3">
                {tripsCount}
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-1 flex">
            <div className="text-zinc-500 text-sm font-medium leading-none">
              Listings
            </div>
            <div className="justify-start items-start gap-[5px] inline-flex">
              <div className="text-zinc-700 text-xl font-medium leading-3">
                {listingsCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isResponsive ? componentResponsiveView : componentWebView;
};
