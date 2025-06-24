import { Booking } from "../bookings/booking";
import { Listing } from "../listings/listing";
import User from "../user/User";

export interface Review {
    id: string;
    createdAt: string;
    comments: string;
    rating: string;
    listing?: Listing;
    user?: User;
    booking?: Booking;
}