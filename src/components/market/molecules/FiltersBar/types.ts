export type FiltersBarProps = {
  filtersData: FilterData;
  setFiltersData: Function;
  onChange?: (value: FilterData) => void;
};

export type FilterData = {
  iCharterBid: string[];
  departureTime: string[];
  duration: string[];
  season: string[];
  packageType: string[];
  price: string[];
  specialDiscounts: string[];
  reviewScore: string[];
  fishingTechniques: string[];
  targetedSpecies: string[];
  captainGroups: string[];
  sortBy: string
};
