export type ListingActionsProps = {
    id?: string;
    isPublished?: boolean;
    onDelete: () => void;
    onPublish: (id: string | undefined, isPublished: boolean) => void;
    onDuplicate: (data: any) => void;
    fullRowData: any;
};

export enum DeleteListingErrorTypes {
    Bids = 'bids',
    Bookings = 'bookings',
   
}