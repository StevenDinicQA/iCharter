import { ListingFormData } from "@/types/listings/listing";

export type PricingFormProps = {
  formData: ListingFormData;
  setFormData: Function;
  onSubmit?: Function;
  isUploading?: boolean;
  isDisabled?: boolean;
  hasBookings?: boolean;
};
