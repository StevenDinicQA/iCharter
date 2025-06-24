"use client";
import { useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmptyState from "./emptyState";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import BookingDetails from "./bookingsDetails";
import apiService from "@/services/apiService";
import { useAuthContext } from "@/context/AuthContext";
import { Booking } from "./types";
import toast from "react-hot-toast";
import { bookingFactory } from "./bookingFactory";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";

const MyBookingsSettingsScreen = () => {
  const isMobile = useMediaQuery("(max-width:1024px)");

  const { user } = useAuthContext();

  const [bookings, setBookings] = useState<
    Required<Booking[]> | undefined | null
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      getBookings();
    }
  }, [user]);

  const getBookings = async () => {
    setIsLoading(true);
    const { data, error } = await apiService.get(
      `bookings/customer/${user?.id}`
    );
    if (error) {
      toast.error(error);
    }
    setBookings(bookingFactory(data) as Required<Booking[]>);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <ScreenLoading />}
      <section className={`w-full flex flex-col ${isMobile && "items-center"}`}>
        {isMobile && (
          <h2 className="text-[18px] lg:text-[28px] font-[700] mt-2 ml-2 self-start">
            My Bookings
          </h2>
        )}
        <div
          className={`${
            isMobile ? "py-[20px] px-[11px]" : "p-[50px]"
          } bg-white rounded-[12px] flex flex-col gap-[19px] ${
            isMobile && "mt-8"
          } min-h-[600px] ${isMobile && "justify-center "} max-w-[912px]`}
        >
          {!isMobile && (
            <h2 className="text-[18px] lg:text-[28px] font-[700] ml-2">
              My Bookings
            </h2>
          )}
          <div className="w-full flex flex-col items-center">
            {bookings && bookings?.length > 0 ? (
              <div className="flex  flex-col gap-3">
                <BookingDetails
                  isMobile={isMobile}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  bookings={bookings}
                  getBookings={getBookings}
                />
              </div>
            ) : (
              <EmptyState isMobile={isMobile} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyBookingsSettingsScreen;
