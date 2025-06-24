import { EXPERIENCE_TYPE } from "@/components/listings/organisms/GeneralInformationForm/types";
import apiService from "@/services/apiService";
import s3Service from "@/services/s3_service";
import {
  ListingFormData,
  Listing,
  Availability,
} from "@/types/listings/listing";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

export const createListing = async (
  formData: ListingFormData,
  listingData?: Listing | null
) => {
  /**
   * Handle media upload to the listing
   */

  if (formData.media) {
    //TODO: Si aca tomo el id de los medias del listing y lo comparo con el id de los medias de formData podria filtrar los repetidos antes de subirlo al bucket y evitar duplicados

    let media = formData.media;
    if (listingData) {
      media = media.filter((formDataMedia) => {
        return !listingData.media.some(
          (listingMedia) => listingMedia.id === formDataMedia.id
        );
      });
    }
    for (const { file } of media) {
      const responseUrl = await s3Service.uploadFileToBucket(file);

      if (responseUrl) {
        await apiService.post(`listings/${formData.id}/media`, {
          fileUrl: responseUrl,
        });
      }
    }
  }

  /**
   *  Handle fishing data upload to the listing
   */
  if (
    formData.experienceType.includes(
      EXPERIENCE_TYPE.FISHING_CHARTERS
    ) || 
    formData.experienceType.includes(
      EXPERIENCE_TYPE.TOURS_DOLPHINS_ISLAND_SUNSET_SUNRISE_SHELLING
    )
  ) {
    const { error: fishingExperienceError } = await apiService.post(
      `listings/${formData.id}/fishingExperience`,
      {
        targetedSpecies: formData.targetedSpecies.map((TSElement) => ({
          name: TSElement.name || TSElement.label,
          imageUrl: TSElement.imageUrl,
        })),
        fishingTechniques: formData.fishingTechniques,
        includedInPrice: formData.includedInPrice,
      }
    );

    if (fishingExperienceError) {
      toast.error(fishingExperienceError);
      throw new Error(fishingExperienceError);
    }
  }

  /**
   * Handle boat information upload to the listing
   */
  const { departureTime } = formData;

  const departureTimeFormatted = {
    hour: departureTime.hour,
    minute: departureTime.minute,
  };

  if (departureTime.isPM) {
    if (departureTime.hour === 12) {
      departureTime.hour = 0;
    } else {
      departureTimeFormatted.hour += 12;
    }
  }

  const { error: boatError } = await apiService.post(
    `listings/${formData.id}/boat`,
    {
      boatDescription: formData.boatDescription,
      boatType: formData.boatType?.value || "",
      guestCapacity: formData.guestCapacity,
      duration: formData.duration?.value || "",
      facilities: formData.facilities,
      departureTime: departureTimeFormatted,
      seasonalExperience: formData.seasonalExperience?.value || "",
      availability: {
        mon: formData.availability.includes("mon"),
        tue: formData.availability.includes("tue"),
        wed: formData.availability.includes("wed"),
        thu: formData.availability.includes("thu"),
        fri: formData.availability.includes("fri"),
        sat: formData.availability.includes("sat"),
        sun: formData.availability.includes("sun"),
      },
    }
  );

  if (boatError) {
    toast.error(boatError);
    throw new Error(boatError);
  }

  /**
   * Handle meeting information upload to the listing
   */
  const { error: meetingPointError } = await apiService.post(
    `listings/${formData.id}/meetingPoint`,
    {
      streetAddresss: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      latitude: formData.coords.lat,
      longitude: formData.coords.lng,
      directions: formData.directions,
    }
  );

  if (meetingPointError) {
    toast.error(meetingPointError);
    throw new Error(meetingPointError);
  }

  const mappedSpecialDiscounts: any = {};

  Object.entries(formData.specialDiscounts).forEach(([key, value]) => {
    mappedSpecialDiscounts[key] = value?.value || "0";
  });

  const { error: pricingModelError } = await apiService.post(
    `listings/${formData.id}/pricingModel`,
    {
      type: formData.type ? formData.type.toLowerCase() : null,
      pricePerTrip: Number(formData.pricePerTrip),
      specialDiscounts: mappedSpecialDiscounts,
      paymentMethod: formData.paymentMethod,
      cancelationPolicy: formData.cancelationPolicy,
      hasIcharterBid: formData.hasIcharterBid,
      minBid: formData.bidRange[0],
      maxBid: formData.bidRange[1],
    }
  );

  if (pricingModelError) {
    toast.error(pricingModelError);
    throw new Error(pricingModelError);
  }
};

