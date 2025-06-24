"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import {
  Booking,
  BookingDetailsProps,
  CancelBookingRequestData,
} from "./types";
import moment from "moment-timezone";
import { ICHARTER_SERVICE_PORCENTAGE } from "@/utils/constants";
import toast from "react-hot-toast";
import { Modal } from "@/components/shared/general/molecules/Modal";
import { SelectInput } from "@/components/shared/forms/atoms/SelectInput";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import Image from "next/image";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import apiService from "@/services/apiService";
import { useAuthContext } from "@/context/AuthContext";
import { MultiValue, SingleValue } from "react-select";

const NOW_AND_DEPARTURE_TIME_ALLOWED_DIFFERENCE_IN_MINUTES: number = 60;

const BookingDetails = ({
  isMobile,
  isLoading,
  setIsLoading,
  bookings,
  getBookings,
}: BookingDetailsProps) => {
  const { user } = useAuthContext();
  const [isCancelBookingModalOpen, setIsCancelBookingModalOpen] =
    useState<boolean>(false);
  const [isSucessModalOpen, setIsSucessModalOpen] = useState<boolean>(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  const [cancellingReason, setCancellingReason] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [cancellingComments, setCancellingComments] = useState<string>("");
  const resetFields = () => {
    setCancellingComments("");
    setCancellingReason(null);
    setBookingToCancel(null);
  };

  const isFormValid = useMemo(() => {
    const trimmedComments = cancellingComments.trim();
    return !!trimmedComments && !!cancellingReason;
  }, [cancellingComments, cancellingReason]);

  const cancelBooking = async () => {
    if (!bookingToCancel) return;
    setIsLoading(true);
    if (!canBookingBeCancelled(bookingToCancel.metadata.departureDate)) {
      setIsLoading(false);
      toast.error("This booking cannot be cancelled, it departs to soon");
      handleModalOnClose();
      return;
    }

    const cancelBookingRequestData: CancelBookingRequestData = {
      reason: cancellingReason?.label || "",
      comments: cancellingComments,
    };

    const { data, error } = await apiService.patch(
      `bookings/user/${user?.id}/cancel/${bookingToCancel.id}`,
      cancelBookingRequestData
    );
    if (error) {
      setIsCancelBookingModalOpen(false);
      setIsLoading(false);
      resetFields();
      toast.error(error);

      return;
    }
    setIsLoading(false);
    setIsSucessModalOpen(true);
    getBookings();
    resetFields();
  };
  const handleModalOnClose = () => {
    resetFields();
    setIsSucessModalOpen(false);
    setIsCancelBookingModalOpen(false);
  };

  const handleCancelButtonClick = (booking: Booking) => {
    setIsCancelBookingModalOpen(true);
    setBookingToCancel(booking);
  };

  const canBookingBeCancelled = (bookingDate: string | undefined) => {
    if (!bookingDate) return;
    const momentDate = moment(bookingDate).tz("America/New_York", true);
    const now = moment().tz("America/New_York", true);

    const minutesDifference = momentDate.diff(now, "minutes");

    return (
      minutesDifference > NOW_AND_DEPARTURE_TIME_ALLOWED_DIFFERENCE_IN_MINUTES
    );
  };

  const isIcharterBid = (bidId: string) => {
    return Boolean(bidId?.trim());
  };

  const bookingGuestNumber = (guestNumber: number): string => {
    return guestNumber === 1 ? `${guestNumber} Guest` : `${guestNumber} Guests`;
  };

  return (
    <>
      {bookings?.map((booking, index) => {
        return (
          <div key={index}>
            {isMobile ? (
              <div className="px-[15px] py-[20px] bg-white border border-zinc-100 rounded-xl flex-col justify-start items-start flex">
                <div className="w-full flex justify-between">
                  <div className="w-full flex flex-col gap-[16px]">
                    <div className="flex justify-between items-center">
                      <div className="text-blue-800 text-xl font-bold leading-3">
                        {`${booking.listing.experienceName
                          .charAt(0)
                          .toUpperCase()}${booking.listing.experienceName.slice(
                          1
                        )}`}
                      </div>
                      {booking.is_canceled ? (
                        <div className="w-[82px] h-[31px] px-3.5 py-1.5 bg-rose-50 rounded-[25px]">
                          <div className="text-red-600 text-xs font-medium leading-[18px]">
                            Canceled
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-[12px]">
                      <div className="text-zinc-700 text-base font-semibold leading-3">
                        Reservation number:
                      </div>
                      <div className="text-zinc-700 text-base font-normal leading-tight">
                        {booking.metadata.orderId}
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="text-zinc-700 text-base font-semibold leading-3">
                        Duration:
                      </div>
                      <div className="text-zinc-700 text-base font-normal leading-tight">
                        {booking.listing.boat.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="text-zinc-700 text-base font-semibold leading-3">
                        Date:
                      </div>
                      <div className="text-zinc-700 text-base font-normal leading-tight">
                        {moment(booking.metadata.departureDate).format(
                          "dddd, MMMM D, YYYY"
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="text-zinc-700 text-base font-semibold leading-3">
                        Departure time:
                      </div>
                      <div className="text-zinc-700 text-base font-normal leading-tight">
                        {moment()
                          .hour(booking.listing.boat.departureTime.hour)
                          .minute(booking.listing.boat.departureTime.minute)
                          .format("h:mm A")}
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="text-zinc-700 text-base font-semibold leading-3">
                        Guests:
                      </div>
                      {booking.metadata.bookedSeats ? (
                        <div className="text-zinc-700 text-base font-normal leading-tight">
                          {bookingGuestNumber(
                            booking?.metadata?.privateGuests ||
                              booking?.metadata?.bookedSeats
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {!booking.is_canceled ? (
                  <div className="w-full flex flex-col  items-center gap-[12px] mt-[28px]">
                    <div className="w-full flex justify-between">
                      <div className="text-zinc-700 text-base font-bold leading-3">
                        {isIcharterBid(booking.metadata.bidId)
                          ? "Original"
                          : "Trip"}{" "}
                        Price
                      </div>
                      <div className="text-zinc-700 text-base font-normal leading-3">
                        $
                        {isIcharterBid(booking.metadata.bidId)
                          ? booking.listing.pricingModel.pricePerTrip
                          : booking.metadata.tripPrice}
                      </div>
                    </div>
                    {isIcharterBid(booking?.metadata?.bidId) ? (
                      <div className="p-[7px] flex justify-between bg-[#E0E2F0] rounded-xl w-[103%]">
                        <div className="text-blue-800 text-base font-bold leading-3">
                          Bid by customer
                        </div>
                        <div className="text-right text-blue-800 text-base font-normal leading-3">
                          ${booking.metadata.tripPrice}
                        </div>
                      </div>
                    ) : null}
                    {booking.metadata.discountType ? (
                      <div className="p-[7px] flex justify-between bg-blue-100 rounded-xl w-[103%]">
                        <div className="text-sky-600 text-base font-bold leading-3">
                          {booking.metadata.discountType} Discount
                        </div>
                        <div className="text-right text-sky-600 text-base font-normal leading-3">
                          -${booking.metadata.discountAmount}
                        </div>
                      </div>
                    ) : null}

                    <div className="w-full flex justify-between">
                      <div className="text-zinc-700 text-base font-bold leading-3">
                        You paid ({ICHARTER_SERVICE_PORCENTAGE}%)
                      </div>
                      <div className="text-right text-zinc-700 text-base font-normal leading-3">
                        ${booking.metadata.youPayToday}
                      </div>
                    </div>

                    <div className="w-full flex justify-between">
                      <div className="text-zinc-700 text-base font-bold leading-3">
                        You pay to the captain
                      </div>
                      <div className="text-right text-zinc-700 text-base font-bold leading-3">
                        ${booking.metadata.payToTheCaptain}
                      </div>
                    </div>

                    <div className="w-full flex justify-between">
                      <div className="w-[225px] text-zinc-700 text-[13px] font-normal leading-none tracking-wide">
                        The total is paid to the captain at the moment in the
                        accepted payment method
                      </div>
                      <div />
                    </div>
                  </div>
                ) : null}
                {!booking.is_canceled && (
                  <div className="px-[24px] py-[18px] mt-[20px] bg-slate-100 rounded-xl flex-col justify-start items-start gap-[6px] inline-flex">
                    <div className="text-zinc-700 text-base font-bold leading-loose">
                      Cancellation Policy
                    </div>
                    <div className="text-zinc-700 text-sm font-normal leading-tight">
                      iCharter always returns {ICHARTER_SERVICE_PORCENTAGE}%
                      deposit in case of cancellation.
                    </div>
                    {canBookingBeCancelled(booking?.metadata?.departureDate) ? (
                      <div
                        className="cursor-pointer w-full text-right text-zinc-700 text-sm font-medium underline leading-3"
                        onClick={() => handleCancelButtonClick(booking)}
                      >
                        Cancel booking
                      </div>
                    ) : null}
                  </div>
                )}
                <div className="w-full flex justify-center mt-[20px]">
                  {booking.is_canceled ? (
                    <Button disabled={true} text="Message Captain" />
                  ) : (
                    <Button
                      text="Message Captain"
                      href={`mailto:${booking.listing.charterProfile.email}`}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full px-[22px] py-[21px] bg-white rounded-xl border border-zinc-100 flex-col justify-start items-start gap-[30px] flex">
                <div className="w-full flex justify-between">
                  <div className="flex flex-col gap-[16px]">
                    <div className="text-blue-800 text-xl font-bold leading-3">
                      {`${booking.listing.experienceName
                        .charAt(0)
                        .toUpperCase()}${booking.listing.experienceName.slice(
                        1
                      )}`}
                    </div>
                    <div className="flex items-center gap-[65px]">
                      <div className="w-[175px] text-zinc-700 text-base font-medium leading-3">
                        Reservation number:
                      </div>
                      <div className="text-zinc-700 text-base font-normal leading-tight">
                        {booking.metadata.orderId}
                      </div>
                    </div>
                    <div className="flex items-center gap-[65px]">
                      <div className="w-[175px] text-zinc-700 text-base font-medium leading-3">
                        Duration:
                      </div>
                      <div className="text-zinc-700 text-base font-normal leading-tight">
                        {booking.listing.boat.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-[65px]">
                      <div className="w-[175px] text-zinc-700 text-base font-medium leading-3">
                        Date:
                      </div>
                      <div className="text-zinc-700 text-base font-normal leading-tight">
                        {moment(booking.metadata.departureDate).format(
                          "dddd, MMMM D, YYYY"
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-[65px]">
                      <div className="w-[175px] text-zinc-700 text-base font-medium leading-3">
                        Departure time:
                      </div>
                      <div className="text-zinc-700 text-base font-normal leading-tight">
                        {moment()
                          .hour(booking.listing.boat.departureTime.hour)
                          .minute(booking.listing.boat.departureTime.minute)
                          .format("h:mm A")}
                      </div>
                    </div>
                    <div className="flex items-center gap-[65px]">
                      <div className="w-[175px] text-zinc-700 text-base font-medium leading-3">
                        Guests:
                      </div>
                      {booking.metadata.bookedSeats ? (
                        <div className="text-zinc-700 text-base font-normal leading-tight">
                          {bookingGuestNumber(
                            booking?.metadata?.privateGuests ||
                              booking?.metadata?.bookedSeats
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    {booking.is_canceled ? (
                      <Button disabled={true} text="Message Captain" />
                    ) : (
                      <Button
                        text="Message Captain"
                        href={`mailto:${booking.listing.charterProfile.email}`}
                      />
                    )}
                    {booking.is_canceled ? (
                      <div className="w-[82px] h-[31px] px-3.5 py-1.5 bg-rose-50 rounded-[25px]">
                        <div className="text-red-600 text-xs font-medium leading-[18px]">
                          Canceled
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                {!booking.is_canceled ? (
                  <>
                    <div className="w-full flex flex-col gap-[12px] items-center">
                      <div className="w-full flex justify-between">
                        <div className="text-zinc-700 text-sm font-medium leading-3">
                          {isIcharterBid(booking.metadata.bidId)
                            ? "Original"
                            : "Trip"}{" "}
                          Price
                        </div>
                        <div className="text-zinc-700 text-sm font-normal leading-3">
                          $
                          {isIcharterBid(booking.metadata.bidId)
                            ? booking.listing.pricingModel.pricePerTrip
                            : booking.metadata.tripPrice}
                        </div>
                      </div>
                      {isIcharterBid(booking?.metadata?.bidId) ? (
                        <div className="p-[7px] flex justify-between bg-[#E0E2F0] rounded-xl w-[102%]">
                          <div className="text-blue-800 text-sm font-medium leading-3">
                            Bid by customer
                          </div>
                          <div className="text-blue-800 text-sm font-normal leading-3">
                            ${booking.metadata.tripPrice}
                          </div>
                        </div>
                      ) : null}
                      {booking.metadata.discountType ? (
                        <div className="p-[7px] flex justify-between bg-blue-100 rounded-xl w-[102%]">
                          <div className="text-sky-600 text-sm font-medium leading-3">
                            {booking.metadata.discountType} Discount
                          </div>
                          <div className="text-sky-600 text-sm font-normal leading-3">
                            -${booking.metadata.discountAmount}
                          </div>
                        </div>
                      ) : null}

                      <div className="w-full flex justify-between">
                        <div className="text-zinc-700 text-sm font-medium leading-3">
                          You paid ({ICHARTER_SERVICE_PORCENTAGE}%)
                        </div>
                        <div className="text-zinc-700 text-sm font-normal leading-3">
                          ${booking.metadata.youPayToday}
                        </div>
                      </div>

                      <div className="w-full flex justify-between">
                        <div className="text-zinc-700 text-sm font-medium leading-3">
                          You pay to the captain
                        </div>
                        <div className="text-zinc-700 text-sm font-bold leading-3">
                          $
                          {Number.isInteger(booking?.metadata?.payToTheCaptain)
                            ? booking?.metadata?.payToTheCaptain
                            : booking?.metadata?.payToTheCaptain?.toFixed(2)}
                        </div>
                      </div>

                      <div className="w-full flex justify-between">
                        <div className="text-zinc-700 text-[13px] font-normal leading-none">
                          The total is paid to the captain at the moment in the
                          accepted payment method
                        </div>
                        <div />
                      </div>
                    </div>
                    <div className="w-[743px] px-6 py-[18px] bg-slate-100 rounded-xl flex-col justify-start items-start gap-[9px] inline-flex">
                      <div className="text-zinc-700 text-base font-bold leading-loose">
                        Cancellation Policy
                      </div>
                      <div className="text-zinc-700 text-sm font-medium leading-[15px]">
                        Free cancellation up to 14 days prior to trip
                      </div>
                      <div className="text-zinc-700 text-sm font-normal leading-tight">
                        You may cancel your trip free of charge up to 14 days in
                        advance. However, since your selected date is less than
                        14 days away, you may only cancel if it is unsafe to
                        travel.
                      </div>
                      <div className="text-zinc-700 text-sm font-medium leading-loose">
                        iCharter always returns {ICHARTER_SERVICE_PORCENTAGE}%
                        deposit in case of cancellation.
                      </div>
                      {canBookingBeCancelled(
                        booking?.metadata?.departureDate
                      ) ? (
                        <div
                          onClick={() => handleCancelButtonClick(booking)}
                          className="w-full text-right text-zinc-700 text-sm font-medium underline cursor-pointer leading-3"
                        >
                          Cancel booking
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
      <Modal
        isVisible={isCancelBookingModalOpen}
        className="w-[95%] sm:w-[400px] md:w-[673px] bg-white rounded-xl shadow"
      >
        <div
          className="w-full flex justify-end cursor-pointer pt-[16px] pr-[16px]"
          onClick={handleModalOnClose}
        >
          <CloseIcon size={24} />
        </div>
        <div className="py-[52px] px-[23px] flex flex-col items-center justify-center gap-[20px]">
          <Image
            src="/svgs/dead_fish.svg"
            width={106}
            height={86}
            alt="Dead fish icon"
          />
          <div>
            <div className="w-auto sm:w-[336px] md:w-[447px] flex flex-col gap-[8px]">
              <div className="text-zinc-700 text-[15px] font-medium leading-[15px]">
                Why do you need to cancel?
              </div>
              <SelectInput
                value={cancellingReason}
                options={[
                  {
                    label: "Family Illness or Death",
                    value: "family_illness_or_death",
                  },
                  {
                    label: "Red Tide on News",
                    value: "red_tide_on_news",
                  },
                  {
                    label: "Saw Chance of Rain",
                    value: "saw_chance_of_rain",
                  },
                  {
                    label: "Personal Health Issues",
                    value: "personal_health_issues",
                  },
                  {
                    label: "Insufficient Funds",
                    value: "insufficient_funds",
                  },
                  { label: "Family Pet Sick", value: "family_pet_sick" },
                  { label: "Car Troubles", value: "car_troubles" },
                  {
                    label: "Feeling Hungover",
                    value: "feeling_hungover",
                  },
                  {
                    label: "COVID_19 Concerns",
                    value: "covid_19_concerns",
                  },
                  {
                    label: "Found a Cheaper Deal",
                    value: "found_a_cheaper_deal",
                  },
                  { label: "Plans Changed", value: "plans_changed" },
                  {
                    label: "Catastrophic Event",
                    value: "catastrophic_event",
                  },
                ]}
                placeholder="Please select a reason"
                onChange={(newValue) => {
                  //@ts-ignore
                  setCancellingReason(newValue);
                }}
              />
            </div>
          </div>

          <div>
            <div className="w-auto sm:w-[336px] md:w-[447px] flex flex-col gap-[8px]">
              <div className="text-zinc-700 text-base font-medium leading-[30px]">
                Tell {bookingToCancel?.listing.charterProfile.companyName} why
                you are canceling
              </div>
              <FormInput
                testId="comments"
                type="textarea"
                value={cancellingComments}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  if (event.target.value.length <= 500) {
                    setCancellingComments(event.target.value);
                  }
                }}
              />
            </div>
            <div className="flex mt-[44px] gap-[12px] justify-center">
              <button
                disabled={isLoading}
                onClick={handleModalOnClose}
                className="w-[107px] h-10 px-6 py-3.5 bg-neutral-200 rounded-xl text-center text-zinc-700 text-sm font-medium  leading-3"
              >
                Go Back
              </button>
              <Button
                disabled={!isFormValid}
                onClick={() => cancelBooking()}
                text="Confirm"
                className="px-6 py-3.5 h-[40px] flex items-center rounded-xl text-center text-white text-sm font-medium leading-3"
              />
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isVisible={isSucessModalOpen}
        className="flex flex-col items-center w-[335px] md:w-[438px] pt-[37px] pb-[52px] px-[23px] gap-[20px] bg-white rounded-xl shadow"
      >
        <div
          className="w-full flex justify-end cursor-pointer"
          onClick={handleModalOnClose}
        >
          <CloseIcon size={24} />
        </div>

        <Image
          src="/svgs/sunken_ship.svg"
          width={162}
          height={162}
          alt="Sunken ship icon"
        />
        <div>
          <div className="text-center text-zinc-700 text-xl font-bold leading-loose mb-[12px]">
            Your booking was canceled
          </div>
          <div className="text-center text-zinc-700 text-base font-normal leading-tight">
            We sent an email to the charter to let them know you cancelled the
            booking
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookingDetails;
