import { useState } from "react";
import { useMarketPlaceContext } from "@/context/MarketPlaceContext";
import moment from "moment";
import apiService from "@/services/apiService";
import toast from "react-hot-toast";
import { listingFactory } from "@/utils/factories/listingFactory";
import { FilterData } from "@/components/market/molecules/FiltersBar/types";
import Cookies from "js-cookie";
import { mixPannelService } from "@/services/mixpanel-service";

export const useMarketListings = (
  optionalParams?: FilterData
): [boolean, string | null, Function] => {
  const {
    selectedDateRange,
    selectedLocation,
    selectedExperience,
    guestsCounter,
    setMarketPlaceListing,
    marketPlaceLoading,
    setMarketPlaceLoading,
    setMarketPlaceChangedUnix,
    activateZeroFallback,
    setActivateZeroFallback,
  } = useMarketPlaceContext();
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    setActivateZeroFallback(false);

    setMarketPlaceLoading(true);

    //Format dates
    const dateRange = selectedDateRange;
    const dateRangeParts = dateRange?.split(" - ");

    let dateFrom = "";
    let dateTo = "";

    if (dateRangeParts && dateRangeParts.length === 2) {
      dateFrom = moment(dateRangeParts[0], "DD MMM").format("YYYY-MM-DD");
      dateTo = moment(dateRangeParts[1], "DD MMM").format("YYYY-MM-DD");
    } else if (
      dateRangeParts &&
      dateRangeParts.length === 1 &&
      dateRangeParts[0].trim() !== ""
    ) {
      dateFrom = moment(dateRangeParts[0], "DD MMM").format("YYYY-MM-DD");
    }

    //Set params
    const params = {
      location: selectedLocation,
      ...(dateFrom !== "" && { dateFrom }),
      ...(dateTo !== "" && { dateTo }),
      experienceType: selectedExperience ? [selectedExperience] : [],
      guests: guestsCounter,
      ...optionalParams,
      withBid: optionalParams?.iCharterBid[0],
    };

    mixPannelService.trackEvent("Searched Listing", params);

    //Request
    const { data, error } = await apiService.get("listings/all", params);
    if (error) {
      setMarketPlaceLoading(false);
      setError(error);
      toast.error(error);
      return;
    }

    //Save data in context
    if (!data) {
      setMarketPlaceLoading(false);
      setError(error);
      toast.error("Couldn’t fetch listings");
      return;
    }

    Cookies.set("dateFrom", dateFrom);
    Cookies.set("dateTo", dateTo);
    Cookies.set("guest_number", String(guestsCounter));
    const listingData = data.map((listing: any) => listingFactory(listing));

    if (listingData?.length === 0) {
      setActivateZeroFallback(true);

      const { data, error } = await apiService.get("listings/all", {
        ...params,
        location: "",
      });
      if (error) {
        setMarketPlaceLoading(false);
        setError(error);
        toast.error(error);
        return;
      }

      //Save data in context
      if (!data) {
        setMarketPlaceLoading(false);
        setError(error);
        toast.error("Couldn’t fetch listings");
        return;
      }

      Cookies.set("dateFrom", dateFrom);
      Cookies.set("dateTo", dateTo);
      Cookies.set("guest_number", String(guestsCounter));
      const listingData = data.map((listing: any) => listingFactory(listing));

      setMarketPlaceListing(listingData);
      setMarketPlaceLoading(false);
      setMarketPlaceChangedUnix(moment().unix());
      return;
    }

    setMarketPlaceListing(listingData);
    setMarketPlaceLoading(false);
    setMarketPlaceChangedUnix(moment().unix());
    setActivateZeroFallback(false);
  }

  return [marketPlaceLoading, error, handleSearch];
};
