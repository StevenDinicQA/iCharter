import { DepartureTime } from "@/types/listings/listing";

export type TimeInputProps = {
  onChange?: (newTime: DepartureTime) => void;
  value?: DepartureTime;
  disabled?: boolean;
};
