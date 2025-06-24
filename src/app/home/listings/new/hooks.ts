import { ListingFormData } from "@/types/listings/listing";
import { Dispatch, SetStateAction, useState } from "react";

export const useCreateListingForm = (): [
  ListingFormData,
  Dispatch<SetStateAction<ListingFormData>>
] => {
  const [state, setState] = useState<ListingFormData>({
    id: "",
    charterProfileId: "",
    experienceName: "",
    experienceType: [],
    description: "",
    captains: [],
    targetedSpecies: [],
    fishingTechniques: [],
    includedInPrice: [],
    boatDescription: "",
    boatType: null,
    guestCapacity: 0,
    duration: null,
    facilities: [],
    departureTime: {
      hour: 0,
      minute: 0,
      isPM: false,
    },
    seasonalExperience: null,
    availability: [],
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    coords: {
      lat: 0,
      lng: 0,
    },
    directions: "",
    type: "",
    pricePerTrip: 0,
    specialDiscounts: {
      veteran: null,
      military: null,
      firstResponders: null,
    },
    paymentMethod: [],
    cancelationPolicy: "",
    hasIcharterBid: true,
    bidRange: [1, 2],
    media: [],
  });

  return [state, setState];
};
