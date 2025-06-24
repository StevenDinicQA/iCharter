import { AvailableBooking } from "@/app/market/listing/[id]/types";
import moment from "moment";

export const availableBookingFactory = (payload: any): AvailableBooking[] => {
  return payload.map((booking: AvailableBooking) => {
    return {
      starts_at: moment.utc(booking?.starts_at).startOf("day"),
      ends_at: moment.utc(booking?.ends_at).toDate(),
      availableSeats: booking?.availableSeats

    }
  })
};
