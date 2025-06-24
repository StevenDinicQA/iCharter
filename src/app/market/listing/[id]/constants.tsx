import { DayAvailability } from "@/components/home/molecules/SearchBar/types";
import { Availability } from "@/types/listings/listing";
import moment, { Moment } from "moment";

export const ALL_DAYS_AVAILABILITY: Availability = {
  mon: true,
  tue: true,
  wed: true,
  thu: true,
  fri: true,
  sat: true,
  sun: true,
};

export const DEFAULT_GUEST_NUMBER: number = 1;
export const CALENDAR_DEFAULT_FROM_DATE: Moment = moment()
  .tz("America/New_York", true)
  .startOf("day");

export const CALENDAR_DEFAULT_TO_DATE: Moment = moment()
  .tz("America/New_York", true)
  .endOf("month")
  .add(3, "month");
