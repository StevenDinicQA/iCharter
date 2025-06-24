"use client";

import { useAuthContext } from "@/context/AuthContext";
import apiService from "@/services/apiService";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";
import { CharterBooking, GroupedCharterBookings } from "./types";
import { charterBookingFactory } from "./charterBookingFactory";
import moment from "moment-timezone";
import CustomAlert from "@/components/shared/general/CustomAlert";
import { Modal } from "@/components/shared/general/molecules/Modal";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import { Booking, CancelBookingRequestData } from "../settings/bookings/types";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { DEFAULT_GUEST_NUMBER } from "@/app/market/listing/[id]/constants";

const SEARCH_TIMEOUT: number = 1200;
const NOW_AND_DEPARTURE_TIME_ALLOWED_DIFFERENCE_IN_MINUTES: number = 60;

function GroupBadges({
  discountType,
  isHandicap,
}: {
  discountType: string | undefined;
  isHandicap: boolean;
}) {
  return (
    <div className="flex gap-[4px]">
      {discountType ? (
        <div className="h-[31px] px-3.5 py-1.5 bg-blue-100 rounded-[25px] justify-center items-center gap-2.5 inline-flex">
          <div className="text-sky-600 text-xs font-medium leading-[18.40px]">
            {discountType}
          </div>
        </div>
      ) : null}
      {isHandicap ? (
        <div className="h-[31px] px-3.5 py-1.5 bg-slate-200 rounded-[25px] justify-center items-center gap-2.5 inline-flex">
          <div className="text-blue-500 text-xs font-medium leading-[18.40px]">
            Handicap
          </div>
        </div>
      ) : null}
    </div>
  );
}

