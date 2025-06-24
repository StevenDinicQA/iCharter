/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import SearchBarContainer from "@/components/home/molecules/SearchBarContainer";
import { CharterBidSection } from "@/components/market/molecules/CharterBidSection";
import { FiltersBar } from "@/components/market/molecules/FiltersBar";
import { FilterData } from "@/components/market/molecules/FiltersBar/types";
import { MarketListingsContainer } from "@/components/market/organisms/MarketListingsContainer";
import { SelectInput } from "@/components/shared/forms/atoms/SelectInput";
import { ListViewIcon } from "@/components/shared/general/atoms/icons/ListViewIcon";
import { MapIcon } from "@/components/shared/general/atoms/icons/MapIcon";
import { useMediaQuery } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import { RightArrowIcon } from "@/components/shared/general/atoms/icons/RightArrowIcon";
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Coords } from "@/components/listings/atoms/LocationMap/types";
import { MarketListing } from "@/components/market/molecules/MarketListing";
import { EditPencilIcon } from "@/components/shared/general/atoms/icons/EditPencilIcon";
import { CalendarIcon } from "@/components/shared/general/atoms/icons/CalendarIcon";
import { ConfigIcon } from "@/components/shared/general/atoms/icons/ConfigIcon";
import { nanoid } from "nanoid";
import CustomAlert from "@/components/shared/general/CustomAlert";
import Image from "next/image";
import { Listing } from "@/types/listings/listing";
import apiService from "@/services/apiService";
import toast from "react-hot-toast";
import { listingFactory } from "@/utils/factories/listingFactory";
import { LocationIcon } from "@/components/shared/general/atoms/icons/LocationIcon";
import { SortIcon } from "@/components/shared/general/atoms/icons/SortIcon";
import { PersonIcon } from "@/components/shared/general/atoms/icons/PersonIcon";
import { ArrowLeft } from "@/components/shared/general/atoms/icons/ArrowLeft";
import { format } from "date-fns";

const libraries: any[] = ["places"];

type Props = {
  searchParams: {
    location: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    experience: string;
    sortBy: string;
  };
};

