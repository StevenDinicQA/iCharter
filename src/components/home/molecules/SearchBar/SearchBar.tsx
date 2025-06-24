import React, { useState } from "react";
import DateMenu from "./DateMenu";
import GuestMenu from "./GuestMenu";
import { LocationIcon } from "@/components/shared/general/atoms/icons/LocationIcon";
import { CalendarIcon } from "@/components/shared/general/atoms/icons/CalendarIcon";
import { GuestIcon } from "@/components/shared/general/atoms/icons/GuestIcon";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { IconButton } from "@mui/material";
import Clear from "@mui/icons-material/Clear";
import { useClickOutside } from "@/hooks/useClickOutside";
import { format } from "date-fns";
import { DateRangeProps } from "react-date-range";

const styles = {
  p: "text-[#CCC5C5] font-medium text-sm flex-1 text-start",
  p2: "text-[#454545] font-medium text-sm flex-1 text-start",
  line: "h-[19px] w-[1px] bg-[#DCD5D5]",
};

const libraries: any[] = ["places"];

type Props = {
  location: string;
  guests: number;
  setLocation: (location: string) => void;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
  setGuests: (guests: number) => void;
  isMarketPlace?: boolean;
  isMapView?: boolean;
};

function SearchBar({
  location,
  guests,
  setLocation,
  setDateFrom,
  setDateTo,
  setGuests,
  isMarketPlace,
  isMapView,
}: Props) {
  const [showDate, setShowDate] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [dateRange, setDateRange] = useState("");

  const [searchBox, setSearchBox] = useState(null);

  const onSBLoad = (ref: any) => {
    setSearchBox(ref);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const dateMenuRef = useClickOutside<HTMLDivElement>(() => {
    setShowDate(false);
  });

  const guestsMenuRef = useClickOutside<HTMLDivElement>(() => {
    setShowGuests(false);
  });

  const openMenu = (menu: string) => {
    setShowDate(menu === "date");
    setShowGuests(menu === "guest");
  };

  const onPlacesChanged = () => {
    //@ts-ignore

    // Getting the selected places from the search box
    const querySelected = searchBox?.getPlaces();

    if (querySelected) {
      // Checking if places are selected

      // Extracting and joining address elements to form a complete address
      const address = querySelected[0]?.address_components?.map(
        (a: any) => a?.long_name
      );
      const joinAddressElements = address?.join(", ");

      // Extracting city, state, and zipcode from address components
      const addressComponents = querySelected[0]?.address_components || [];
      let city = "";
      let state = "";
      let zipcode = "";

      addressComponents.forEach((component: any) => {
        const types = component?.types || [];
        const longName = component?.long_name || "";

        // Assigning city, state, and zipcode based on address component types
        if (types.includes("locality")) {
          city = longName;
        } else if (types.includes("administrative_area_level_1")) {
          state = longName;
        } else if (types.includes("postal_code")) {
          zipcode = longName;
        }
      });

      // Setting the search bar value to the joined address elements
      setLocation(joinAddressElements);
    }
  };

  const handleDateChange = (dateRange: DateRangeProps["ranges"]) => {
    if (dateRange !== undefined) {
      // Extract start and end dates from the dateRange array
      const startDate = dateRange[0]?.startDate;
      const endDate = dateRange[0]?.endDate;

      // Format start and end dates to "dd MMM" format
      const formattedStartDate = startDate ? format(startDate, "dd MMM") : "";
      const formattedEndDate = endDate ? format(endDate, "dd MMM") : "";

      let formattedDateRange = "";

      // Determine the formatted date range string
      if (formattedStartDate === formattedEndDate) {
        // If start and end dates are the same, use only one date
        formattedDateRange = formattedStartDate;
      } else {
        // If start and end dates are different, use a date range
        formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
      }

      // Update state with date range
      if (startDate) {
        setDateFrom(startDate.toString());
      }

      if (endDate) {
        setDateTo(endDate.toString());
      }

      setDateRange(formattedDateRange);
    }
  };

  return (
    <div className="flex-1">
      <div className="w-full rounded-[12px] flex items-center whitespace-nowrap gap-2">
        <div
          className="flex items-center w-full max-w-[340px] flex-1 h-11 border border-[#E4E4E4] rounded-2xl px-4 overflow-hidden"
          onMouseOver={() => openMenu("location")}
          test-id="searchbar_location"
        >
          <div className="flex flex-row items-center w-full">
            <div className="-mt-[4px]">
              <LocationIcon stroke="#2D3AAF" size={24} />
            </div>
            <div className="w-full">
              {isLoaded && (
                <StandaloneSearchBox
                  onPlacesChanged={() => onPlacesChanged()}
                  onLoad={onSBLoad}
                >
                  <div className="flex items-center w-full">
                    <FormInput
                      testId="location"
                      inputClassname="border-[0px]"
                      value={location}
                      onChange={(event) => {
                        setLocation(event.target.value);
                      }}
                      placeholder="Location"
                    />

                    {location && (
                      <IconButton
                        onClick={() => setLocation("")}
                        className="text-sm -mr-2 text-[#0C0C0D] hover:bg-transparent"
                      >
                        <Clear />
                      </IconButton>
                    )}
                  </div>
                </StandaloneSearchBox>
              )}
            </div>
          </div>
        </div>
        <div
          className="flex items-center w-full max-w-[340px] flex-1 h-11 border border-[#E4E4E4] rounded-2xl px-4 overflow-hidden"
          onMouseOver={() => openMenu("date")}
          test-id="searchbar_date"
          ref={dateMenuRef}
        >
          <button className="flex gap-2 w-full items-center">
            <CalendarIcon stroke="#2D3AAF" size={24} />
            <p className={dateRange ? styles.p2 : styles.p}>
              {dateRange ? dateRange : "Dates"}
            </p>
            {dateRange && (
              <IconButton
                onClick={() => handleDateChange([])}
                className="text-sm -mr-2.5 text-[#0C0C0D] hover:bg-transparent"
              >
                <Clear />
              </IconButton>
            )}
          </button>

          <DateMenu
            isMarketPlace={isMarketPlace}
            isMapView={isMapView}
            onMouseLeave={() => setShowDate(false)}
            onDateChange={handleDateChange}
            minDate={new Date()}
            showDate={showDate}
            setShowDate={setShowDate}
          />
        </div>
        <div
          test-id="searchbar_guests"
          className="flex items-center w-full max-w-[340px] flex-1 h-11 border border-[#E4E4E4] rounded-2xl px-4 overflow-hidden"
          onMouseOver={() => openMenu("guest")}
          ref={guestsMenuRef}
        >
          <button
            className="flex gap-2 w-full items-center"
            onClick={() => setShowGuests(!showGuests)}
          >
            <GuestIcon stroke="#2D3AAF" size={24} />
            <p className={guests ? styles.p2 : styles.p}>
              {guests
                ? guests === 1
                  ? `${guests} Guest`
                  : `${guests} Guests`
                : "Guests"}
            </p>
          </button>
          {showGuests && (
            <GuestMenu
              guests={guests}
              setGuests={setGuests}
              isMarketPlace={isMarketPlace}
              isMapView={isMapView}
              onMouseLeave={() => setShowGuests(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
