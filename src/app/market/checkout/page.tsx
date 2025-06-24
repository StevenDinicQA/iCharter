"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { useMediaQuery } from "@mui/material";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";

import { AnchorIcon } from "@/components/shared/general/atoms/icons/AnchorIcon";
import { LocationIcon } from "@/components/shared/general/atoms/icons/LocationIcon";
import { useCheckoutContext } from "./CheckoutContext";
import moment from "moment";

import { stripe } from "@/helpers/stripe";
import { Elements } from "@stripe/react-stripe-js";
import CustomAlert from "@/components/shared/general/CustomAlert";
import { MinusIcon } from "@/components/shared/general/atoms/icons/MinusIcon";
import { PlusIcon } from "@/components/shared/general/atoms/icons/PlusIcon";
import CheckoutProvider from "./CheckoutContext";
import { ICHARTER_SERVICE_PORCENTAGE } from "@/utils/constants";
import { CheckoutStep } from "./types";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/shared/general/atoms/icons/ArrowLeft";
import Cookies from "js-cookie";

const GUEST_NUMBER_FOR_PRIVATE_LISTINGS: number = 1;

function CheckoutPage() {
  return (
    <Elements stripe={stripe}>
      <CheckoutProvider>
        <CheckoutPageWithContext />
      </CheckoutProvider>
    </Elements>
  );
}

