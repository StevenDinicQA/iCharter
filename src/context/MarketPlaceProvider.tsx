"use client";
import React, { useState } from "react";
import { useSearchBar } from "../hooks/useSearchBar";
import { MarketPlaceContext } from "./MarketPlaceContext";
import { Listing } from "@/types/listings/listing";

interface MarketPlaceProviderProps {
  children: React.ReactNode;
}

export const MarketPlaceProvider: React.FC<MarketPlaceProviderProps> = ({
  children,
}) => {
  const {
    selectedLocation,
    selectedDateRange,
    selectedExperience,
    guestsCounter,
    handleLocationClick,
    handleDateChange,
    handleExperienceClick,
    handleGuestsCounterChange,
  } = useSearchBar();

  const [marketPlaceListing, setMarketPlaceListing] = useState<Listing[]>([]);
  const [marketPlaceLoading, setMarketPlaceLoading] = useState<boolean>(false);
  const [activateZeroFallback, setActivateZeroFallback] = useState<boolean>(false);
  const [marketPlaceChangedUnix, setMarketPlaceChangedUnix] = useState<number>(0);

  return (
    <MarketPlaceContext.Provider
      value={{
        selectedLocation,
        selectedDateRange,
        selectedExperience,
        guestsCounter,
        handleLocationClick,
        handleDateChange,
        handleExperienceClick,
        handleGuestsCounterChange,
        marketPlaceListing,
        marketPlaceLoading,
        marketPlaceChangedUnix,
        setMarketPlaceChangedUnix,
        setMarketPlaceLoading,
        setMarketPlaceListing,
        setActivateZeroFallback,
        activateZeroFallback,
      }}
    >
      {children}
    </MarketPlaceContext.Provider>
  );
};
