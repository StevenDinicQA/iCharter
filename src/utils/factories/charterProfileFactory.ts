import { CharterProfile } from "@/types/listings/listing";

export const charterProfileFactory = (payload: any): CharterProfile => {
  return {
    id: payload?.id || '',
    email: payload?.email || '',
    companyName: payload?.companyName || '',
    captains: payload?.captains || [],
    phoneNumber: payload?.phoneNumber || '',
    yearsOfExperience: payload?.yearsOfExperience || null,
    licensePDFUrl: payload?.licensePDFUrl ? `${payload.licensePDFUrl}` : '',
    location: payload?.location || '',
    profilePictureUrl: payload?.profilePictureUrl || null,
    nationality: payload?.nationality || null,
    groups: payload?.groups || null,
    createdAt: payload?.createdAt || '',
    media: payload?.media || [],
    listings: payload?.listings || [],
    trips: payload?.trips || 0,
    listingsPublished: payload?.listingsPublished || 0,
    instagram: payload.instagram || "",
    facebook: payload.facebook || "",
    tikTok: payload.tikTok || "",
    yelp: payload.yelp || "",
    rating: payload.rating,
    totalRatings: payload.totalRatings,
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
