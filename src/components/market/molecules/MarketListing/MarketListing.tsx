import { Chip } from "@mui/material";
import { MarketListingProps } from "./types";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { AnchorIcon } from "@/components/shared/general/atoms/icons/AnchorIcon";
import { MapPinIcon } from "@/components/shared/general/atoms/icons/MapPinIcon";
import { LikeIcon } from "@/components/shared/general/atoms/icons/LikeIcon";
import { FirstResponderIcon } from "@/components/shared/general/atoms/icons/FirstResponderIcon";
import { MilitarIcon } from "@/components/shared/general/atoms/icons/MilitarIcon";
import { VeteranIcon } from "@/components/shared/general/atoms/icons/VeteranIcon";
import { ImageCarousel } from "../../atoms/ImageCarousel";
import { useRouter } from "next/navigation";
import { ClockIcon } from "@/components/shared/general/atoms/icons/ClockIcon";

export const MarketListing = ({
  listingName = "Unknown",
  companyName = "Unknown",
  rating,
  totalRatings,
  location = "Unkown",
  duration = "Unkown",
  price = 0,
  hasBid,
  groups,
  isResponsive,
  listingId,
  media,
  unhideControls,
  charterId,
  activeInfoWindow,
}: MarketListingProps) => {
  const router = useRouter();

  // Renders a discount component based on the group name and discount percentage.
  function discountComponent(groupName: string, discount: number) {
    switch (groupName) {
      // Render a discount component for first responders
      case "firstResponders":
        return (
          <div
            key={groupName}
            className="flex items-center px-2 h-[22px] text-xs font-medium rounded text-[#543EAB] bg-[#EDEAFF] min-w-[100px] max-w-fit"
            title="First Responders"
          >
            <p className="truncate">{discount}% off for Responders</p>
          </div>
        );

      // Render a discount component for military personnel
      case "military":
        return (
          <div
            key={groupName}
            className="flex justify-center items-center px-2 h-[22px] text-xs font-medium rounded text-[#3F8E84] bg-[#D9F5F2] min-w-[100px] max-w-fit"
            title="Military"
          >
            <p className="truncate">{discount}% off for Military</p>
          </div>
        );

      // Render a discount component for veterans
      case "veteran":
        return (
          <div
            key={groupName}
            className="flex justify-center items-center px-2 h-[22px] text-xs font-medium rounded text-[#008BD0] bg-[#E0F6FF] min-w-[100px] max-w-fit"
            title="Veterans"
          >
            <p className="truncate">{discount}% off for Veterans</p>
          </div>
        );

      // Return null if the group name doesn't match any known discount group
      default:
        return null;
    }
  }

  const componentWebView = (
    <article className="text-[#454545] p-2 bg-white border border-[#EAEAEA] rounded-[20px] flex gap-4 select-none h-64">
      <div className="relative lg:w-[347px] h-[166px] lg:h-[240px] rounded-xl overflow-hidden">
        <ImageCarousel imagesUrls={media || []} listingId={listingId} />
        <div className="absolute top-2 left-2">
          <Chip
            label={duration}
            icon={<ClockIcon size={16} stroke="#666666" />}
            sx={{
              fontSize: "12px",
              color: "#666",
              backgroundColor: "#FFF",
              fontWeight: "700",
              paddingX: "8px",
              paddingY: "6px",
              height: "28px",
              display: "flex",
              gap: "4px",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>
      </div>
      <div
        className="relative flex justify-between flex-1 cursor-pointer"
        onClick={() => router.push(`/market/listing/${listingId}`)}
      >
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col justify-between py-8 w-full h-full">
            <div className="flex flex-col gap-[6px]">
              <h3
                className="text-2xl font-bold cursor-pointer max-w-[351px]"
                title={listingName}
              >
                {listingName}
              </h3>
              <p className="text-xs cursor-pointer">{companyName}</p>
              {location && <p className="text-xs text-[#929292]">{location}</p>}
            </div>
            <div>
              <p className="text-[28px] font-bold mb-3">$ {price}</p>
              <div className="flex gap-3 max-w-[337px] xl:max-w-full">
                {groups?.map((group) =>
                  discountComponent(group.groupName, group.discount)
                )}
              </div>
            </div>
          </div>
          {/* {rating > 0 && (
            <div className="flex flex-col gap-[6px]">
              <p className="text-[13px] font-[400] flex items-center gap-[4px]">
                <AnchorIcon size={16} fill="#2D3AAF" />
                {`${rating}/5`}
              </p>
              <p className="text-[13px] font-[400]">{`${totalRatings} Reviews`}</p>
            </div>
          )} */}
        </div>
        <div className="absolute top-2 right-2 z-10">
          {hasBid && (
            <p className="flex justify-center items-center text-white text-sm font-bold px-3 h-[29px] rounded-[29px] bg-[#2E3BAF]">
              iCharterBid™
            </p>
          )}
        </div>
      </div>
    </article>
  );

  const componentResponsiveView = (
    <article
      className={`flex flex-col w-full rounded-[20px] p-2 text-[#454545] border border-[#EAEAEA] bg-white ${
        activeInfoWindow ? "h-full" : "h-[416px]"
      }`}
    >
      <div className="relative">
        <div className="w-full h-[239px] rounded-xl overflow-hidden">
          <ImageCarousel
            imagesUrls={media}
            mapStyles
            listingId={listingId}
            // hideControls={!unhideControls}
          />
        </div>
        {/*
            <div className="w-[35px] h-[35px] m-[14px] bg-white rounded-full flex justify-center items-center absolute top-0 right-0 z-10">
              <LikeIcon size={29} />
            </div>
          */}
        <div className="absolute top-2 left-2 right-2 flex justify-between">
          <Chip
            label={duration}
            icon={<ClockIcon size={16} stroke="#666666" />}
            sx={{
              fontSize: "12px",
              color: "#666",
              backgroundColor: "#FFF",
              fontWeight: "700",
              paddingX: "8px",
              paddingY: "6px",
              height: "28px",
              display: "flex",
              gap: "4px",
              position: "relative",
              zIndex: 1,
            }}
          />
          {hasBid && (
            <p className="flex justify-center items-center text-white text-sm font-bold px-3 h-[29px] rounded-[21px] bg-[#2E3BAF] z-[1]">
              iCharterBid™
            </p>
          )}
        </div>
      </div>
      <div
        className="w-full p-2 mt-2 text-[#454545] bg-white flex"
        onClick={() => router.push(`/market/listing/${listingId}`)}
      >
        <div className="w-full md:w-[50%] flex flex-col justify-between gap-3 flex-grow">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center">
              <h3 className="text-base font-bold">{listingName}</h3>
            </div>
            <p className="text-xs">{companyName}</p>
            {location && (
              <p className="text-xs text-[#929292] truncate w-full">
                {location}
              </p>
            )}
          </div>
          <div>
            <p className="text-[17px] font-bold">$ {price}</p>
          </div>
          <div className={`flex gap-3 ${activeInfoWindow && "max-w-full overflow-hidden"}`}>
            {groups?.map((group) =>
              discountComponent(group.groupName, group.discount)
            )}
          </div>
          {/* {rating > 0 && (
            <div className="text-[#454545B3]">
              <p className="text-[11px] font-[500] flex items-center gap-[4px]">
                <AnchorIcon size={16} fill="#2D3AAF" />
                {`${rating}/5`}
              </p>
              <p className="text-[11px] font-[500]">{`${totalRatings} Reviews`}</p>
            </div>
          )} */}
        </div>
      </div>
    </article>
  );

  return isResponsive ? componentResponsiveView : componentWebView;
};
