import { Listing } from "@/types/listings/listing";


function randomIntFromInterval(min: number, max: number) { // min and max included 
  return (Math.random() * (max - min + 1) + min)/100000;
}


export const listingFactory = (payload: any): Listing => {
  const targetedSpecies = payload?.fishingExperience?.targetedSpecies.map(
    (item: any) => ({
      imageUrl: item.imageUrl,
      label: item.name,
      value: item.name,
    })
  );

  return {
    id: payload?.id,
    experienceName: payload?.experienceName,
    experienceType: payload?.experienceType,
    captains: payload?.captains,
    createdAt: payload?.createdAt,
    description: payload?.description,
    media: payload?.media,
    charterProfile: {
      id: payload?.charterProfile?.id,
      email: payload?.charterProfile?.email,
      companyName: payload?.charterProfile?.companyName,
      captains: payload?.charterProfile?.captains,
      phoneNumber: payload?.charterProfile?.phoneNumber,
      yearsOfExperience: payload?.charterProfile?.yearsOfExperience,
      licensePDFUrl: payload?.charterProfile?.licensePDFUrl,
      location: payload?.charterProfile?.location,
      profilePictureUrl: payload?.charterProfile?.profilePictureUrl,
      nationality: payload?.charterProfile?.nationality,
      groups: payload?.charterProfile?.groups,
      createdAt: payload?.charterProfile?.createdAt,
      media: payload?.charterProfile?.media,
      instagram: payload.charterProfile.instagram || "",
      facebook: payload.charterProfile.facebook || "",
      tikTok: payload.charterProfile.tikTok || "",
      yelp: payload.charterProfile.yelp || "",
      rating: payload?.charterProfile?.rating,
      totalRatings: payload?.charterProfile?.totalRatings,
    },
    boat: {
      id: payload?.boat?.id,
      boatType: payload?.boat?.boatType,
      boatDescription: payload?.boat?.boatDescription,
      createdAt: payload?.boat?.createdAt,
      availability: {
        mon: payload?.boat?.availability?.mon,
        tue: payload?.boat?.availability?.tue,
        wed: payload?.boat?.availability?.wed,
        thu: payload?.boat?.availability?.thu,
        fri: payload?.boat?.availability?.fri,
        sat: payload?.boat?.availability?.sat,
        sun: payload?.boat?.availability?.sun,
      },
      departureTime: {
        hour: payload?.boat?.departureTime?.hour,
        minute: payload?.boat?.departureTime?.minute,
        isPM: payload?.boat?.departureTime?.isPM,
      },
      guestCapacity: payload?.boat?.guestCapacity,
      duration: payload?.boat?.duration,
      facilities: payload?.boat?.facilities,
      seasonalExperience: payload?.boat?.seasonalExperience,
    },
    fishingExperience: {
      id: payload?.fishingExperience?.id,
      createdAt: payload?.fishingExperience?.createdAt,
      targetedSpecies: targetedSpecies,
      includedInPrice: payload?.fishingExperience?.includedInPrice,
      fishingTechniques: payload?.fishingExperience?.fishingTechniques,
    },
    meetingPoint: {
      id: payload?.meetingPoint?.id,
      createdAt: payload?.meetingPoint?.createdAt,
      directions: payload?.meetingPoint?.directions,
      city: payload?.meetingPoint?.city,
      state: payload?.meetingPoint?.state,
      latitude: payload?.meetingPoint?.latitude + randomIntFromInterval(0, 5),
      longitude: payload?.meetingPoint?.longitude + randomIntFromInterval(0, 5),
      streetAddresss: payload?.meetingPoint?.streetAddresss,
      zipCode: payload?.meetingPoint?.zipCode,
    },
    pricingModel: {
      id: payload?.pricingModel?.id,
      createdAt: payload?.pricingModel?.createdAt,
      paymentMethod: payload?.pricingModel?.paymentMethod,
      cancelationPolicy: payload?.pricingModel?.cancelationPolicy,
      pricePerTrip: payload?.pricingModel?.pricePerTrip,
      type: payload?.pricingModel?.type,
      hasIcharterBid: payload?.pricingModel?.hasIcharterBid,
      minBid: payload?.pricingModel?.minBid,
      maxBid: payload?.pricingModel?.maxBid,
      specialDiscounts: {
        veteran: payload?.pricingModel?.specialDiscounts?.veteran,
        military: payload?.pricingModel?.specialDiscounts?.military,
        firstResponders:
          payload?.pricingModel?.specialDiscounts?.firstResponders,
      },
    },
  };
};
