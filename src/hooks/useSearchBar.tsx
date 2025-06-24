"use client";
import { useState } from "react";
import { format } from "date-fns";
import { DateRangeProps } from "react-date-range";

export function useSearchBar() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [guestsCounter, setGuestsCounter] = useState(0);

  function handleLocationClick(value: string) {
    // Check if the value contains "clearwater" (case-insensitive)
    if (value.toLocaleLowerCase().includes("clearwater")) {
      // If "clearwater" is found, set the selected location to "Clearwater"
      setSelectedLocation("Clearwater");
    }
    // Check if the value contains "tarpon" (case-insensitive)
    else if (value.toLocaleLowerCase().includes("tarpon")) {
      // If "tarpon" is found, set the selected location to "Tarpon Springs"
      setSelectedLocation("Tarpon Springs");
    }
    // Check if the value contains "tampa" (case-insensitive)
    else if (value.toLocaleLowerCase().includes("tampa")) {
      // If "tampa" is found, set the selected location to "Tampa"
      setSelectedLocation("Tampa");
    }
    // If none of the above conditions are met, set the selected location to the provided value
    else {
      setSelectedLocation(value);
    }
  }

  const handleDateChange = (dateRange: DateRangeProps["ranges"]) => {
    if (dateRange !== undefined) {
      const startDate = dateRange[0]?.startDate;
      const endDate = dateRange[0]?.endDate;

      const formattedStartDate = startDate ? format(startDate, "dd MMM") : "";
      const formattedEndDate = endDate ? format(endDate, "dd MMM") : "";

      let formattedDateRange = "";

      if (formattedStartDate === formattedEndDate) {
        formattedDateRange = formattedStartDate;
      } else {
        formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
      }

      setSelectedDateRange(formattedDateRange);
    }
  };

  const handleExperienceClick = (value: string) => {
    setSelectedExperience(value);
  };

  const handleGuestsCounterChange = (value: number) => {
    setGuestsCounter(value);
  };

  return {
    selectedLocation,
    selectedDateRange,
    selectedExperience,
    guestsCounter,
    handleLocationClick,
    handleDateChange,
    handleExperienceClick,
    handleGuestsCounterChange,
  };
}
