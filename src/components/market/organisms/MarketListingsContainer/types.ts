import { Listing } from "@/types/listings/listing";

export type MarketListingsContainerProps = {
  listings: Listing[];
  isResponsive?: boolean;
  isLoading?: boolean
};
