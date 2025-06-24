import * as React from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, DateRangeProps } from "react-date-range";
import { Availability } from "@/types/listings/listing";
import { usePathname } from "next/navigation";

type Props = {
  onMouseLeave?: React.MouseEventHandler<any>;
  onDateChange?: (dateRange: CustomRange[]) => void;
  isMarketPlace?: boolean;
  isMapView?: boolean;
  position?: string;
  availability?: Availability;
  dates?: CustomRange[];
  isDayDisabled?: (date: Date) => any;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  showPreview?: boolean;
  showDate: boolean;
  setShowDate: (value: boolean) => void;
};

export const DEFAULT_DATES: CustomRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type CustomRange = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export default function DateMenu({
  onMouseLeave,
  onDateChange,
  isMarketPlace,
  isMapView,
  position,
  isDayDisabled,
  dates = [],
  minDate,
  maxDate,
  showDate,
  setShowDate,
  ...props
}: Props) {
  const isResponsive = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const pathname = usePathname();
  const isListingDetails = pathname.includes("/market/listing");

  const [_dates, setDates] = useState<CustomRange[]>([DEFAULT_DATES]);

  useEffect(() => {
    setDates(dates.length ? dates : [_dates[0]]);
  }, []);

  const handleDateChange = (item: any) => {
    const newDateRange = [item.selection];
    setDates(newDateRange);
  };

  function handleDateSubmit() {
    if (onDateChange) {
      onDateChange(_dates);

      if (!isListingDetails) {
        setShowDate(false);
      }
    }
  }

  return (
    <div
      onMouseLeave={onMouseLeave}
      className={`p-2 bg-white rounded-lg shadow-md
      ${showDate ? "flex" : "hidden"}
      ${position ? position : "absolute"}
        ${isResponsive && !isMarketPlace && "mt-2 left-16px"} 
        ${!isResponsive && !isMarketPlace && "top-[260px] left-[30%]"}
        ${!isTablet && isMarketPlace && !isMapView && "top-[70%] left-[30%]"}
        ${isListingDetails && "w-full justify-center"}
        ${!isResponsive && isMapView && "top-[60px] left-[30%]"} 
        `}
      style={{ zIndex: 9999 }}
    >
      <div className="relative flex flex-col">
        <DateRange
          showMonthAndYearPickers={false}
          showDateDisplay={false}
          editableDateInputs={false}
          onChange={handleDateChange}
          retainEndDateOnFirstSelection={true}
          ranges={_dates}
          disabledDay={isDayDisabled}
          minDate={minDate}
          maxDate={maxDate}
          {...props}
        />
        <button
          type="button"
          onClick={handleDateSubmit}
          className="w-full text-sm text-white font-medium h-12 rounded-2xl bg-[#2E3BAF] hover:bg-blue-hover"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
