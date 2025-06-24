import { ListingFormData } from "@/types/listings/listing";

export type BoatInformationFormProps = {
  formData: ListingFormData;
  setFormData: Function;
  onSubmit?: Function;
  hasBookings: boolean;
};

export const boatTypes = [
  {
    id: 1,
    name: 'Airboat',
    img: 'airboat',
  },
  {
    id: 2,
    name: 'Aluminum fishing',
    img: 'aluminum_fishing',
  },
  {
    id: 3,
    name: 'Angler',
    img: 'angler',
  },
  {
    id: 4,
    name: 'Bass boat',
    img: 'bass_boat',
  },
  {
    id: 5,
    name: 'Bay boat',
    img: 'bay_boat',
  },
  {
    id: 6,
    name: 'Canoe',
    img: 'canoe',
  },
  {
    id: 7,
    name: 'Catamaran',
    img: 'catamaran',
  },
  {
    id: 8,
    name: 'Center console',
    img: 'center_console',
  },
  {
    id: 9,
    name: 'Classic',
    img: 'classic',
  },
  {
    id: 10,
    name: 'Commercial',
    img: 'commercial',
  },
  {
    id: 11,
    name: 'Convertible',
    img: 'convertible',
  },
  {
    id: 12,
    name: 'Cruiser',
    img: 'cruiser',
  },
  {
    id: 13,
    name: 'Cuddy cabin',
    img: 'cuddy_cabin',
  },
  {
    id: 14,
    name: 'Deck boat',
    img: 'deck_boat',
  },
  {
    id: 15,
    name: 'Downeast',
    img: 'downeast',
  },
  {
    id: 16,
    name: 'Drift boat',
    img: 'drift_boat',
  },
  {
    id: 18,
    name: 'Dual console',
    img: 'dual_console',
  },
  {
    id: 19,
    name: 'Fish and ski',
    img: 'fish_and_ski',
  },
  {
    id: 20,
    name: 'Flats boat',
    img: 'flats_boat',
  },
  {
    id: 21,
    name: 'Flybridge',
    img: 'flybridge',
  },
  {
    id: 22,
    name: 'Headboat',
    img: 'headboat',
  },
  {
    id: 23,
    name: 'Inflatable outboard',
    img: 'inflatable_outboard',
  },
  {
    id: 24,
    name: 'Jet boat',
    img: 'jet_boat',
  },
  {
    id: 25,
    name: 'Jon boat',
    img: 'jon_boat',
  },
  {
    id: 26,
    name: 'Kayak',
    img: 'kayak',
  },
  {
    id: 27,
    name: 'Mega yacht',
    img: 'mega_yacht',
  },
  {
    id: 28,
    name: 'Motor yacht',
    img: 'motor_yacht',
  },
  {
    id: 30,
    name: 'Offshore sport fishing',
    img: 'offshore_sport_fishing',
  },
  {
    id: 31,
    name: 'Performance fishing',
    img: 'performance_fishing',
  },
  {
    id: 32,
    name: 'Pilothouse',
    img: 'pilothouse',
  },
  {
    id: 33,
    name: 'Pontoon',
    img: 'pontoon',
  },
  {
    id: 34,
    name: 'Runabout',
    img: 'runabout',
  },
  {
    id: 35,
    name: 'Sailing yacht',
    img: 'sailing_tacth',
  },
  {
    id: 36,
    name: 'Saltwater fishing',
    img: 'saltwater_fishing',
  },
  {
    id: 37,
    name: 'Skiff',
    img: 'skiff',
  },
  {
    id: 38,
    name: 'Walkaround',
    img: 'walkaround',
  },
  {
    id: 39,
    name: 'Other',
    img: 'other'
  },
]

