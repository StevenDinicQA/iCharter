import { ListingFormData } from "@/types/listings/listing";
import { FileType } from "@/types/media/files";

export type GeneralInformationFormProps = {
  formData: ListingFormData;
  setFormData: Function;
  onSubmit?: Function;
  hasBookings: boolean;
};

export type GeneralInformationFormData = {
  charterProfileId: string;
  experienceName: string;
  experienceType: string;
  description: string;
  media: FileType[];
};

export enum EXPERIENCE_TYPE {
  FISHING_CHARTERS = "Fishing Charters",
  TOURS_DOLPHINS_ISLAND_SUNSET_SUNRISE_SHELLING = "Tours: Dolphins, Island, Sunset/Sunrise, Shelling",
}
