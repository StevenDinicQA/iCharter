import { useRouter } from "next/navigation";
import { Chip, Skeleton, useMediaQuery } from "@mui/material";
import { ImageCarousel } from "@/components/market/atoms/ImageCarousel";
import { Listing } from "@/types/listings/listing";

type Props = {
  listings: Listing[];
};

type Media = {
  id: string;
  fileUrl: string;
  isCompleted?: boolean;
};

export default function TopListings({ listings }: Props) {
  const router = useRouter();

  const isTablet = useMediaQuery("(min-width: 768px)");
  const isSmallDesktop = useMediaQuery("(min-width: 1024px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1280px)");

  // Filter out items with undefined charterProfile or undefined rating, and then sort them by rating
  const sortedItems = listings
    .filter((item) => item?.charterProfile?.rating !== undefined)
    .sort((a, b) => b.charterProfile.rating - a.charterProfile.rating);

  // Get the appropriate number of listings based on screen size
  const numListings = isLargeDesktop
    ? 12
    : isSmallDesktop
    ? 10
    : isTablet
    ? 8
    : 6;

  // Slice the sorted items to get the number of listings to display
  const displayedListings = sortedItems.slice(0, numListings);

  return (
    <section
      id="top-listings"
      className="px-4 xl:px-0 w-full max-w-[1200px]  overflow-hidden"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl lg:text-2xl font-bold">Top Listings</h2>
        <button
          className="text-[#2E3BAF] text-sm font-medium cursor-pointer"
          onClick={() => router.push("/market")}
        >
          Explore more
        </button>
      </div>

      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {displayedListings.length === numListings
          ? displayedListings.map((item, index) => (
              <article
                key={index}
                className="relative flex flex-col min-w-44 lg:min-w-[192px] min-h-56 lg:min-h-[242px] text-[#454545] rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl">
                  <ImageCarousel
                    imagesUrls={
                      item.media.map((item: Media) => item.fileUrl) || []
                    }
                    listingId={item.id}
                  />
                </div>

                <div className="m-2 z-10">
                  <Chip
                    label={item.boat.duration}
                    sx={{
                      color: "#666",
                      backgroundColor: "#FFF",
                      fontSize: "12px",
                      fontWeight: "700",
                      paddingX: "8px",
                      paddingY: "5px",
                      height: "25px",
                    }}
                  />
                </div>

                <div
                  className="absolute bottom-0 pb-[26px] px-2 text-white cursor-pointer z-10 w-full"
                  onClick={() => router.push(`/market/listing/${item.id}`)}
                >
                  <h3
                    className="text-sm font-bold truncate mb-2"
                    title={item.experienceName}
                  >
                    {item.experienceName}
                  </h3>

                  {location && (
                    <p className="text-xs text-[#DADADA] truncate">
                      {item.meetingPoint.city
                        ? `${item.meetingPoint.city}, ${item.meetingPoint.state}`
                        : item.meetingPoint.streetAddresss}
                    </p>
                  )}
                </div>
              </article>
            ))
          : // Display Skeletons when displayedListings are not loaded
            Array.from({ length: numListings }, (_, index) => (
              <article
                key={index}
                className="relative flex flex-col min-w-44 lg:min-w-[192px] min-h-56 lg:min-h-[242px] text-[#454545] rounded-xl overflow-hidden"
              >
                <Skeleton key={index} className="w-full h-full" />
              </article>
            ))}
        {displayedListings.length > 0 && (
          <div>
            <div className="w-full h-[197px] bg-gradient-to-b from-transparent to-[#f5f5f5] absolute bottom-0 z-10"></div>
            <button
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 py-3 px-6 h-12 justify-self-center text-sm text-white font-medium rounded-2xl bg-[#2E3BAF] cursor-pointer"
              onClick={() => router.push("/market")}
            >
              Explore all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
