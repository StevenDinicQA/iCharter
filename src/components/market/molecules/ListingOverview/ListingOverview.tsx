import { AnchorIcon } from "@/components/shared/general/atoms/icons/AnchorIcon";
import { LikeIcon } from "@/components/shared/general/atoms/icons/LikeIcon";
import { LocationIcon } from "@/components/shared/general/atoms/icons/LocationIcon";
import { ShareIcon } from "@/components/shared/general/atoms/icons/ShareIcon";
import { ListingOverviewProps } from "./types";
import { ImageOverview } from "../../atoms/ImageOverview";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";

export function ListingOverview({
  charterId,
  name,
  companyName,
  location,
  description,
  duration,
  departureTime,
  media,
  rating,
  totalRatings,
}: ListingOverviewProps) {
  const isResponsive = useMediaQuery("(max-width: 1280px)");

  return (
    <div className="text-[#454545] flex flex-col gap-[15px] xl:gap-[30px]">
      <div className="mx-4 xl:mx-0">
        <div className="mt-[17px] xl:mt-0 flex justify-between items-start">
          <div>
            <div className="mb-[8px] flex items-center gap-[8px]">
              <h1 className="text-[18px] xl:text-[28px] font-[700] xl:leading-[12px]">
                {name}
              </h1>
              {rating > 0 && (
                <a className="hidden xl:flex items-center gap-[8px]">
                  <AnchorIcon size={20} fill="#2D3AAF" />
                  <p className="text-[18px] font-[400]">{rating}</p>
                </a>
              )}
            </div>
            <Link href={`/market/charter/${charterId}`}>
              <h2 className="text-[11px] xl:text-[20px] font-[500]">
                {companyName}
              </h2>
            </Link>
          </div>
          <div className="flex items-center gap-[10px]">
            {/* FAVORITES
                <button className="text-[#BDBDBD] hover:text-[#454545] m-[15px] xl:m-0 w-[35px] h-[35px] flex items-center justify-center transition absolute top-0 right-0 xl:relative bg-white xl:bg-transparent rounded-full z-10">
                  <LikeIcon size={29} />
                </button>
              */}
            <button>
              <ShareIcon size={24} />
            </button>
          </div>
        </div>
      </div>
      {rating > 0 && (
        <div className="text-[11px] font-[500] flex xl:hidden flex-col gap-[3px] mx-4 xl:mx-0">
          <div className="flex items-center gap-[8px]">
            <AnchorIcon size={15} fill="#2D3AAF" />
            <p className="opacity-70">{rating}</p>
          </div>
          <p className="opacity-70">{totalRatings} reviews</p>
        </div>
      )}
      <div className="opacity-70 xl:opacity-100 flex items-center gap-[6px] mx-4 xl:mx-0">
        <LocationIcon size={isResponsive ? 16 : 24} />
        <p className="text-[11px] xl:text-[16px] font-[500]">{location}</p>
      </div>
      <div className="order-first xl:order-none">
        <div className="h-[400px]">
          <ImageOverview media={media} />
        </div>
      </div>
      <hr className="block xl:hidden my-[10px]" />
      <div className="mx-4 xl:mx-0">
        <div>
          <h3 className="text-[18px] xl:text-[28px] mb-[15px] font-[700] leading-[12px]">
            Description
          </h3>
          <p className="text-[16px] xl:text-[20px] font-[400] leading-[23px]">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[45px] mx-4 xl:mx-0">
        <div>
          <h4 className="text-[16px] font-[700]">Duration</h4>
          <p className="text-[16px] font-[400]">{duration}</p>
        </div>
        <div>
          <h4 className="text-[16px] font-[700]">Departure Time</h4>
          <p className="text-[16px] font-[400]">{departureTime}</p>
        </div>
      </div>
    </div>
  );
}