const convertAvailability = (availability: Availability) => {
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const convertedAvailability = days.filter(
    (day) => availability[day as keyof Availability]
  );
  return convertedAvailability;
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const AssignFormDataFromListing = async (listingData: Listing) => {
  const mediaResponse = await Promise.all(
    listingData?.media.map((item) => {
      return fetch(item.fileUrl);
    })
  );

  const mediaBlobs = await Promise.all(
    mediaResponse.map((item) => {
      return item.blob();
    })
  );

  /*const mediaFiles = mediaBlobs.map((blob) => {
    const file = new File([blob], 'image.jpg', {type: blob.type})
    return { file, id: nanoid() };
  })*/

  const mediaFiles = listingData?.media.map((item, index) => {
    const blob = mediaBlobs[index];
    const file = new File([blob], "image.jpg", { type: blob.type });
    return { file, id: item.id || nanoid() };
  });

  let experienceTypeArray: string[] = [];

  if (typeof listingData.experienceType === "string") {
    experienceTypeArray = [listingData.experienceType];
  } else if (Array.isArray(listingData.experienceType)) {
    experienceTypeArray = listingData.experienceType;
  }

  let boatImg: string;
  if(listingData.boat.boatType){
    const formattedBoatType = listingData?.boat?.boatType
    ?.toLowerCase()
    ?.replace(/ /g, "_");
    boatImg = `/imgs/${formattedBoatType}.svg`;
  } else {
    boatImg = "";
  }

  return {
    id: listingData.id,
    charterProfileId: listingData?.charterProfile?.id,
    experienceName: listingData.experienceName,
    experienceType: experienceTypeArray,
    description: listingData.description ?? "",
    captains: listingData.captains || [],
    targetedSpecies: listingData.fishingExperience?.targetedSpecies || [],
    fishingTechniques: listingData.fishingExperience?.fishingTechniques || [],
    includedInPrice: listingData.fishingExperience?.includedInPrice || [],
    boatDescription: listingData.boat?.boatDescription || "",
    boatType: {
      label: listingData.boat?.boatType || "",
      value: listingData.boat?.boatType || "",
      imageUrl: boatImg,
    },
    guestCapacity: listingData.boat?.guestCapacity || 0,
    duration: {
      label: listingData.boat?.duration || "",
      value: listingData.boat?.duration || "",
    },
    facilities: listingData.boat?.facilities || [],
    departureTime: listingData.boat?.departureTime || {
      hour: 0,
      minute: 0,
      isPM: false,
    },
    seasonalExperience: {
      label: listingData.boat?.seasonalExperience || "",
      value: listingData.boat?.seasonalExperience || "",
    },
    availability: convertAvailability(listingData.boat?.availability || {}),
    streetAddress: listingData.meetingPoint?.streetAddresss || "",
    city: listingData.meetingPoint?.city || "",
    state: listingData.meetingPoint?.state || "",
    zipCode: listingData.meetingPoint?.zipCode || "",
    coords: {
      lat: listingData.meetingPoint?.latitude || 0,
      lng: listingData.meetingPoint?.longitude || 0,
    },
    directions: listingData.meetingPoint?.directions || "",
    type: capitalizeFirstLetter(listingData.pricingModel?.type || ""),
    pricePerTrip:
      typeof listingData.pricingModel?.pricePerTrip === "number"
        ? listingData.pricingModel.pricePerTrip
        : parseFloat(listingData.pricingModel?.pricePerTrip) || 0,
    specialDiscounts: {
      veteran:
        listingData.pricingModel?.specialDiscounts?.veteran === "0"
          ? null
          : {
              label: `${
                listingData.pricingModel?.specialDiscounts?.veteran || "0"
              }%`,
              value: listingData.pricingModel?.specialDiscounts?.veteran || "0",
            },
      military:
        listingData.pricingModel?.specialDiscounts?.military === "0"
          ? null
          : {
              label: `${
                listingData.pricingModel?.specialDiscounts?.military || "0"
              }%`,
              value:
                listingData.pricingModel?.specialDiscounts?.military || "0",
            },
      firstResponders:
        listingData.pricingModel?.specialDiscounts?.firstResponders === "0"
          ? null
          : {
              label: `${
                listingData.pricingModel?.specialDiscounts?.firstResponders ||
                "0"
              }%`,
              value:
                listingData.pricingModel?.specialDiscounts?.firstResponders ||
                "0",
            },
    },
    paymentMethod: listingData.pricingModel?.paymentMethod || [],
    cancelationPolicy: listingData.pricingModel?.cancelationPolicy || "",
    hasIcharterBid: listingData.pricingModel?.hasIcharterBid,
    bidRange: [
      listingData.pricingModel?.minBid || 0,
      listingData.pricingModel?.maxBid || 0,
    ],
    media: mediaFiles || [],
  };
};
