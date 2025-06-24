import { CharterBooking } from "./types";

export const charterBookingFactory = (payload: any): CharterBooking[] => {
  return payload?.map((bookingPayload: CharterBooking) => {
    return {
      id: bookingPayload?.id,
      price: bookingPayload?.price,
      metadata: {
        userId: bookingPayload?.metadata?.userId,
        orderId: bookingPayload?.metadata?.orderId,
        listingId: bookingPayload?.metadata?.listingId,
        paymentId: bookingPayload?.metadata?.paymentId,
        departureDate: bookingPayload?.metadata?.departureDate,
        charterProfileId: bookingPayload?.metadata?.charterProfileId,
        tripPrice: bookingPayload?.metadata?.tripPrice,
        bookedSeats: bookingPayload?.metadata?.bookedSeats,
        privateGuests: bookingPayload?.metadata?.privateGuests,
        payToTheCaptain: bookingPayload?.metadata?.payToTheCaptain,
        youPayToday: bookingPayload?.metadata?.youPayToday,
        bookedBy: bookingPayload?.metadata?.bookedBy,
        bookedByEmail: bookingPayload?.metadata?.bookedByEmail,
        comments: bookingPayload?.metadata?.comments,
        discountType: bookingPayload?.metadata?.discountType,
        isHandicap: bookingPayload?.metadata?.isHandicap,
        bidId: bookingPayload?.metadata?.bidId,
      },
      protected_metadata: bookingPayload?.protected_metadata,
      starts_at: bookingPayload?.starts_at,
      ends_at: bookingPayload?.ends_at,
      buffer_starts_at: bookingPayload?.buffer_starts_at,
      buffer_ends_at: bookingPayload?.buffer_ends_at,
      created_at: bookingPayload?.created_at,
      updated_at: bookingPayload?.updated_at,
      finalized_at: bookingPayload?.finalized_at,
      canceled_at: bookingPayload?.canceled_at,
      is_temporary: bookingPayload?.is_temporary,
      is_canceled: bookingPayload?.is_canceled,
      isICharterBid: bookingPayload?.isICharterBid,
      resource: {
        id: bookingPayload?.resource?.id,
        name: bookingPayload?.resource?.name,
        max_simultaneous_bookings:
          bookingPayload?.resource?.max_simultaneous_bookings,
        metadata: {
          listingId: bookingPayload?.resource?.metadata?.listingId,
          charterProfileId:
            bookingPayload?.resource?.metadata?.charterProfileId,
        },
        protected_metadata: bookingPayload?.resource?.protected_metadata,
        enabled: bookingPayload?.resource?.enabled,
        created_at: bookingPayload?.resource?.created_at,
        updated_at: bookingPayload?.resource?.updated_at,
      },
      listing: {
        id: bookingPayload?.listing?.id,
        experienceName: bookingPayload?.listing?.experienceName,
        experienceType: bookingPayload?.listing?.experienceType,
        captains: bookingPayload?.listing?.captains,
        description: bookingPayload?.listing?.description,
        isCompleted: bookingPayload?.listing?.isCompleted,
        isPublished: bookingPayload?.listing?.isPublished,
        isFinished: bookingPayload?.listing?.isFinished,
        resourceId: bookingPayload?.listing?.resourceId,
        serviceId: bookingPayload?.listing?.serviceId,
        scheduleId: bookingPayload?.listing?.scheduleId,
        createdAt: bookingPayload?.listing?.createdAt,
        boat: {
          id: bookingPayload?.listing?.boat?.id,
          boatType: bookingPayload?.listing?.boat?.boatType,
          boatDescription: bookingPayload?.listing?.boat?.boatDescription,
          guestCapacity: bookingPayload?.listing?.boat?.guestCapacity,
          duration: bookingPayload?.listing?.boat?.duration,
          seasonalExperience: bookingPayload?.listing?.boat?.seasonalExperience,
          facilities: bookingPayload?.listing?.boat?.facilities,
          availability: {
            mon: bookingPayload?.listing?.boat?.availability?.mon,
            tue: bookingPayload?.listing?.boat?.availability?.tue,
            wed: bookingPayload?.listing?.boat?.availability?.wed,
            thu: bookingPayload?.listing?.boat?.availability?.thu,
            fri: bookingPayload?.listing?.boat?.availability?.fri,
            sat: bookingPayload?.listing?.boat?.availability?.sat,
            sun: bookingPayload?.listing?.boat?.availability?.sun,
          },
          departureTime: {
            hour: bookingPayload?.listing?.boat?.departureTime?.hour,
            minute: bookingPayload?.listing?.boat?.departureTime?.minute,
          },
          isCompleted: bookingPayload?.listing?.boat?.isCompleted,
          createdAt: bookingPayload?.listing?.boat?.createdAt,
        },
        fishingExperience: {
          id: bookingPayload?.listing?.fishingExperience?.id,
          targetedSpecies:
            bookingPayload?.listing?.fishingExperience?.targetedSpecies,
          fishingTechniques:
            bookingPayload?.listing?.fishingExperience?.fishingTechniques,
          includedInPrice:
            bookingPayload?.listing?.fishingExperience?.includedInPrice,
          createdAt: bookingPayload?.listing?.fishingExperience?.createdAt,
        },
        pricingModel: {
          id: bookingPayload?.listing?.pricingModel?.id,
          type: bookingPayload?.listing?.pricingModel?.type,
          pricePerTrip: bookingPayload?.listing?.pricingModel?.pricePerTrip,
          specialDiscounts: {
            veteran:
              bookingPayload?.listing?.pricingModel?.specialDiscounts?.veteran,
            military:
              bookingPayload?.listing?.pricingModel?.specialDiscounts?.military,
            firstResponders:
              bookingPayload?.listing?.pricingModel?.specialDiscounts
                ?.firstResponders,
          },
          paymentMethod: bookingPayload?.listing?.pricingModel?.paymentMethod,
          cancelationPolicy:
            bookingPayload?.listing?.pricingModel?.cancelationPolicy,
          hasIcharterBid: bookingPayload?.listing?.pricingModel?.hasIcharterBid,
          minBid: bookingPayload?.listing?.pricingModel?.minBid,
          maxBid: bookingPayload?.listing?.pricingModel?.maxBid,
          createdAt: bookingPayload?.listing?.pricingModel?.createdAt,
        },
        meetingPoint: {
          id: bookingPayload?.listing?.meetingPoint?.id,
          streetAddresss: bookingPayload?.listing?.meetingPoint?.streetAddresss,
          state: bookingPayload?.listing?.meetingPoint?.state,
          zipCode: bookingPayload?.listing?.meetingPoint?.zipCode,
          latitude: bookingPayload?.listing?.meetingPoint?.latitude,
          longitude: bookingPayload?.listing?.meetingPoint?.longitude,
          directions: bookingPayload?.listing?.meetingPoint?.directions,
          createdAt: bookingPayload?.listing?.meetingPoint?.createdAt,
        },
        charterProfile: {
          email: bookingPayload?.listing?.charterProfile?.email,
        },
      },
    };
  });
};