function CheckoutPageWithContext() {
  const router = useRouter();
  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const { setCurrentScreenTitle } = useAuthContext();
  const {
    isLoading,
    listingData,
    checkoutDate,
    selectedDiscount,
    amountToPayLater,
    amountToPayToday,
    getStepComponent,
    reduceGuestNumber,
    increaseGuestNumber,
    guestNumber,
    setCurrentStep,
    currentStep,
    error,
    showError,
    setShowError,
    isBookingPrivate,
    bidAmount,
    setPreviousGuestNumber,
    setGuestNumber,
    previousGuestNumber,
  } = useCheckoutContext();
  const [isGuestNumberAlertOpen, setIsGuestNumberAlertOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setCurrentScreenTitle("Checkout");
  }, []);

  const tripPrice = () => {
    if (!listingData) return;
    return (
      Number(listingData.pricingModel.pricePerTrip) *
      (isBookingPrivate ? GUEST_NUMBER_FOR_PRIVATE_LISTINGS : guestNumber)
    );
  };

  const handleCloseGuestNumberAlert = () => {
    if (previousGuestNumber) {
      setGuestNumber(previousGuestNumber);
    }
    setIsGuestNumberAlertOpen(false);
  };

  const handleOpenGuestNumberAlert = () => {
    setPreviousGuestNumber(guestNumber);
    setIsGuestNumberAlertOpen(true);
  };

  const mediaFileUrl: string = listingData?.media[0].fileUrl || "";

  function handleReturn() {
    // Check if the current step in the checkout process is payment
    if (currentStep === CheckoutStep.PAYMENT) {
      // If current step is payment, go back to customer information step
      setCurrentStep(CheckoutStep.CUSTOMER_INFORMATION);
    } else {
      // If current step is not payment, remove checkout order and booking IDs from cookies
      Cookies.remove("checkout_order_id");
      Cookies.remove("checkout_booking_id");
    }

    // Navigate back to the previous page
    router.back();
  }

  return (
    <>
      {isLoading && <ScreenLoading />}
      {listingData && (
        <>
          <div className="w-full max-w-[478px] lg:max-w-[1280px] lg:px-4">
            <button
              className="self-start ml-4 lg:ml-0 mt-10 flex items-center gap-1"
              onClick={handleReturn}
              test-id="signin_back-button"
            >
              <ArrowLeft fill="black" size={16} />
              <p className="md:block hidden">Go Back</p>
            </button>
          </div>

          {isResponsive ? (
            <div className="w-full max-w-[478px] flex-col justify-start items-center gap-[18px] inline-flex p-4">
              <div className="p-2.5 bg-white rounded-xl justify-start items-center gap-[17px] flex">
                <div className="w-[143.70px] h-32 relative">
                  {/(mp4|mov|avi|wav)/.test(mediaFileUrl) ? (
                    <video
                      src={mediaFileUrl}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      className="w-[145px] h-32 left-[-0.85px] top-0 absolute rounded-xl object-cover"
                      src={mediaFileUrl}
                    />
                  )}
                </div>
                <div className="flex-col justify-start items-start gap-[15px] inline-flex">
                  <div>
                    <div className="text-zinc-700 text-base font-bold leading-4">
                      {listingData.experienceName}
                    </div>
                    <div className="text-zinc-700 text-[11px] font-medium leading-3">
                      {listingData.charterProfile.companyName}
                    </div>
                  </div>
                  {Boolean(listingData.charterProfile.rating) && (
                    <div className="flex-col justify-start items-start flex">
                      <div className="flex items-center text-zinc-700 text-[11px] font-medium uppercase leading-3">
                        <div className="text-[#2D3AAF] flex item gap-[3px] mr-[4px]">
                          <AnchorIcon size={15} />
                        </div>
                        <div className="opacity-70">
                          {listingData.charterProfile.rating}/5
                        </div>
                      </div>
                      <div className="opacity-70 text-zinc-700 text-[11px] font-medium leading-3">
                        {listingData.charterProfile.totalRatings} Reviews
                      </div>
                    </div>
                  )}
                  <div className="opacity-70 justify-start items-center gap-1 flex">
                    <LocationIcon stroke="#454545" size={16} />
                    <span className="text-zinc-700 text-[11px] font-medium leading-3">
                      {listingData.meetingPoint.streetAddresss}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-stone-200"></div>

              <div className="bg-white flex-col justify-start items-start gap-5 flex py-[20px] px-[10px] rounded-xl">
                <div className="text-zinc-700 text-xl font-bold leading-3">
                  Trip Details
                </div>
                <div className="gap-2 flex">
                  <div className="text-zinc-700 text-base font-medium  leading-3">
                    Duration:{" "}
                  </div>
                  <div className="text-zinc-700 text-base font-normal leading-3">
                    {listingData.boat.duration}
                  </div>
                </div>
                <div className="gap-2 flex">
                  <div className="text-zinc-700 text-base font-medium  leading-3">
                    Date:
                  </div>
                  <div className="text-zinc-700 text-base font-normal leading-3">
                    {checkoutDate}
                  </div>
                </div>
                <div className="gap-2 flex">
                  <div className="text-zinc-700 text-base font-medium  leading-3">
                    Time:
                  </div>
                  <div className="text-zinc-700 text-base font-normal leading-3">
                    {moment()
                      .hour(listingData.boat.departureTime.hour)
                      .minute(listingData.boat.departureTime.minute)
                      .format("h:mm A")}
                  </div>
                </div>
                <div className="w-full gap-2 justify-between flex">
                  <div className="flex">
                    <div className="text-zinc-700 text-base font-medium  leading-3">
                      Guests:
                    </div>
                    <div className="ml-2 text-zinc-700 text-base font-normal leading-3">
                      {guestNumber} Guest{guestNumber > 1 ? "s" : null}
                    </div>
                  </div>

                  {currentStep !== CheckoutStep.REVIEW ? (
                    <div
                      onClick={() => setIsGuestNumberAlertOpen(true)}
                      className="text-zinc-700 text-base font-medium underline leading-3 cursor-pointer"
                    >
                      Edit
                    </div>
                  ) : null}
                </div>
                <div className="flex-col justify-center items-center gap-[16px] flex">
                  <div className="w-full flex justify-between">
                    <div className="text-zinc-700 text-lg font-bold leading-3">
                      {bidAmount ? "Original Price" : "Trip Price"}
                    </div>
                    <div className="text-zinc-700 text-lg font-normal leading-3">
                      ${tripPrice()}
                    </div>
                  </div>
                  {bidAmount && (
                    <div className="w-full flex flex-col items-center">
                      <div className="w-full h-[1px] bg-stone-200 mb-[16px]"></div>
                      <div className="w-[106%] px-5 h-[42px] flex items-center bg-[#E0E2F0] rounded-xl justify-between">
                        <div className="text-sky-600 text-lg font-bold leading-3">
                          Bid by customer
                        </div>
                        <div className="text-right text-sky-600 text-lg font-normal leading-3">
                          ${bidAmount}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="w-full h-[1px] bg-stone-200"></div>
                  <div className="w-full flex justify-between">
                    <div className="text-zinc-700 text-lg font-bold leading-3">
                      You pay today ({ICHARTER_SERVICE_PORCENTAGE}%)
                    </div>
                    <div className="text-zinc-700 text-lg font-normal leading-3">
                      ${amountToPayToday}
                    </div>
                  </div>

                  {selectedDiscount ? (
                    <div className="w-full flex flex-col items-center">
                      <div className="w-full h-[1px] bg-stone-200 mb-[16px]"></div>
                      <div className="w-[104%] px-1 py-[11px] flex items-center bg-blue-100 rounded-xl justify-between">
                        <div className="text-sky-600 text-lg font-bold leading-3">
                          {selectedDiscount.label} Discount
                        </div>
                        <div className="whitespace-nowrap text-right text-sky-600 text-lg font-normal leading-3">
                          -${selectedDiscount.amount}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="w-full h-[1px] bg-stone-200"></div>
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col justify-start items-start gap-[9px]">
                      <div className="text-zinc-700 text-lg font-bold leading-3">
                        You pay to the captain
                      </div>
                      <div className="w-2/3 text-zinc-700 text-[13px] font-normal leading-none">
                        The total is paid to the captain at the moment in the
                        accepted payment method
                      </div>
                    </div>
                    <div className="text-zinc-700 text-lg font-bold leading-3">
                      ${amountToPayLater}
                    </div>
                  </div>
                </div>
              </div>
              {getStepComponent(isResponsive)}
            </div>
          ) : (
            <div className="justify-center items-start gap-4 inline-flex mt-[20px] w-full px-4">
              {getStepComponent(isResponsive)}
              <div className="px-[30px] pt-[21px] pb-[42px] bg-white rounded-xl justify-start items-start gap-2.5 flex mb-4">
                <div className="flex-col justify-start items-center gap-[18px] inline-flex">
                  <div className="w-[357px] h-[142px]">
                    {/(mp4|mov|avi|wav)/.test(mediaFileUrl) ? (
                      <video
                        src={mediaFileUrl}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={mediaFileUrl}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    )}
                  </div>
                  <div className="w-[357px] flex-col justify-center items-start gap-4 flex">
                    <div className="flex-col justify-start items-start gap-5 flex">
                      <div className="flex-col justify-start items-start gap-2.5 flex">
                        <div className="flex items-center gap-3">
                          <div className=" h-4 text-zinc-700 text-xl font-bold leading-3">
                            {listingData.experienceName}
                          </div>
                          {Boolean(listingData.charterProfile.rating) && (
                            <>
                              <div className="text-[#2D3AAF] flex item gap-[3px]">
                                <AnchorIcon size={20} />
                              </div>
                              <div className="text-zinc-700 text-base font-normal leading-3">
                                {listingData.charterProfile.rating}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="text-zinc-700 text-base font-medium leading-3">
                          {listingData.charterProfile.companyName}
                        </div>
                        <div className="flex items-center text-zinc-700 text-[13px] font-medium leading-none gap-1">
                          <LocationIcon stroke="#454545" size={16} />
                          {listingData.meetingPoint.streetAddresss}
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-stone-200 my-[20px]"></div>

                      <div className="text-zinc-700 text-xl font-bold leading-3">
                        Trip Details
                      </div>
                      <div className="gap-2 flex">
                        <div className="text-zinc-700 text-base font-medium  leading-3">
                          Duration:{" "}
                        </div>
                        <div className="text-zinc-700 text-base font-normal leading-3">
                          {listingData.boat.duration}
                        </div>
                      </div>
                      <div className="gap-2 flex">
                        <div className="text-zinc-700 text-base font-medium  leading-3">
                          Date:
                        </div>
                        <div className="text-zinc-700 text-base font-normal leading-3">
                          {checkoutDate}
                        </div>
                      </div>
                      <div className="gap-2 flex">
                        <div className="text-zinc-700 text-base font-medium  leading-3">
                          Time:
                        </div>
                        <div className="text-zinc-700 text-base font-normal leading-3">
                          {moment()
                            .hour(listingData.boat.departureTime.hour)
                            .minute(listingData.boat.departureTime.minute)
                            .format("h:mm A")}
                        </div>
                      </div>
                      <div className="w-full gap-2 justify-between flex">
                        <div className="flex">
                          <div className="text-zinc-700 text-base font-medium  leading-3">
                            Guests:
                          </div>
                          <div className="ml-2 text-zinc-700 text-base font-normal leading-3">
                            {guestNumber} Guest{guestNumber > 1 ? "s" : null}
                          </div>
                        </div>

                        {currentStep !== CheckoutStep.REVIEW ? (
                          <div
                            onClick={handleOpenGuestNumberAlert}
                            className="text-zinc-700 text-base font-medium underline leading-3 cursor-pointer"
                          >
                            Edit
                          </div>
                        ) : null}
                      </div>
                      <div className="flex-col justify-center items-center gap-[16px] flex">
                        <div className="w-full flex justify-between">
                          <div className="text-zinc-700 text-lg font-bold leading-3">
                            {bidAmount ? "Original Price" : "Trip Price"}
                          </div>
                          <div className="text-zinc-700 text-lg font-normal leading-3">
                            ${tripPrice()}
                          </div>
                        </div>
                        {bidAmount && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-full h-[1px] bg-stone-200 mb-[16px]"></div>
                            <div className="w-[106%] px-5 h-[42px] flex items-center bg-[#E0E2F0] rounded-xl justify-between">
                              <div className="text-sky-600 text-lg font-bold leading-3">
                                Bid by customer
                              </div>
                              <div className="text-right text-sky-600 text-lg font-normal leading-3">
                                ${bidAmount}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="w-full h-[1px] bg-stone-200"></div>
                        <div className="w-full flex justify-between">
                          <div className="text-zinc-700 text-lg font-bold leading-3">
                            You pay today ({ICHARTER_SERVICE_PORCENTAGE}%)
                          </div>
                          <div className="text-zinc-700 text-lg font-normal leading-3">
                            ${amountToPayToday}
                          </div>
                        </div>

                        {selectedDiscount ? (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-full h-[1px] bg-stone-200 mb-[16px]"></div>
                            <div className="w-[106%] px-3 h-[42px] flex items-center bg-blue-100 rounded-xl justify-between">
                              <div className="text-sky-600 text-lg font-bold leading-3">
                                {selectedDiscount.label} Discount
                              </div>
                              <div className="text-right text-sky-600 text-lg font-normal leading-3">
                                -${selectedDiscount.amount}
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <div className="w-full h-[1px] bg-stone-200"></div>
                        <div className="w-full flex justify-between">
                          <div className="flex flex-col justify-start items-start gap-[9px]">
                            <div className="text-zinc-700 text-lg font-bold leading-3">
                              You pay to the captain
                            </div>
                          </div>
                          <div className="text-zinc-700 text-lg font-bold leading-3">
                            ${amountToPayLater}
                          </div>
                        </div>
                        <p className="mt-2 text-zinc-700 text-[13px] font-normal leading-none">
                          The total is paid to the captain at the moment in the
                          accepted payment method
                        </p>
                        <p className="text-zinc-700 text-[13px] font-normal leading-none">
                          This total does not include a tip for the Captain and
                          Crew. A customary minimum tip of 20% is recommended.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isGuestNumberAlertOpen && (
            <CustomAlert
              openModal={isGuestNumberAlertOpen}
              setOpenModal={handleCloseGuestNumberAlert}
              width={265}
            >
              <div className="flex flex-col gap-[12px] h-[148px]">
                <div className="text-center text-zinc-700 text-xl font-bold leading-normal">
                  Guest number
                </div>
                <div className="flex justify-between items-center w-[88px] m-auto">
                  <div
                    onClick={reduceGuestNumber}
                    className={`w-[27px] h-[27px] rounded-full border-2 border-zinc-700 flex items-center justify-center ${
                      guestNumber > 1 ? "cursor-pointer" : ""
                    }`}
                  >
                    <MinusIcon size={16} />
                  </div>
                  <div className="text-black text-[13.19px] font-medium leading-3">
                    {guestNumber}
                  </div>
                  <div
                    onClick={increaseGuestNumber}
                    className="w-[27px] h-[27px] rounded-full border-2 border-zinc-700 flex items-center justify-center cursor-pointer"
                  >
                    <PlusIcon size={20} />
                  </div>
                </div>
                <Button
                  text="Save"
                  onClick={() => setIsGuestNumberAlertOpen(false)}
                />
              </div>
            </CustomAlert>
          )}
        </>
      )}
      <CustomAlert
        openModal={showError}
        setOpenModal={setShowError}
        width={isResponsive ? 344 : 459}
      >
        <div className="px-10 py-7 flex-col justify-start items-center gap-9 inline-flex">
          <div className="text-center text-zinc-700 text-xl font-bold leading-loose">
            {error || "There is no longer capacity for that number of guests"}
          </div>
          <Image
            src={`/svgs/fish_rod_icon.svg`}
            alt="Fish and Rod"
            width={210}
            height={176}
          />

          <div className="text-center text-zinc-700 text-base font-normal leading-tight">
            Change the number of guests to be able to book this experience
          </div>
        </div>
      </CustomAlert>
    </>
  );
}

export default CheckoutPage;
