import { nanoid } from "nanoid";
import { MarketListing } from "../../molecules/MarketListing";
import { MarketListingsContainerProps } from "./types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export const MarketListingsContainer = ({
  listings,
  isResponsive,
  isLoading,
}: MarketListingsContainerProps) => {
  const [firstLoadDone, setFirstLoadDone] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;

  useEffect(() => {
    if (!firstLoadDone) {
      setFirstLoadDone(true);
    }

    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Calculate total number of pages
  const totalPages = Math.ceil(listings.length / itemsPerPage);

  // Calculate starting and ending indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, listings.length);

  // Slice listings based on current page
  const currentListings = listings.slice(startIndex, endIndex);

  // Handler for previous page
  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollToTop();
  };

  // Handler for next page
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    scrollToTop();
  };

  // Handler for clicking on a specific page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate the range of pages to display in pagination
  const minPage = Math.max(currentPage - 1, 1);
  const maxPage = Math.min(minPage + 2, totalPages);

  return (
    <div className="flex flex-col gap-5">
      {!firstLoadDone ||
        (isLoading &&
          [1, 2, 3, 4].map(() => (
            <div
              key={nanoid()}
              className="w-full h-[166px] lg:h-[157px] p-[10px] pulse bg-slate-100 animate-pulse rounded-[12px] border border-slate-200 flex items-start gap-[10px]"
            >
              <div className="w-full h-full flex gap-[5px]">
                <div className="w-[20%] h-full bg-slate-200/50 rounded-[12px]"></div>
                <div className="w-full h-full py-[5px] flex flex-col justify-between">
                  <div className="flex flex-col gap-[5px]">
                    <div className="w-[30%] h-[20px] rounded-[6px] bg-slate-200/50"></div>
                    <div className="w-[20%] h-[10px] rounded-[6px] bg-slate-200/50"></div>
                  </div>
                  <div className="w-[20%] h-[10px] rounded-[6px] bg-slate-200/50"></div>
                </div>
              </div>
              <div className="w-[15%] h-[40px] rounded-[12px] bg-slate-200/50 self-end"></div>
            </div>
          )))}
      {firstLoadDone && !isLoading && listings.length === 0 && (
        <div className="w-full mt-[40px] lg:mt-[173px] flex flex-col items-center gap-[19px]">
          <Image
            src="/svgs/empty_market.svg"
            width={124}
            height={124}
            alt="Waves illustration"
          />
          <p className="text-[16px] font-[400] text-center">
            Try adjusting your search by changing dates or location.{" "}
          </p>
        </div>
      )}
      {!isLoading &&
        currentListings.map((item) => (
          <MarketListing
            listingId={item.id}
            key={nanoid()}
            listingName={item.experienceName}
            companyName={item?.charterProfile.companyName}
            rating={item?.charterProfile?.rating}
            totalRatings={item?.charterProfile.totalRatings}
            location={
              item.meetingPoint.city
                ? `${item.meetingPoint.city}, ${item.meetingPoint.state}`
                : item.meetingPoint.streetAddresss
            }
            duration={item.boat.duration}
            price={Number(item.pricingModel.pricePerTrip)}
            hasBid={item.pricingModel.hasIcharterBid}
            groups={
              item.pricingModel.specialDiscounts
                ? Object.entries(item.pricingModel.specialDiscounts).map(
                    (group) => {
                      if (group[1] !== "0" && group[1] !== "") {
                        return {
                          groupName: group[0],
                          discount: parseInt(group[1]),
                        };
                      } else {
                        return { groupName: "", discount: 0 }; // Provide a default value
                      }
                    }
                  )
                : []
            }
            isResponsive={isResponsive}
            media={item.media.map((item: any) => item.fileUrl)}
            charterId={item?.charterProfile?.id}
          />
        ))}
      {/* Pagination controls */}
      <div className="flex items-center gap-[38px]">
        <button
          type="button"
          className={`text-[#454545] ${currentPage === 1 ? "opacity-50" : ""}`}
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft /> Previous
        </button>
        <div className="flex items-center gap-[18px]">
          {Array.from({ length: maxPage - minPage + 1 }, (_, i) => (
            <button
              type="button"
              key={minPage + i}
              className={`text-[#454545] w-4 ${
                minPage + i === currentPage ? "" : "opacity-50"
              }`}
              onClick={() => goToPage(minPage + i)}
            >
              {minPage + i}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`text-[#454545] ${
            currentPage === totalPages ? "opacity-50" : ""
          }`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight />
        </button>
      </div>
    </div>
  );
};
