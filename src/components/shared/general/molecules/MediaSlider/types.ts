import { Media } from "@/types/listings/listing";

export interface MediaSliderProps {
  open?: boolean;
  onClose?: Function;
  media: Media[];
}
