"use client";
import { useState } from "react";
import GuestMenu from "../SearchBar/GuestMenu";
import DateMenu from "../SearchBar/DateMenu";
import { LocationIcon } from "@/components/shared/general/atoms/icons/LocationIcon";
import { CalendarIcon } from "@/components/shared/general/atoms/icons/CalendarIcon";
import { GuestIcon } from "@/components/shared/general/atoms/icons/GuestIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { Clear } from "@mui/icons-material";
import { format } from "date-fns";
import "../../../../assets/css/global.css";
import { DateRangeProps } from "react-date-range";
const styles = {
  p: "text-[#CCC5C5] font-medium text-sm ml-2 flex-1 text-start",
  p2: "text-[#454545] font-medium text-sm ml-2 flex-1 text-start",
  p3: "text-[#454545] font-medium text-sm ml-2 flex-1 text-start",
  line: "h-9 w-[2px] bg-[#BDBDBD]",
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
};

function MobileSearchBar({
  location,
  guests,
  setLocation,
  setDateFrom,
  setDateTo,
  setGuests,
  isMarketPlace,
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
    <div className="w-full">
      <div className="h-10 " test-id="searchbar_location">
        <div
          className="w-full overflow-hidden rounded-2xl border border-[#e4e4e4] bg-white pl-4"
          test-id="searchbar_location"
        >
          <div className="mobilesearch flex flex-row items-center">
            <div className="-mt-[4px]">
              <LocationIcon fill="#0C0C0D" size={20} />
            </div>
            {isLoaded && (
              <StandaloneSearchBox
                onPlacesChanged={() => onPlacesChanged()}
                onLoad={onSBLoad}
              >
                <div className="flex items-center justify-between">
                  <FormInput
                    testId="location"
                    inputClassname="border-[0px] w-[100%]"
                    value={location}
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                    placeholder="Location"
                    containerClass="w-[100%]"
                  />

                  <button
                    className={`text-sm mr-1.5 text-[#0C0C0D] hover:bg-transparent ${
                      location ? "block" : "hidden"
                    }`}
                    onClick={() => setLocation("")}
                  >
                    <Clear />
                  </button>
                </div>
              </StandaloneSearchBox>
            )}
          </div>
        </div>
      </div>
      <div className="h-10 mt-4">
        <div
          className="inline w-full"
          ref={dateMenuRef}
          test-id="searchbar_date"
        >
          <button
            aria-expanded
            className="h-[44px] p-4 bg-white rounded-2xl border border-[#e4e4e4] w-full lg:w-[170px] flex items-center justify-start"
            onClick={() => setShowDate((state) => !state)}
          >
            <CalendarIcon fill="#0C0C0D" size={20} />
            <p className={dateRange ? styles.p3 : styles.p}>
              {dateRange ? dateRange : "Dates"}
            </p>
            <button
              onClick={() => handleDateChange([])}
              className={`text-sm -mr-2.5 text-[#0C0C0D] hover:bg-transparent ${
                dateRange ? "block" : "hidden"
              }`}
            >
              <Clear />
            </button>
          </button>

          <DateMenu
            minDate={new Date()}
            onDateChange={handleDateChange}
            isMarketPlace={isMarketPlace}
            showDate={showDate}
            setShowDate={setShowDate}
          />
        </div>
      </div>
      <div className="h-10 mt-4">
        <div
          className="inline w-full"
          ref={guestsMenuRef}
          test-id="searchbar_guests"
        >
          <button
            aria-expanded
            className="h-[44px] p-4 bg-white rounded-2xl border border-[#e4e4e4] w-full flex items-center justify-start"
            onClick={() => setShowGuests(!showGuests)}
          >
            <GuestIcon fill="#0C0C0D" size={20} />
            <p className={guests ? styles.p2 : styles.p}>
              {guests
                ? guests === 1
                  ? `${guests} Guest`
                  : `${guests} Guests`
                : "Guests"}
            </p>
          </button>
          {showGuests && (
            <div className="absolute top-100 left-50">
              <GuestMenu
                guests={guests}
                setGuests={setGuests}
                isMarketPlace={isMarketPlace}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileSearchBar;
