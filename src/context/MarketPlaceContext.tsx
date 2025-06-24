"use client";
import { Listing } from "@/types/listings/listing";
import { createContext, useContext } from "react";
import { DateRangeProps } from "react-date-range";

interface IMarketPlaceContext {
  selectedLocation: string;
  selectedDateRange: string;
  selectedExperience: string;
  guestsCounter: number;
  marketPlaceListing: Listing[];
  marketPlaceLoading: boolean;
  marketPlaceChangedUnix: number;
  activateZeroFallback: boolean;
  setMarketPlaceChangedUnix: (value: number) => void;
  setActivateZeroFallback: (value: boolean) => void;
  setMarketPlaceListing: (data: Listing[]) => void;
  handleLocationClick: (value: string) => void;
  setMarketPlaceLoading: (value: boolean) => void;
  handleDateChange: (dateRange: DateRangeProps["ranges"]) => void;
  handleExperienceClick: (value: string) => void;
  handleGuestsCounterChange: (value: number) => void;
}

export const MarketPlaceContext = createContext<IMarketPlaceContext>(
  {} as IMarketPlaceContext
);

export const useMarketPlaceContext = (): IMarketPlaceContext => {
  return useContext(MarketPlaceContext);
};
