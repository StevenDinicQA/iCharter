import { Listing } from "@/types/listings/listing";

export interface IDataContext {
    listingData: Listing | null;
    setListingData: React.Dispatch<React.SetStateAction<Listing | null>>;
}
  
export interface DataProviderProps {
    children: React.ReactNode;
}