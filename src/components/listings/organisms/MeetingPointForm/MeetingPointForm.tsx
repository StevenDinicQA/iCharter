import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FormLayout } from "../FormLayout";
import { MeetingPointFormProps } from "./types";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import { LocationMap } from "../../atoms/LocationMap";
import { useDebounce } from "use-debounce";
import { Coords } from "../../atoms/LocationMap/types";
import { MIAMI_COORDS } from "./constants";
import { toast } from "react-hot-toast";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

const libraries: any[] = ["places"];

export const MeetingPointForm = ({
  formData,
  setFormData,
  onSubmit,
}: MeetingPointFormProps) => {
  const [defaultMapCoords, setDefaultMapCoords] = useState<Coords>(
    formData.coords || MIAMI_COORDS
  );
  const [debouncedStreet] = useDebounce(formData.streetAddress, 2000);
  const [debouncedState] = useDebounce(formData.state, 2000);
  const [debouncedZipCode] = useDebounce(formData.zipCode, 2000);

  const [searchBox, setSearchBox] = useState(null);

  const didMount = useRef(false);

  const onSBLoad = (ref: any) => {
    setSearchBox(ref);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.();
  };

  const getCoords = async () => {
    if (!formData.streetAddress || formData.streetAddress !== debouncedStreet) {
      return;
    }

    const response = await (
      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${formData.streetAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
    ).json();

    if (response.status === "ZERO_RESULTS") {
      toast.error(
        `Couldn't find location, please re-check street address, state and zip code`
      );
      return;
    }

    if (!didMount.current) {
      didMount.current = true;
      return;
    } else {
      setFormData({
        ...formData,
        coords: response.results[0].geometry.location,
      });
      setDefaultMapCoords(response?.results[0]?.geometry?.location);
    }
  };

  const reverseGeocoding = async (lat: number, lng: number) => {
    if (!lat || !lng) return;

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const parsed = await res.json();

      if (parsed) {
        const address = parsed?.results[0]?.formatted_address.replaceAll(
          "#",
          ""
        );

        setFormData({ ...formData, streetAddress: address });
      }
    } catch (error) {
      toast.error("COULDNT FIND THE ADDRESS FOR THE GIVEN COORDINATES");
    }
  };

  const onPlacesChanged = () => {
    //@ts-ignore
    const querySelected = searchBox?.getPlaces();

    if (querySelected) {

      console.log("ADDRESS", JSON.stringify(querySelected[0]?.address_components));

      const address = querySelected[0]?.address_components?.map(
        (a: any) => a?.long_name
      );
      const joinAddressElements = address?.join(", ");


      const addressComponents = querySelected[0]?.address_components || [];

      let city = "";
      let state = "";
      let zipcode = "";
  
      addressComponents.forEach((component: any) => {
        const types = component?.types || [];
        const longName = component?.long_name || "";
  
        if (types.includes("locality")) {
          city = longName;
        } else if (types.includes("administrative_area_level_1")) {
          state = longName;
        } else if (types.includes("postal_code")) {
          zipcode = longName;
        }
      });

      console.log("CITY:", city, "STATE:", state, "ZIPCODE:", zipcode);
  
      setFormData({
        ...formData,
        city: city,
        state: state,
        zipCode: zipcode,
        streetAddress: joinAddressElements
      });
    }
  };

  const handleMarkerDragEnd = (newCoords: any) => {
    setFormData({ ...formData, coords: newCoords });
    //setFormData({ ...formData, streetAddress: ''});
    setDefaultMapCoords(newCoords);
    //reverseGeocoding(newCoords?.lat, newCoords?.lng);
  };

  useEffect(() => {
    getCoords();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedStreet, debouncedZipCode, debouncedState]);

  useEffect(() => {
    const successCallback: PositionCallback = (position) => {
      if (formData.coords) return;
      setDefaultMapCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setFormData({
        ...formData,
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    };

    navigator.geolocation.getCurrentPosition(successCallback);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormLayout formTitle="Meeting Point" onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-[20px]">
        <FormField className="max-w-[447px]" label="Street Address" required>
          {isLoaded && (
            <StandaloneSearchBox
              onPlacesChanged={() => onPlacesChanged()}
              onLoad={onSBLoad}
            >
              <FormInput
                testId="streetAdress"
                value={formData.streetAddress}
                placeholder="Enter Street Address"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  if (event.target.value.includes("#")) return;
                  setFormData({
                    ...formData,
                    streetAddress: event.target.value,
                  });
                }}
              />
            </StandaloneSearchBox>
          )}
        </FormField>
        <FormField
          label="Adjust the pin"
          subLabel="Drag the map to the place the customer should meet you."
          required
        >
          <LocationMap
            defaultMapCoords={defaultMapCoords}
            markerCoords={formData.coords}
            onMarkerDragEnd={(newCoords) => handleMarkerDragEnd(newCoords)}
          />
        </FormField>
        <FormField
          className="max-w-[578px]"
          label="Directions to your meeting point"
          subLabel="Most captains mention the dock, marina or boat ramp that you use. These details will only be shared with customers after they book their trip."
          constrainsLabel={`${formData.directions.length}/500`}
        >
          <FormInput
            type="textarea"
            testId="directions"
            value={formData.directions}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              if (event.target.value.length <= 500) {
                setFormData({ ...formData, directions: event.target.value });
              }
            }}
            placeholder="Directions..."
          />
        </FormField>
      </div>
    </FormLayout>
  );
};
