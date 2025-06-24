import * as React from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, DateRangeProps } from "react-date-range";
import { Availability, DayOfWeek } from "@/types/listings/listing";
import {
  Datepicker,
  DatepickerEvent,
} from "@meinefinsternis/react-horizontal-date-picker";
import { enUS } from "date-fns/locale";
import moment from "moment";

type Props = {
  onMouseLeave?: React.MouseEventHandler<any>;
  onDateChange?: (dateRange: CustomRange[]) => void;
  isMarketPlace?: boolean;
  position?: string;
  availability?: Availability;
  dates?: CustomRange[];
  isDayDisabled?: (date: Date) => any;
  minDate?: Date | undefined;
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

var enumerateDaysBetweenDates = function (startDate: Date, endDate: Date) {
  var dates = [];

  var currDate = moment(startDate).startOf("day");
  var lastDate = moment(endDate).startOf("day");

  while (currDate.add(1, "days").diff(lastDate) < 0) {
    dates.push(currDate.clone().toDate());
  }

  return dates;
};

export function HorizontalDatePicker({
  onMouseLeave,
  onDateChange,
  isDayDisabled,
}: Props) {
  //   const isResponsive = useMediaQuery("(max-width: 1024px)");

  //   const [_dates, setDates] = useState<CustomRange[]>([DEFAULT_DATES]);

  //   useEffect(() => {
  //     setDates(dates.length ? dates : [_dates[0]]);
  //   }, [dates]);

  //   const handleDateChange = (item: DatepickerEvent) => {
  //     const [startValue, endValue, rangeDates] = item;

  //     const newDateRange = [item.selection];
  //     setDates(newDateRange);
  //     if (onDateChange) {
  //       onDateChange(newDateRange);
  //     }
  //   };

  const [date, setDate] = React.useState<{
    endValue: Date | null;
    startValue: Date | null;
    rangeDates: Date[] | null;
  }>({
    startValue: null,
    endValue: null,
    rangeDates: [],
  });

  const handleChange = (d: DatepickerEvent) => {
    const [startValue, endValue, rangeDates] = d;
    // setDate((prev) => ({ ...prev, endValue, startValue, rangeDates }));
    if (startValue) {
      let customRange = (rangeDates || []).map((item) => {
        return {
          startDate: item,
          endDate: item,
          key: "",
        } as CustomRange;
      });
      if (onDateChange) {
        setDate((prev) => {
          return {
            startValue: startValue,
            endValue: startValue,
            rangeDates: rangeDates,
          };
        });

        customRange = [
          {
            startDate: startValue,
            endDate: startValue,
            key: "selection",
          },
          {
            startDate: moment(startValue).add(1, "day").toDate(),
            endDate: moment(startValue).add(1, "day").toDate(),
            key: "selection",
          },
        ];
        onDateChange(customRange);
      }
    }
  };

  const now = moment().toDate();
  const disabledDates = enumerateDaysBetweenDates(
    now,
    moment(now).add(3, "months").toDate()
  )
    .map((item) => {
      if (isDayDisabled && isDayDisabled(item)) {
        return item;
      }
      return now;
    })
    .filter((p) => p.getTime() !== now.getTime());

  return (
    <div onMouseLeave={onMouseLeave}>
      <Datepicker
        //   onChange={handleDateChange}
        onChange={handleChange}
        locale={enUS}
        startDate={new Date()}
        endDate={moment(new Date()).add(3, "months").toDate()}
        startValue={date.startValue}
        endValue={date.endValue}
        disabledDates={disabledDates || []}
        classNames={{
          weekendItem: "cal-color-gray",
          dayItem: "cal-day-item",
          selectedDay: "cal-day-item-selected",
        }}
      />
    </div>
  );
}
