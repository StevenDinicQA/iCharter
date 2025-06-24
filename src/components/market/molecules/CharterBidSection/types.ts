import { Listing } from "@/types/listings/listing";

export type CharterBidSectionProps = {
    onRefresh: (listings: Listing[]) => void;
    onCancel: () => void;
}