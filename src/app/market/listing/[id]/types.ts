import { Listing } from "@/types/listings/listing";

export interface ListingDetailsScreenProps {
  params: {
    id: string;
  };
}

export type MoreExperiences = {
  quantity: number | null;
  experiences: Listing[];
};

export interface AvailableBooking {
  starts_at: moment.Moment
  ends_at: Date
  availableSeats: number
}
