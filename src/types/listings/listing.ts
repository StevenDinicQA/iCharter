import { Coords } from "@/components/listings/atoms/LocationMap/types";
import { FileType } from "../media/files";
import {
  RSOption,
  RSOptionWithPhoto,
} from "@/components/shared/forms/atoms/SelectInput/types";

/**
 * Listing Type
 */

export interface Listing {
  id: string;
  experienceName: string;
  experienceType: string;
  description?: string;
  captains: string[];
  createdAt: string;
  boat: Boat;
  media: Media[];
  pricingModel: PricingModel;
  meetingPoint: MeetingPoint;
  fishingExperience: FishingExperience;
  charterProfile: CharterProfile;
}

export interface Boat {
  id: string;
  boatType: string;
  boatDescription?: string;
  guestCapacity: number;
  duration: string;
  seasonalExperience?: string;
  facilities?: string[];
  availability: Availability;
  departureTime: DepartureTime;
  createdAt: string;
}

export interface CharterProfile {
  id: string;
  email: string;
  companyName: string;
  captains: string[];
  phoneNumber: string;
  yearsOfExperience: string;
  licensePDFUrl: string;
  location: string;
  profilePictureUrl: string;
  nationality: string;
  groups: Groups;
  createdAt: string;
  media: [];
  listings?: Listing[];
  trips?: number;
  rating: number;
  totalRatings: number;
  pricingModel?: PricingModel;
  listingsPublished?: number;
  instagram: string;
  facebook: string;
  tikTok: string;
  yelp: string;
}

export interface Groups {
  veteran: boolean;
  military: boolean;
  firstResponders: boolean;
  minorityOwnedBusiness: boolean;
}

export interface Availability {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}

export type DayOfWeek = keyof Availability;

export interface DepartureTime {
  hour: number;
  minute: number;
  isPM: boolean;
}

export interface Media {
  id: string;
  fileUrl: string;
}

export interface PricingModel {
  id: string;
  type: string;
  pricePerTrip: string;
  specialDiscounts?: SpecialDiscounts;
  paymentMethod: string[];
  cancelationPolicy: string;
  hasIcharterBid: boolean;
  minBid?: number;
  maxBid?: number;
  createdAt: string;
}

export interface SpecialDiscounts {
  veteran: string;
  military: string;
  firstResponders: string;
}

export interface MeetingPoint {
  id: string;
  streetAddresss: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  directions?: string;
  createdAt: string;
}

export interface FishingExperience {
  id: string;
  targetedSpecies: TargetedSpecies[];
  fishingTechniques?: string[];
  includedInPrice?: string[];
  createdAt: string;
}

export interface TargetedSpecies extends RSOptionWithPhoto {
  name?: string;
}

/**
 * Interface for a listing creation from the front-end
 */

export interface ListingFormData {
  id: string;
  charterProfileId: string;
  experienceName: string;
  experienceType: string[];
  description: string;
  captains: string[];
  targetedSpecies: TargetedSpecies[];
  fishingTechniques: string[];
  includedInPrice: string[];
  boatDescription: string;
  boatType: RSOptionWithPhoto | null;
  guestCapacity: number;
  duration: RSOption | null;
  facilities: string[];
  departureTime: DepartureTime;
  seasonalExperience: RSOption | null;
  availability: string[];
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  coords: Coords;
  directions: string;
  type: string;
  pricePerTrip: number | undefined;
  specialDiscounts: {
    veteran: RSOption | null;
    military: RSOption | null;
    firstResponders: RSOption | null;
  };
  paymentMethod: string[];
  cancelationPolicy: string;
  hasIcharterBid: boolean;
  bidRange: number[];
  media: FileType[];
}
