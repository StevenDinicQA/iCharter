import { BoatInformationForm } from "@/components/listings/organisms/BoatInformationForm";
import { FishingForm } from "@/components/listings/organisms/FishingForm";
import { GeneralInformationForm } from "@/components/listings/organisms/GeneralInformationForm";
import { MeetingPointForm } from "@/components/listings/organisms/MeetingPointForm";
import { PricingForm } from "@/components/listings/organisms/PricingForm";

export const DEFAULT_STEPS = [
  GeneralInformationForm,
  FishingForm,
  BoatInformationForm,
  MeetingPointForm,
  PricingForm,
];

export const STEPS = [
  GeneralInformationForm,
  BoatInformationForm,
  MeetingPointForm,
  PricingForm,
];
