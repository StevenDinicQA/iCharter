import { CharterProfile } from "@/types/listings/listing";

export type EmptyStateProps = {
  isMobile: boolean;
};

export type BookingDetailsProps = {
  isMobile: boolean;
  bookings: Booking[] | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getBookings: () => {};
};

export interface Booking {
  id: string;
  price: string;
  metadata: {
    userId: string;
    orderId?: string;
    listingId: string;
    paymentId: string;
    departureDate?: string;
    charterProfileId: string;
    tripPrice: number;
    youPayToday: number;
    payToTheCaptain: number;
    bookedSeats: number;
    privateGuests: number;
    discountType: string;
    discountAmount: number;
    bidId: string;
  };
  protected_metadata?: any;
  starts_at: string;
  ends_at: string;
  buffer_starts_at: string;
  buffer_ends_at: string;
  created_at: string;
  updated_at: string;
  finalized_at: string;
  canceled_at?: string | null;
  is_temporary: boolean;
  is_canceled: boolean;
  resource: {
    id: string;
    name: string;
    max_simultaneous_bookings: number;
    metadata: {
      listingId: string;
      charterProfileId: string;
    };
    protected_metadata?: any;
    enabled: boolean;
    created_at: string;
    updated_at: string;
  };
  listing: {
    id: string;
    experienceName: string;
    experienceType: string[];
    captains: string[];
    description: string;
    isCompleted: boolean;
    isPublished: boolean;
    isFinished: boolean;
    resourceId: string;
    serviceId: string;
    scheduleId: string;
    createdAt: string;
    boat: {
      id: string;
      boatType: string;
      boatDescription: string;
      guestCapacity: number;
      duration: string;
      seasonalExperience: string;
      facilities: string[];
      availability: {
        mon: boolean;
        tue: boolean;
        wed: boolean;
        thu: boolean;
        fri: boolean;
        sat: boolean;
        sun: boolean;
      };
      departureTime: {
        hour: number;
        minute: number;
      };
      isCompleted: boolean;
      createdAt: string;
    };
    fishingExperience: {
      id: string;
      targetedSpecies: {
        name: string;
        imageUrl: string;
      }[];
      fishingTechniques: string[];
      includedInPrice: string[];
      isCompleted: boolean;
      createdAt: string;
    } | null;
    pricingModel: {
      id: string;
      type: string;
      pricePerTrip: string;
      specialDiscounts: {
        veteran: string;
        military: string;
        firstResponders: string;
      };
      paymentMethod: string[];
      cancelationPolicy: string;
      hasIcharterBid: boolean;
      minBid: string;
      maxBid: string;
      isCompleted: boolean;
      createdAt: string;
    };
    meetingPoint: {
      id: string;
      streetAddresss: string;
      state: string;
      zipCode: string;
      latitude: number;
      longitude: number;
      directions: string;
      isCompleted: boolean;
      createdAt: string;
    };
    charterProfile: CharterProfile;
  };
}

export interface CancelBookingRequestData {
  reason?: string;
  comments?: string;
}
