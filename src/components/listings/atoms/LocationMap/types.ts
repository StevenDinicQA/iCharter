export interface LocationMapsProps {
  defaultMapCoords: Coords;
  markerCoords: Coords;
  onMarkerDragEnd?: (coords: Coords) => void;
}

export interface Coords {
  lat: number;
  lng: number;
}
