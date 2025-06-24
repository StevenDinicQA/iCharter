export type CharterUpcomingBooking = {
    address: string;
    bookingId: string;
    date: string;
    listingId: string;
    listingName: string;
}

export type UpcomingBookingsResponse = {
    nextBooking: string;
    upcomingBookins: CharterUpcomingBooking[];
}