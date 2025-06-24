import apiService from "@/services/apiService";
import { listingFactory } from "@/utils/factories/listingFactory";
import { charterProfileFactory } from "@/utils/factories/charterProfileFactory";
import { availableBookingFactory } from "@/utils/factories/availableBookingFactory";
import { Listing, CharterProfile } from "@/types/listings/listing";
import { AvailableBooking } from "./types";

class ListingService {
  async getListing(paramsId: string): Promise<{ listingData: Required<Listing> | null, error: any }> {
    try {
      const { data, error } = await apiService.get(
        `listings/${paramsId}?showCharterListings=true`
      );

      if (error) {
        return { listingData: null, error };
      }

      const listingData = listingFactory(data) as Required<Listing>;
      return { listingData, error: null };
    } catch (error) {
      return { listingData: null, error };
    }
  }

  async getCharterProfile(charterId: string): Promise<{ charterProfileData: Required<CharterProfile> | null, error: any }> {
    try {
      const { data, error } = await apiService.get(
        `charterProfiles/${charterId}?showExperiences=true&showTrips=true`
      );

      if (error) {
        return { charterProfileData: null, error };
      }

      const charterProfileData = charterProfileFactory(data) as Required<CharterProfile>;
      return { charterProfileData, error: null };
    } catch (error) {
      return { charterProfileData: null, error };
    }
  }

  async getAvailableBookings(listingId: string, fromDate: string, toDate: string, guestNumber: number): Promise<{ availableBookings: Required<AvailableBooking>[] | null, error: any }> {
    try {
      const { data, error } = await apiService.get(
        `bookings/listing/${listingId}/schedule?from=${fromDate}&to=${toDate}&guests=${guestNumber}`
      );

      if (error) {
        return { availableBookings: null, error };
      }

      const availableBookings = availableBookingFactory(data.data) as Required<AvailableBooking>[];
      return { availableBookings, error: null };
    } catch (error) {
      return { availableBookings: null, error };
    }
  }

  async getListingSeats(listingId: string, startDate: string): Promise<number> {
    try {
      const { data, error } = await apiService.get(
        `bookings/listing/${listingId}/availability?date=${startDate}`
      );

      if (error) {
        throw new Error(error);
      }

      return data.availableSeats;
    } catch (error) {
      // Handle errors as needed
      throw new Error("Failed to fetch listing seats");
    }
  }
}

export default new ListingService();