const MarketScreen = ({ searchParams }: Props) => {
  const [filtersData, setFiltersData] = useState<FilterData>({
    iCharterBid: [],
    departureTime: [],
    duration: [],
    season: [],
    packageType: [],
    price: [],
    specialDiscounts: [],
    reviewScore: [],
    fishingTechniques: [],
    targetedSpecies: [],
    captainGroups: [],
    sortBy: "",
  });
  const [sortBy, setSortBy] = useState<{ value: string; label: string }>({
    label: "Recommended",
    value: "",
  });
  const [isMapView, setIsMapView] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [filtersShown, setFiltersShown] = useState<boolean>(false);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  const [activeInfoWindow, setActiveInfoWindow] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const [activeInfoWindowData, setActiveInfoWindowData] =
    useState<any>(undefined);
  const [mapCoords, setMapCoords] = useState<Coords>({
    lat: 25.760141,
    lng: -80.201307,
  });
  const [tempListings, setTempListings] = useState<Listing[]>([]);
  const [mapListings, setMapListings] = useState<Listing[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("");

  const mapRef = useRef<any>(null);

  const isResponsive = useMediaQuery("(max-width: 1024px)");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const filtersBar = (
    <div className="font-[500] h-[full] flex flex-col">
      <hr className="mb-[20px]" />
      <FiltersBar filtersData={filtersData} setFiltersData={setFiltersData} />
    </div>
  );

  const getCoords = async (location: string) => {
    if (location?.length === 0 || !location) return;

    const response = await (
      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
    ).json();

    if (response.status === "ZERO_RESULTS") {
      console.error(
        `Couldn't find location, please re-check street address, state and zip code`
      );
      return;
    }

    setMapCoords(response?.results[0]?.geometry?.location);
  };

  useEffect(() => {
    function handleDate() {
      if (searchParams?.dateFrom && searchParams?.dateTo) {
        // Extract start and end dates from params
        const startDate = new Date(searchParams?.dateFrom);
        const endDate = new Date(searchParams?.dateTo);

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

        setDateRange(formattedDateRange);
      } else {
        setDateRange("");
      }
    }

    handleDate();
  }, [searchParams?.dateFrom, searchParams?.dateTo]);

  useEffect(() => {
    getCoords(searchParams.location);
  }, [searchParams.location]);

  useEffect(() => {
    if (filtersShown) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "unset";
  }, [filtersShown]);

  const fetchMapData = async () => {
    if (mapListings.length === 0) {
      const { data, error } = await apiService.get("listings/all", {
        location: "",
        guests: 0,
      });
      if (error) {
        toast.error(error);
        return;
      }

      //Save data in context
      if (!data) {
        toast.error("Couldn’t fetch listings");
        return;
      }
      const listingData = data.map((listing: any) => listingFactory(listing));

      setMapListings(listingData);
    }
  };

  useEffect(() => {
    fetchMapData();
  }, [mapListings]);

  useEffect(() => {
    // Convert date strings from searchParams to Date objects or set to null if not available
    const dateFrom = searchParams.dateFrom
      ? new Date(searchParams.dateFrom)
      : null;
    const dateTo = searchParams.dateTo ? new Date(searchParams.dateTo) : null;

    function formatLocation(value: string) {
      // Check if the value contains "clearwater" (case-insensitive)
      if (value?.toLocaleLowerCase().includes("clearwater")) {
        // If "clearwater" is found, set the selected location to "Clearwater"
        return "Clearwater";
      }
      // Check if the value contains "tarpon" (case-insensitive)
      else if (value?.toLocaleLowerCase().includes("tarpon")) {
        // If "tarpon" is found, set the selected location to "Tarpon Springs"
        return "Tarpon Springs";
      }
      // Check if the value contains "tampa" (case-insensitive)
      else if (value?.toLocaleLowerCase().includes("tampa")) {
        // If "tampa" is found, set the selected location to "Tampa"
        return "Tampa";
      }
      // If none of the above conditions are met, set the selected location to the provided value
      else {
        return value;
      }
    }

    // Format date as string in YYYY-MM-DD format
    const formatDate = (date: Date | null) => {
      if (!date) return ""; // Return empty string if date is not set

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Fetch listings based on search parameters
    async function getListings() {
      setIsLoading(true);

      // Set parameters for API request
      const params = {
        location: formatLocation(searchParams.location) || "",
        dateFrom: formatDate(dateFrom),
        dateTo: formatDate(dateTo),
        experienceType: [searchParams.experience] || [],
        guests: searchParams.guests || 0,
        withBid: undefined,
        ...filtersData,
      };

      // Make API request to fetch listings
      const { data, error } = await apiService.get("listings/all", params);

      setListings(data);

      setIsLoading(false);
    }

    // Call the function to fetch listings when component mounts or searchParams change
    getListings();
  }, [searchParams, filtersData]);

  const onClickMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setMapCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        function (e) {
          console.log("Error trying to retrieve location", e);
        }
      );
    } else {
      console.log("NO NAVIGATOR.GELOCATION LOADED");
    }
  };

  useEffect(() => {
    const isBid = location.href.includes("isBid");

    setTimeout(() => {
      if (isBid) {
        setFiltersData({ ...filtersData, iCharterBid: ["bid"] });
      }
    }, 300);
  }, []);

  const onRefreshListings = (item: any) => {
    if (listings.length > tempListings.length) {
      setTempListings(listings);
    }

    if (item?.length > 0) {
      setListings(item);
    } else {
      setListings(tempListings);
    }
  };

  const onCancelBid = () => {
    setListings(tempListings);
  };

  const handleDragEndOnMap = () => {
    const center = mapRef.current.getCenter();

    setMapCoords({ lat: center.lat(), lng: center.lng() });
  };

  const responsiveFilterBar = (
    <div
      className={`w-full h-screen flex items-end fixed ${
        filtersShown ? "left-0" : "left-[100%]"
      } top-0 z-[999] transition`}
    >
      <Button
        text="Apply"
        className={`m-[20px] mb-[35px] fixed bottom-0 right-0 z-[20] ${
          !filtersShown && "hidden"
        }`}
        onClick={() => {
          setFiltersShown(false);
        }}
      />
      <div className="w-full h-full p-[20px] pb-[130px] rounded-t-[12px] bg-white overflow-y-scroll relative">
        <div className="text-center">
          <h4 className="text-[16px] font-[500]">Filters</h4>
          <div
            onClick={() => {
              setFiltersShown(false);
            }}
            className="m-[20px] absolute top-0 right-0"
          >
            <CloseIcon size={24} />
          </div>
          <hr className="mt-[11px] mb-[20px]" />
        </div>
        <div className="flex items-center mb-[20px]">
          <p className="mr-[11px]">Sort By</p>
          <div className="w-[278px]">
            <SelectInput
              value={sortBy}
              options={[
                { label: "Recommended", value: "" },
                { label: "Price: Low to High", value: "lowToHigh" },
                { label: "Price: High to Low", value: "highToLow" },
                { label: "Rating", value: "rating" },
              ]}
              placeholder="Recommended"
              onChange={(newValue: any) => {
                setSortBy(newValue);
                setFiltersData((prev) => ({
                  ...prev,
                  sortBy: newValue.value,
                }));
              }}
            />
          </div>
        </div>
        <FiltersBar filtersData={filtersData} setFiltersData={setFiltersData} />
      </div>
    </div>
  );

  const bidModals = (
    <>
      {/* Bid succesfull */}
      <CustomAlert width={438} openModal={false} setOpenModal={() => {}}>
        <div className="px-[23px] pb-[20px] flex flex-col justify-center items-center text-center gap-[12px]">
          <Image
            src="/svgs/step_complete.svg"
            width={87}
            height={87}
            alt="Check icon"
            className="mb-[8px]"
          />
          <h3 className="text-[20px] font-[700]">
            You just made an iCharterBid! 38 charters were notified
          </h3>
          <p className="text-[16px] font-[400] mb-[8px]">
            We will let to know if they accept or decline your bid. Stay
            onboard! you will receive an email very soon.
          </p>
          <Button text="Continue Browsing" />
        </div>
      </CustomAlert>
      {/* Cannot place a bid */}
      <CustomAlert width={438} openModal={false} setOpenModal={() => {}}>
        <div className="px-[23px] pb-[20px] flex flex-col justify-center items-center text-center gap-[12px]">
          <Image
            src="/svgs/cant_bid.svg"
            width={106}
            height={87}
            alt="Check icon"
            className="mb-[8px]"
          />
          <h3 className="text-[20px] font-[700]">
            Ups you don´t have any iCharterBids available!
          </h3>
          <p className="text-[16px] font-[400] mb-[8px]">
            You already use the 3 iCharterBid opportunities that each account
            has
          </p>
          <Button text="Continue Browsing" />
        </div>
      </CustomAlert>
    </>
  );

  const listView = (
    <div className="text-[#454545] w-full flex flex-1 flex-col max-w-[1200px] mb-[50px]">
      {bidModals}
      {responsiveFilterBar}
      <div className="w-full flex flex-col items-center justify-center z-10">
        <div className="absolute top-0 left-0 right-0 bg-[#2E3BAF] rounded-b-[40px] lg:rounded-b-none w-screen -z-10 h-[172px] lg:h-[226px]">
          <Image
            src="/imgs/background_rod.png"
            fill
            alt="rod"
            priority
            className="absolute mx-auto max-w-[1024px] z-0 object-cover rounded-b-[40px] lg:rounded-b-none"
          />
        </div>
        {isResponsive && !isSearchVisible && (
          <>
            <div className="p-4 w-full rounded-b-[40px]">
              <div className="p-3 rounded-3xl bg-white">
                <div className="flex justify-between items-center rounded-2xl px-4 py-3 border border-[#E4E4E4]">
                  <div className="flex items-center max-w-[calc(100%-44px)] pr-2">
                    <ul className="font-medium flex flex-col gap-2 w-full">
                      <li className="flex items-center gap-2 text-sm text-black">
                        <span className="w-5">
                          <LocationIcon size={20} fill="#0C0C0D" />
                        </span>
                        <p className="truncate">
                          {searchParams.location || "Anywhere"}
                        </p>
                      </li>
                      <div className="flex items-center gap-2 text-xs text-[#656565]">
                        <li className="flex items-center gap-1">
                          <CalendarIcon size={16} fill="#0C0C0D" />
                          {dateRange || "Anytime"}
                        </li>
                        <li className="flex items-center gap-1">
                          <PersonIcon size={16} fill="#0C0C0D" />
                          {searchParams.guests || "Any"}
                        </li>
                      </div>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setIsSearchVisible((prev) => !prev);
                    }}
                    className="w-[44px] h-[44px] bg-[#E7EDFA] rounded-[9px] flex shrink-0 items-center justify-center cursor-pointer"
                  >
                    <EditPencilIcon size={20} fill="#2E3BAF" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-4 py-2 gap-2.5 w-full">
              <div
                onClick={() => {
                  setFiltersShown(true);
                }}
                className="flex items-center justify-center gap-2 px-4 w-full h-[44px] rounded-2xl border border-[#E4E4E4] cursor-pointer"
              >
                <SortIcon size={16} fill="#0C0C0D" />
                <span className="text-sm font-medium">Sort</span>
              </div>
              <div
                onClick={() => {
                  setFiltersShown(true);
                }}
                className="flex items-center justify-center gap-2 px-4 w-full h-[44px] rounded-2xl border border-[#E4E4E4] cursor-pointer"
              >
                <ConfigIcon size={16} />
                <span className="text-sm font-medium">Filter</span>
              </div>
              <div
                onClick={() => {
                  setIsMapView(true);
                }}
                className="flex items-center justify-center gap-2 px-4 w-full h-[44px] rounded-2xl border border-[#E4E4E4] cursor-pointer"
              >
                <MapIcon size={20} fill="#0C0C0D" />
                <span className="text-sm font-medium">Map</span>
              </div>
            </div>
          </>
        )}
        {((isResponsive && isSearchVisible) || !isResponsive) && (
          <div className="w-full xl:w-full  py-0 rounded-b-[40px] relative top-[52px] lg:top-0 lg:relative lg:py-10 lg:px-0 max-w-[1200px] pb-4 bg-[#2E3BAF] lg:bg-transparent z-50">
            <div
              className="absolute -top-[42px] cursor-pointer p-2 ml-2 block lg:hidden"
              onClick={() => setIsSearchVisible(false)}
            >
              <ArrowLeft fill="white" size={20} />
            </div>
            <SearchBarContainer
              isResponsive={isResponsive}
              isMarketPlace={true}
              isMapView={isMapView}
              setIsSearchVisible={setIsSearchVisible}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row lg:px-0 gap-[28px]">
        <div className="flex-1">
          {!isSearchVisible && (
            <CharterBidSection
              onRefresh={onRefreshListings}
              onCancel={onCancelBid}
            />
          )}
        </div>
      </div>
      <div className="flex h-full gap-5 flex-1 mx-4 lg:mx-0">
        {!isResponsive && (
          <div className="p-[25px] h-full flex-1 bg-white rounded-[12px] border border-[#EFEFEF] overflow-y-scroll">
            <p className="text-[16px] font-[500] mb-[14px]">
              Filter results by:
            </p>
            {filtersBar}
          </div>
        )}
        <div className="font-[500] flex-[3] w-full flex flex-col">
          <div className="font-[500] w-full flex flex-col">
            {!isResponsive && (
              <div className="w-full mb-5 flex justify-between items-center h-12">
                {listings?.length === 0 && <p>No results available</p>}
                {listings?.length === 1 && (
                  <p className="text-base font-medium text-[#454545]">
                    There’s only 1 experience{" "}
                    {searchParams.location && `in ${searchParams.location}`}
                  </p>
                )}
                {listings?.length > 1 && (
                  <p className="text-base font-medium text-[#454545]">
                    More than {listings?.length} experiences{" "}
                    {searchParams.location && `in ${searchParams.location}`}
                  </p>
                )}
                <div className="flex items-stretch gap-[6px]">
                  <div className="flex flex-col md:flex-row items-center">
                    <p className="mr-[11px]">Sort By</p>
                    <div className="w-[278px] md:h-12 z-30">
                      <SelectInput
                        value={sortBy}
                        options={[
                          { label: "Recommended", value: "" },
                          { label: "Price: Low to High", value: "lowToHigh" },
                          { label: "Price: High to Low", value: "highToLow" },
                          { label: "Rating", value: "rating" },
                        ]}
                        placeholder="Recommended"
                        onChange={(newValue: any) => {
                          setSortBy(newValue);
                          setFiltersData((prev) => ({
                            ...prev,
                            sortBy: newValue.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="px-[4px] border border-[#EFEFEF] rounded-full flex items-center bg-white">
                    <div
                      className="w-[38px] h-[38px] rounded-full flex justify-center items-center cursor-pointer"
                      onClick={() => {
                        setIsMapView(true);
                      }}
                    >
                      <MapIcon size={20} fill="#2D3AAF" />
                    </div>
                    <div className="w-[38px] h-[38px] bg-[#2D3AAF] rounded-full flex justify-center items-center cursor-pointer">
                      <ListViewIcon size={20} stroke="white" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <MarketListingsContainer
              isLoading={isLoading}
              listings={listings}
              isResponsive={isResponsive}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const mapView = (
    <div className="w-full flex justify-center flex-1 h-full relative">
      {bidModals}
      {responsiveFilterBar}
      {isLoaded && (
        <GoogleMap
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            clickableIcons: false,
          }}
          mapContainerStyle={{
            width: "100%",
            height: "calc(100vh - 64px)",
          }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          center={mapCoords}
          zoom={8}
          onClick={() => setActiveInfoWindow(undefined)}
          onDragEnd={() => handleDragEndOnMap()}
        >
          {mapListings
            .filter(
              (listing) =>
                listing.meetingPoint.latitude !== 0 &&
                listing.meetingPoint.latitude !== 0
            )
            .map((listing) => (
              <Marker
                key={nanoid()}
                position={{
                  lat: listing.meetingPoint.latitude,
                  lng: listing.meetingPoint.longitude,
                }}
                icon={{
                  url: "/svgs/Listing_Marker.svg",
                  anchor: new window.google.maps.Point(26, 26),
                }}
                clickable
                onClick={() => {
                  setActiveInfoWindow({
                    lat: listing.meetingPoint.latitude,
                    lng: listing.meetingPoint.longitude,
                  });
                  setActiveInfoWindowData({
                    listingName: listing.experienceName,
                    companyName: listing.charterProfile.companyName,
                    rating: 0,
                    reviewCount: 0,
                    location: listing.meetingPoint.streetAddresss,
                    duration: listing.boat.duration,
                    price: Number(listing.pricingModel.pricePerTrip),
                    media: listing.media.map((media) => media.fileUrl),
                    hasBid: listing.pricingModel.hasIcharterBid,
                    id: listing.id,
                    groups: listing.pricingModel.specialDiscounts
                      ? Object.entries(
                          listing.pricingModel.specialDiscounts
                        ).map((group) => {
                          if (group[1] !== "0" && group[1] !== "") {
                            return {
                              groupName: group[0],
                              discount: parseInt(group[1]),
                            };
                          } else {
                            return { groupName: "", discount: 0 }; // Provide a default value
                          }
                        })
                      : [],
                  });
                  setIsSearchVisible(false);
                }}
              ></Marker>
            ))}
          {activeInfoWindow && (
            <InfoWindowF
              options={{
                minWidth: 340,
                maxWidth: 340,
                pixelOffset: {
                  width: 0,
                  height: 0,
                  equals: () => false,
                },
              }}
              position={activeInfoWindow}
            >
              <MarketListing
                listingId={activeInfoWindowData.id}
                isResponsive
                listingName={activeInfoWindowData.listingName}
                companyName={activeInfoWindowData.companyName}
                rating={activeInfoWindowData.rating}
                totalRatings={activeInfoWindowData.totalRatings}
                location={activeInfoWindowData.location}
                duration={activeInfoWindowData.duration}
                price={activeInfoWindowData.price}
                media={activeInfoWindowData.media}
                hasBid={activeInfoWindowData.hasBid}
                groups={activeInfoWindowData.groups}
                unhideControls={true}
                activeInfoWindow={activeInfoWindow}
              />
            </InfoWindowF>
          )}

          <div
            className="flex h-[95%] w-full justify-end align-end items-end pb-20 pr-4 absolute pointer-events-none"
            onClick={onClickMyLocation}
          >
            <div className="z-10 flex items-center justify-center h-[32px] w-[32px] bg-white shadow-xl rounded cursor-pointer pointer-events-auto">
              <Image
                src="/svgs/my_location.svg"
                width={24}
                height={24}
                alt="my location"
              />
            </div>
          </div>
        </GoogleMap>
      )}
      {!activeInfoWindow && (
        <div className="w-full h-full lg:py-[40px] max-w-[1200px] flex gap-5 absolute z-1 pointer-events-none mx-4">
          <div className="hidden flex-col gap-[25px] flex-1 min-w-[240px] max-w-[283px] max-h-full h-min p-[18px] bg-white rounded-[12px] overflow-y-auto pointer-events-auto">
            {!isResponsive && (
              <p
                className="text-[16px] font-[500] flex justify-between items-center cursor-pointer"
                onClick={() => {
                  setFiltersExpanded((prev) => !prev);
                }}
              >
                Filter results by:{" "}
                <div
                  className={filtersExpanded ? "transform rotate-[90deg]" : ""}
                >
                  <RightArrowIcon size={14} />
                </div>
              </p>
            )}
            {filtersExpanded && filtersBar}
          </div>
          <div className="flex-[3] h-full flex flex-col">
            {isResponsive && (
              <div className="pointer-events-auto">
                <div className="p-4 w-full rounded-b-[40px]">
                  <div className="p-3 rounded-3xl bg-white">
                    <div className="flex justify-between items-center rounded-2xl px-4 py-3 border border-[#E4E4E4]">
                      <div className="flex items-center">
                        <ul className="font-medium flex flex-col gap-2">
                          <li className="flex items-center gap-2 text-sm text-black">
                            <LocationIcon size={20} fill="#0C0C0D" />
                            {searchParams.location || "Anywhere"}
                          </li>
                          <div className="flex items-center gap-2 text-xs text-[#656565]">
                            <li className="flex items-center gap-1">
                              <CalendarIcon size={16} fill="#0C0C0D" />
                              {dateRange || "Anytime"}
                            </li>
                            <li className="flex items-center gap-1">
                              <PersonIcon size={16} fill="#0C0C0D" />
                              {searchParams.guests || "Any"}
                            </li>
                          </div>
                        </ul>
                      </div>
                      <div
                        onClick={() => {
                          setIsSearchVisible((prev) => !prev);
                        }}
                        className="w-[44px] h-[44px] bg-[#E7EDFA] rounded-[9px] flex items-center justify-center cursor-pointer"
                      >
                        <EditPencilIcon size={20} fill="#2E3BAF" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-4 py-2 gap-2.5 w-full">
                  <button
                    onClick={() => {
                      setFiltersShown(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 w-full h-[44px] rounded-2xl border border-[#E4E4E4] bg-[#E0E2F0] cursor-not-allowed"
                    disabled={true}
                  >
                    <SortIcon size={16} fill="#0C0C0D" />
                    <span className="text-sm font-medium opacity-50">Sort</span>
                  </button>
                  <button
                    onClick={() => {
                      setFiltersShown(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 w-full h-[44px] rounded-2xl border border-[#E4E4E4] bg-[#E0E2F0] cursor-not-allowed"
                    disabled={true}
                  >
                    <ConfigIcon size={16} />
                    <span className="text-sm font-medium opacity-50">
                      Filter
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMapView(false);
                    }}
                    className="flex items-center justify-center gap-2 px-4 w-full h-[44px] rounded-2xl border border-[#E4E4E4] cursor-pointer bg-white"
                  >
                    <ListViewIcon size={20} stroke="#0C0C0D" />
                    <span className="text-sm font-medium">List</span>
                  </button>
                </div>
              </div>
            )}
            {((isResponsive && isSearchVisible) || !isResponsive) && (
              <div className="pointer-events-auto px-[10px] lg:px-0">
                <SearchBarContainer
                  isResponsive={isResponsive}
                  isMarketPlace={true}
                  isMapView={isMapView}
                  getCoords={getCoords}
                  setIsSearchVisible={setIsSearchVisible}
                />
              </div>
            )}
            <div className="w-full flex flex-col gap-[28px] pointer-events-auto">
              {!isSearchVisible && (
                <CharterBidSection
                  onRefresh={onRefreshListings}
                  onCancel={onCancelBid}
                  isMapView={isMapView}
                />
              )}
            </div>
            {!isResponsive && (
              <div className="h-[50px] px-[4px] border border-[#EFEFEF] bg-white rounded-full flex items-center self-end pointer-events-auto">
                <div className="w-[38px] h-[38px] bg-[#2D3AAF] rounded-full flex justify-center items-center cursor-pointer">
                  <MapIcon size={20} fill="white" />
                </div>
                <div
                  className="w-[38px] h-[38px] bg-white rounded-full flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setIsMapView(false);
                  }}
                >
                  <ListViewIcon size={20} stroke="#2D3AAF" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return isMapView ? mapView : listView;
};

export default MarketScreen;
