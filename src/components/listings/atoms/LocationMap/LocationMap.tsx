import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { memo, useEffect, useState } from "react";
import { Coords, LocationMapsProps } from "./types";

const libraries: any[] = ["places"];

export const LocationMapUnmemoized = ({
  defaultMapCoords,
  markerCoords,
  onMarkerDragEnd,
}: LocationMapsProps) => {
  const [mapCoords, setMapCoords] = useState<Coords>(defaultMapCoords);

  useEffect(() => {
    setMapCoords(defaultMapCoords);
  }, [defaultMapCoords]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  return (
    <div className="w-full w-full lg:max-w-[672px] h-[368px] border border-[#EFEFEF] rounded-[24px] overflow-hidden">
      {isLoaded && (
        <GoogleMap
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={mapCoords}
          zoom={15}
        >
          <Marker
            position={markerCoords}
            draggable
            options={{ crossOnDrag: false }}
            icon="/svgs/Marker.svg"
            onDragEnd={(event) => {
              onMarkerDragEnd?.({
                lat: event.latLng?.lat()!,
                lng: event.latLng?.lng()!,
              });
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export const LocationMap = memo(LocationMapUnmemoized);
