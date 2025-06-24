import { ListingFormData } from "@/types/listings/listing";

export interface FishingFormProps {
  formData: ListingFormData;
  setFormData: Function;
  onSubmit?: Function;
}
export interface Fish {
  id: number | string;
  name: string;
  url: string;
  img_src_set: {
    [key: string]: string;
  };
  meta: {
    conservation_status?: string;
    scientific_classification?: {
      kingdom: string;
      phylum: string;
      class: string;
      order: string;
      family: string;
      genus: string;
      species?: string;
      superfamily?: string;
      subgenus?: string;
    };
    type_species?: string;
    synonyms?: string;
    binomial_name?: string;
  };
  value?: string;
  label?: string;
  imageUrl?: string;
}