const BookingsScreen = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const [bookings, setBookings] = useState<
    Required<CharterBooking[]> | undefined | null
  >(null);
  const [groupedBookings, setGroupedBookings] =
    useState<GroupedCharterBookings | null>(null);
  const [booking, setBooking] = useState<CharterBooking | undefined | null>(
    null
  );
  const [bookingToCancel, setBookingToCancel] = useState<CharterBooking | null>(
    null
  );
  const [isSucessModalOpen, setIsSucessModalOpen] = useState<boolean>(false);

  const [cancellingComments, setCancellingComments] = useState<string>("");
  const [isCancelBookingModalOpen, setIsCancelBookingModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (user) {
      getBookings();
    }
  }, [user]);

  useEffect(() => {
    let getData: NodeJS.Timeout;
    if (user) {
      getData = setTimeout(() => {
        setGroupedBookings(null);
        searchBookings();
      }, SEARCH_TIMEOUT);
    }

    return () => clearTimeout(getData);
  }, [searchTerm]);

  const isFormValid = useMemo(
    () => cancellingComments.trim(),
    [cancellingComments]
  );

  useEffect(() => {
    if (bookings) {
      const groupedBookings: GroupedCharterBookings = {};

      bookings.forEach((booking) => {
        const monthYearKey = moment(booking.starts_at).format("MMMM YYYY");

        if (!groupedBookings[monthYearKey]) {
          groupedBookings[monthYearKey] = [];
        }

        groupedBookings[monthYearKey].push(booking);
      });

      setGroupedBookings(groupedBookings);
    }
  }, [bookings]);

  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (isCancelBookingModalOpen || isSucessModalOpen || isBookingModalOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isCancelBookingModalOpen, isSucessModalOpen, isBookingModalOpen]);

  const getBookings = async (orderId: string | null = null) => {
    setIsLoading(true);
    const url: string = orderId
      ? `bookings/charter/${user?.charterProfile?.id}?orderId=${orderId}`
      : `bookings/charter/${user?.charterProfile?.id}`;
    const { data, error } = await apiService.get(url);
    if (error) {
      toast.error(error);
    }
    setBookings(charterBookingFactory(data) as Required<CharterBooking[]>);
    setIsLoading(false);
  };
  const searchBookings = () => {
    const _searchTerm: string = searchTerm.trim();
    if (searchTerm === "") {
      getBookings();
    } else {
      getBookings(_searchTerm);
    }
  };

  const canBookingBeCancelled = (bookingDate: string | undefined) => {
    if (!bookingDate) return;
    const isBookingInThePast = () => {
      return moment(bookingDate).isBefore(moment());
    };
    if (isBookingInThePast()) {
      return false;
    }
    const momentDate = moment(bookingDate).tz("America/New_York", true);
    const now = moment().tz("America/New_York", true);

    const minutesDifference = momentDate.diff(now, "minutes");

    return (
      minutesDifference > NOW_AND_DEPARTURE_TIME_ALLOWED_DIFFERENCE_IN_MINUTES
    );
  };

  const cancelBooking = async () => {
    if (!bookingToCancel) return;
    setIsLoading(true);
    if (!canBookingBeCancelled(bookingToCancel.metadata.departureDate)) {
      setIsLoading(false);
      toast.error("This booking cannot be cancelled, it departs to soon");
      handleCancelModalOnClose();
      return;
    }

    const cancelBookingRequestData: CancelBookingRequestData = {
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

  const openBookingModal = (_booking: CharterBooking) => {
    setBooking(_booking);
    setIsBookingModalOpen(true);
  };

  const handleCancelModalOnClose = () => {
    setBookingToCancel(null);
    setIsSucessModalOpen(false);
    setIsCancelBookingModalOpen(false);
  };

  const resetFields = () => {
    setBookingToCancel(null);
    setCancellingComments("");
  };

  const handleCloseCancelBookingModal = () => {
    setIsCancelBookingModalOpen(false);
    resetFields();
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    resetFields();
  };

  const guestNumber = (guestCount: number) => {
    return `${guestCount > 1 ? "Guests" : "Guest"}: ${guestCount}`;
  };
  const isIcharterBid = (bidId: string) => {
    return Boolean(bidId);
  };

  return (
    <main className="text-[#454545] pt-[20px] lg:pt-[75px] pl-[16px] lg:pl-[85px] pr-[18px] lg:pr-[90px] flex flex-col gap-[20px] lg:gap-[37px]">
      {isLoading && <ScreenLoading />}
      <h2 className="text-[18px] lg:text-[28px] font-[700]">Bookings</h2>
      <div className="w-auto h-12 px-[17px] py-3 bg-white rounded-xl border border-zinc-100 flex gap-[18px]">
        <Image
          width={24}
          height={24}
          src="/svgs/search_icon.svg"
          alt="Search icon"
        />
        <input
          className="w-full outline-none text-base font-medium leading-3"
          placeholder="Search Booking"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {groupedBookings ? (
        Object.keys(groupedBookings).length > 0 ? (
          <section className="px-5 py-2 md:px-10 md:py-7 bg-white rounded-[12px] flex flex-col items-center justify-center gap-[12px]">
            {Object.entries(groupedBookings)?.map(
              ([monthYearKey, bookingsInMonth], index) => {
                return (
                  <div key={index} className="w-full pt-2 flex flex-col gap-3">
                    <h3 key={index} className="w-full text-[18px] font-[700]">
                      {monthYearKey}
                    </h3>
                    {bookingsInMonth.length > 0 &&
                      bookingsInMonth?.map((booking, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => openBookingModal(booking)}
                            className="cursor-pointer w-full p-5 bg-stone-50 rounded-xl border border-zinc-100 flex flex-col gap-[13px] md:flex-row justify-between items-center"
                          >
                            <div className="flex flex-col gap-[13px]">
                              <div className="flex items-center gap-[12px]">
                                <div className="text-zinc-700 text-lg font-bold leading-tight">
                                  {booking.metadata.orderId}
                                </div>
                                <div className="flex-col sm:flex-row flex gap-[12px]">
                                  {isIcharterBid(booking.metadata.bidId) ? (
                                    <div className="w-[94px] h-[31px] px-3.5 py-1.5 bg-slate-200 rounded-[25px] justify-center items-center gap-2.5 inline-flex">
                                      <div className="text-blue-800 text-xs font-medium leading-[18.40px]">
                                        iCharterBid
                                      </div>
                                    </div>
                                  ) : null}
                                  {booking.is_canceled ? (
                                    <div className="w-[82px] h-[31px] px-3.5 py-1.5 bg-rose-50 rounded-[25px]">
                                      <div className="text-red-600 text-xs font-medium leading-[18px]">
                                        Canceled
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div>
                                <span className="text-zinc-700 text-base font-medium leading-[18.40px]">
                                  {booking.metadata.bookedBy}
                                </span>
                                <span className="text-zinc-700 text-base font-normal leading-[18.40px]">
                                  {" "}
                                  booked{" "}
                                </span>
                                <span className="text-zinc-700 text-base font-medium leading-[18.40px]">
                                  {booking.listing.experienceName}
                                </span>
                                <span className="text-zinc-700 text-base font-normal leading-[18.40px]">
                                  {" "}
                                  from{" "}
                                </span>
                                <span className="text-zinc-700 text-base font-medium leading-[18.40px]">
                                  {booking.listing.experienceType[0]}
                                </span>
                                <span className="text-zinc-700 text-base font-normal leading-[18.40px]">
                                  {" "}
                                  experience for
                                </span>
                                <span className="text-zinc-700 text-base font-medium leading-[18.40px]">
                                  {" "}
                                  {moment
                                    .parseZone(booking.starts_at)
                                    .format("MMMM DD, YYYY h:mm A")}
                                </span>
                              </div>
                              <div className="hidden md:block text-zinc-700 text-[13px] font-normal leading-[18px]">
                                {moment(booking.created_at)
                                  .local()
                                  .format("MMMM DD, YYYY [at] HH:mm")}
                              </div>
                            </div>
                            <div className="w-full md:w-auto flex flex-col items-center gap-[8px]">
                              {!booking.is_canceled &&
                              canBookingBeCancelled(
                                booking.metadata.departureDate
                              ) ? (
                                <a
                                  className="flex items-center justify-center w-[181px] h-10 bg-blue-800 rounded-xl text-center text-white text-sm font-medium leading-3"
                                  href={`mailto:${
                                    booking?.metadata?.bookedByEmail || ""
                                  }`}
                                >
                                  Message Customer
                                </a>
                              ) : (
                                <a className="flex items-center justify-center w-[181px] h-10 bg-neutral-200 rounded-xl text-center text-stone-300 text-sm font-medium leading-3">
                                  Message Customer
                                </a>
                              )}
                              {!booking.is_canceled &&
                              canBookingBeCancelled(
                                booking.metadata.departureDate
                              ) ? (
                                <div
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setBookingToCancel(booking);
                                    setIsCancelBookingModalOpen(true);
                                  }}
                                  className="cursor-pointer text-center text-zinc-700 text-sm font-medium underline leading-3"
                                >
                                  Cancel booking
                                </div>
                              ) : null}
                              <div className="flex w-full md:hidden justify-end text-zinc-700 text-[13px] font-normal leading-[18px]">
                                {moment(booking.created_at)
                                  .local()
                                  .format("MMMM DD, YYYY [at] HH:mm")}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              }
            )}
          </section>
        ) : (
          <section className="px-0 sm:px-4  md:px-10 py-4  bg-white rounded-[12px] flex flex-col items-center justify-center gap-[12px]">
            <div className="my-[65px] flex flex-col justify-center items-center gap-[12px]">
              <Image
                width={236}
                height={124}
                src="/svgs/empty_bookings.svg"
                alt="Fish icon"
              />
              <h3 className="text-[18px] font-[500] text-[#454545] text-center">
                You don’t have any bookings yet!
              </h3>
              <p className="text-[#BDBDBD] text-[16px]  lg:w-[426px] text-center mb-[11px]">
                Create a listing and publish it on the marketplace to start
                selling your trips!
              </p>
            </div>
          </section>
        )
      ) : null}

      <Modal
        className="w-[400px] md:w-[673px] bg-white rounded-xl shadow"
        isVisible={isBookingModalOpen}
      >
        <div className="py-[52px] pt-[10px] px-[23px] flex flex-col items-center justify-center">
          <div
            className="w-full flex justify-between cursor-pointer pt-[16px] pr-[16px]"
            onClick={handleCloseBookingModal}
          >
            <div className="text-zinc-700 text-[13px] font-medium leading-[18.40px]">
              {booking?.metadata.bookedBy}
            </div>
            <CloseIcon size={24} />
          </div>
          <div className="w-full flex flex-col items-start gap-[20px]">
            <div>
              <div className="text-zinc-700 text-xl font-medium leading-[18.40px]">
                {booking?.listing.experienceName}
              </div>
              <div className="text-zinc-700 text-base font-normal leading-[18.40px]">
                {booking?.listing.experienceType}
              </div>
              <div className="text-zinc-700 text-sm font-normal leading-[18.40px]">
                {moment
                  .parseZone(booking?.metadata.departureDate)
                  .format("MM/DD/YYYY")}
              </div>
              <div className="text-zinc-700 text-sm font-normal leading-[18.40px]">
                {booking?.metadata.privateGuests
                  ? guestNumber(booking?.metadata.privateGuests)
                  : guestNumber(
                      booking?.metadata.bookedSeats || DEFAULT_GUEST_NUMBER
                    )}
              </div>
              <div className="text-zinc-700 text-sm font-normal leading-[18.40px]">
                Duration: {booking?.listing.boat.duration}
              </div>
              <div className="text-zinc-700 text-sm font-normal leading-[18.40px]">
                Departure:{" "}
                {moment
                  .parseZone(booking?.metadata.departureDate)
                  .format("h:mm A")}
              </div>
              <div className="text-zinc-700 text-sm font-normal leading-[18.40px]">
                Price: ${booking?.metadata.tripPrice}
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <div className="text-zinc-700 text-base font-medium leading-tight">
                Description
              </div>
              <div className="text-black text-base font-normal leading-tight">
                {booking?.listing.description}
              </div>
            </div>
            <div className="w-full h-[1px] bg-stone-200"></div>
            {booking?.metadata.comments ? (
              <>
                <div className="flex flex-col gap-[8px]">
                  <div className="text-zinc-700 text-base font-medium leading-tight">
                    Customer Additional Comments
                  </div>
                  <div className="text-black text-base font-normal leading-tight">
                    {booking?.metadata.comments.charAt(0).toUpperCase() +
                      booking?.metadata.comments.slice(1)}
                  </div>
                </div>
                <div className="w-full h-[1px] bg-stone-200"></div>
              </>
            ) : null}

            <div className="flex flex-col gap-[8px]">
              <div className="text-zinc-700 text-base font-medium leading-tight">
                Meeting Point
              </div>
              <div className="text-zinc-700 text-base font-medium leading-tight">
                {booking
                  ? booking?.listing?.meetingPoint?.streetAddresss
                      .charAt(0)
                      .toUpperCase() +
                    booking?.listing.meetingPoint.streetAddresss.slice(1)
                  : null}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col mt-[13px]  gap-[24px]">
            {booking?.metadata?.discountType ||
            booking?.metadata?.isHandicap ? (
              <div className="w-full flex items-center justify-start">
                <div className="text-zinc-700 text-base font-medium leading-tight mr-[10px]">
                  Group:{" "}
                </div>
                <GroupBadges
                  discountType={booking?.metadata?.discountType}
                  isHandicap={booking?.metadata?.isHandicap}
                />
              </div>
            ) : null}

            <div className="w-full flex justify-center">
              <a
                className="flex items-center justify-center w-[181px] h-10 bg-blue-800 rounded-xl text-center text-white text-sm font-medium leading-3"
                href={`mailto:${booking?.metadata?.bookedByEmail || ""}`}
              >
                Message Customer
              </a>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isVisible={isCancelBookingModalOpen}
        className="w-[320px] sm:w-[400px] md:w-[577px] bg-white rounded-xl shadow pt-[17px] pb-[49px] px-[23px]"
      >
        <div
          className="w-full flex justify-end cursor-pointer"
          onClick={handleCloseCancelBookingModal}
        >
          <CloseIcon size={24} />
        </div>
        <div className="pt-[35px] flex flex-col items-center justify-center gap-[20px]">
          <Image
            src="/svgs/sunken_ship.svg"
            width={162}
            height={162}
            alt="Sunken Ship icon"
          />

          <div>
            <div className="w-auto flex flex-col">
              <div className="text-center text-zinc-700 text-xl font-bold leading-tight mb-[40px] md:mb-[80px]">
                Are you sure you want to cancel?
              </div>
              <div className="text-zinc-800 text-base font-medium leading-[18.18px] mb-[14px]">
                Let the customer know why you are canceling and when you can re
                arrange the date of the trip
              </div>
              <FormInput
                testId="comments"
                type="textarea"
                value={cancellingComments}
                placeholder=""
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  if (event.target.value.length <= 500) {
                    setCancellingComments(event.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex mt-[44px] gap-[12px] justify-center">
            <Button
              disabled={!isFormValid}
              onClick={cancelBooking}
              text="Submit"
              width={138}
              className="px-6 py-3.5 h-[40px] flex justify-center items-center rounded-xl text-center text-white text-sm font-medium leading-3"
            />
          </div>
        </div>
      </Modal>
      <Modal
        isVisible={isSucessModalOpen}
        className="flex flex-col items-center w-[335px] md:w-[438px] pt-[37px] pb-[52px] px-[23px] gap-[20px] bg-white rounded-xl shadow"
      >
        <div
          className="w-full flex justify-end cursor-pointer"
          onClick={handleCancelModalOnClose}
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
            The booking was canceled
          </div>
          <div className="text-center text-zinc-700 text-base font-normal leading-tight">
            We sent an email to the customer to let them know you cancelled the
            booking
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default BookingsScreen;
