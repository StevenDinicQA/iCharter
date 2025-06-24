import { AnchorIcon } from "@/components/shared/general/atoms/icons/AnchorIcon";
import { LikeIcon } from "@/components/shared/general/atoms/icons/LikeIcon";
import { LocationIcon } from "@/components/shared/general/atoms/icons/LocationIcon";
import { ShareIcon } from "@/components/shared/general/atoms/icons/ShareIcon";
import { CharterOverviewProps } from "./types";
import { ImageOverview } from "../../atoms/ImageOverview";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";

export function CharterOverview({ media }: CharterOverviewProps) {
  const isResponsive = useMediaQuery("(max-width: 1280px)");

  return (
    <div className="text-[#454545] flex flex-col gap-[15px] xl:gap-[30px]">
      <div>
        <div className="mt-[17px] xl:mt-0 flex justify-between items-start">
          <div>
            <div className="mb-[8px] flex items-center gap-[8px]">
              <h2 className="text-[18px] xl:text-[28px] text-[20px] font-[700] leading-[12px]">
                Photos and Videos
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="order-first xl:order-none">
        <div className="h-[400px]">
          <ImageOverview media={media} />
        </div>
      </div>
      <hr className="block xl:hidden my-[10px]" />
    </div>
  );
}
