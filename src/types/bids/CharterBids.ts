export type CharterBid = {
        id: string;
        customer: string;
        discounts: string[];
        createdAt: string;
        experienceName: string;
        guestCapacity: number;
        bidAmount: number;
        listingAmount: string;
        status: string;
        departureDate: string;
}

export type CharterBidsResponse = {
    bids: CharterBid[];
    page: string;
    pageSize: string;
    totalItems: number;
}