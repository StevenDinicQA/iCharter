import { Media } from "@/types/listings/listing";

export interface ListingOverviewProps {
  charterId: string;
  name: string;
  companyName: string;
  location: string;
  description: string;
  duration: string;
  departureTime: string;
  media: Media[];
  rating: number;
  totalRatings: number;
}
