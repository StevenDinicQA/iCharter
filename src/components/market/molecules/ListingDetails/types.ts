import { TargetedSpecies } from "@/types/listings/listing";
import { BoatInformationProps } from "../../atoms/BoatInformation/types";

export interface ListingDetailsProps {
  targetedSpecies?: TargetedSpecies[];
  boatInformation: BoatInformationProps;
  fishingTechniques: string[];
  includedInPrice: string[];
  facilities: string[];
  paymentAndCancellation: string;
}

export const DetailsTabs = {
  TARGETED_SPECIES: "Targeted Species",
  BOAT_INFORMATION: "Boat Information",
  FISHING_TECHNIQUES: "Fishing Techniques",
  INCLUDED_IN_PRICE: "Included in Price",
  FACILITIES: "Facilities",
  PAYMENT_AND_CANCELLATION: "Payment and Cancellation",
} as const;
