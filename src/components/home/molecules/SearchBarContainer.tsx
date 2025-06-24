import SearchBar from "./SearchBar/SearchBar";
import MobileSearchBar from "./MobileSearchBar/MobileSearchBar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";

interface SearchBarContainerProps {
  isResponsive: boolean;
  isMarketPlace?: boolean;
  isMapView?: boolean;
  setIsSearchVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  getCoords?: (location: string) => Promise<void>;
}

const SearchBarContainer: React.FC<SearchBarContainerProps> = ({
  isResponsive,
  isMarketPlace,
  isMapView,
  setIsSearchVisible,
  getCoords,
}) => {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(0);

  const searchBarRef = useClickOutside<HTMLDivElement>(() => {
    if (setIsSearchVisible) {
      setIsSearchVisible(false);
    }
  });

  async function handleSearch() {
    if (isMapView) {
      if (getCoords && location) getCoords(location);

      if (setIsSearchVisible) {
        setIsSearchVisible(false);
      }

      return;
    }

    // Create a new URLSearchParams object based on the current query parameters in the URL
    const searchParams = new URLSearchParams(window.location.search);

    // Update searchParams based on provided parameters
    if (location) {
      // If location is provided, set it in the search parameters
      searchParams.set("location", location);
    } else {
      // If location is not provided, remove it from the search parameters
      searchParams.delete("location");
    }

    if (dateFrom) {
      // If dateFrom is provided, set it in the search parameters
      searchParams.set("dateFrom", dateFrom);
    } else {
      // If dateFrom is not provided, remove it from the search parameters
      searchParams.delete("dateFrom");
    }

    if (dateTo) {
      // If dateTo is provided, set it in the search parameters
      searchParams.set("dateTo", dateTo);
    } else {
      // If dateTo is not provided, remove it from the search parameters
      searchParams.delete("dateTo");
    }

    if (guests) {
      // If guests is provided, set it in the search parameters
      searchParams.set("guests", guests.toString());
    } else {
      // If guests is not provided, remove it from the search parameters
      searchParams.delete("guests");
    }

    // Hide the search component
    if (setIsSearchVisible) {
      setIsSearchVisible(false);
    }

    let newPathName;
    const currentPath = window.location.pathname;

    // Check if the current path already contains "/market"
    if (currentPath.includes("/market")) {
      // If "/market" is already in the path, keep the existing path and update only the search params
      newPathName = `${currentPath}?${searchParams.toString()}`;
    } else {
      // If "/market" is not in the path, append "/market" to the existing path
      newPathName = `/market${currentPath}?${searchParams.toString()}`;
    }

    // Navigate to the new path
    router.push(newPathName);
  }

  return (
    <div
      ref={searchBarRef}
      className={`flex items-center flex-col gap-2 bg-white rounded-3xl p-3
        ${isMarketPlace && !isMapView && "mx-4"}
        ${isMapView && "mt-4 lg:mt-0 relative z-10"}
      `}
    >
      <div
        className={`flex items-center flex-col gap-2 ${
          isMarketPlace ? "lg:flex-row" : "md:flex-row"
        } w-full`}
      >
        {!isResponsive ? (
          <SearchBar
            location={location}
            guests={guests}
            setLocation={setLocation}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
            setGuests={setGuests}
            isMarketPlace={isMarketPlace}
            isMapView={isMapView}
          />
        ) : (
          <MobileSearchBar
            location={location}
            guests={guests}
            setLocation={setLocation}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
            setGuests={setGuests}
            isMarketPlace={isMarketPlace}
          />
        )}
        <button
          test-id="searchbar_button"
          onClick={handleSearch}
          className={`text-sm text-white font-medium h-12 rounded-2xl bg-[#2E3BAF] hover:bg-blue-hover ${
            isResponsive ? "w-full mt-2" : "px-10"
          }`}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBarContainer;
