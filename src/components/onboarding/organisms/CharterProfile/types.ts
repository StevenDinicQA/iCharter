import { FileType } from "@/types/media/files";

export type CharterProfileProps = {
  onSubmit?: Function;
  formData: CharterProfileFormValues;
  setFormData: Function;
  buttonText?: string;
  fromOnboarding?: boolean;
};

export type CharterProfileFormValues = {
  avatar: File | null;
  companyName: string;
  captainsNames: string[];
  phoneNumber: string;
  location: string;
  license: FileType[];
  experience: string;
  nationality: string;
  groups: string[];
  instagram?: string;
  facebook?: string;
  tikTok?: string;
  yelp?: string;
};
