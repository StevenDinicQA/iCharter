export type MarketListingProps = {
  listingName: string;
  companyName: string;
  rating: number;
  totalRatings: number;
  location: string;
  duration: string;
  price: number;
  hasBid?: boolean;
  groups?: { groupName: string; discount: number; }[];
  isResponsive?: boolean;
  media: string[];
  listingId: string;
  unhideControls?: boolean;
  charterId?: string;
  activeInfoWindow?: { lat: number; lng: number; };
};
