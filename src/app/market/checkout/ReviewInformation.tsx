"use client";
import { ChangeEvent, useMemo, useState } from "react";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { TEXTAREA_INPUT_TYPE } from "@/components/shared/forms/atoms/customInputs/FormInput/types";
import { useCheckoutContext } from "./CheckoutContext";
import { CreateReviewRequestBody, StepProps } from "./types";
import { useRouter } from "next/navigation";
import Rating from "./Rating";
import { useAuthContext } from "@/context/AuthContext";
import apiService from "@/services/apiService";
import toast from "react-hot-toast";
import ReviewSuccess from "./reviewSuccess";
import Cookies from "js-cookie";

export const ReviewInformation = ({ isResponsive }: StepProps) => {
  const { user } = useAuthContext();
  const { reservationNumber, setIsLoading, removeSuccessfulBookingCookies } =
    useCheckoutContext();
  const [reviewComments, setReviewComments] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isReviewCreated, setIsReviewCreated] = useState<boolean>(false);

  const isReviewEnabled = useMemo(
    () => rating > 0 || reviewComments.trim() !== "",
    [reviewComments, rating]
  );

  const createReview = async (): Promise<void> => {
    setIsLoading(true);

    const body: CreateReviewRequestBody = {
      rating: String(rating),
      comments: reviewComments,
    };

    const { data, error } = await apiService.post(
      `bookings/${user?.id}/review`,
      body
    );
    if (error) {
      toast.error(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setIsReviewCreated(true);
    Cookies.remove("checkout_listing_id");
    Cookies.remove("checkout_bid_amount");
    Cookies.remove("checkout_bid_request_id");
    Cookies.remove("checkout_order_id");
    Cookies.remove("checkout_booking_id");
  };

  const goToMarketPlace = (): void => {
    router.push("/market");
    removeSuccessfulBookingCookies();
  };

  const router = useRouter();
  return isResponsive ? (
    <div className="flex flex-col gap-[32px] w-[342px] py-[20px] px-[10px] bg-white rounded-xl">
      <div className="text-zinc-700 text-[28px] font-medium leading-9">
        Enjoy your experience!
      </div>
      <div className="w-80">
        <span className="text-zinc-700 text-lg font-normal leading-tight">
          Your reservation number is{" "}
        </span>
        <span className="text-zinc-700 text-lg font-medium leading-tight">
          {reservationNumber}
        </span>
        <span className="text-zinc-700 text-lg font-normal leading-tight">
          {" "}
          <br />
          <br />
          You will receive an email to{" "}
        </span>
        <div className="break-all text-zinc-700 text-lg font-medium leading-tight">
          {user?.email}
        </div>
        <span className="text-zinc-700 text-lg font-normal leading-tight">
          {" "}
          with all the necessary information
        </span>
      </div>
      <button
        className="w-[188px] h-10 py-3.5 bg-blue-800 rounded-xl"
        onClick={goToMarketPlace}
      >
        <div className="text-center text-white text-sm font-medium leading-3">
          Return to Homepage
        </div>
      </button>
      {!isReviewCreated ? (
        <div className="flex flex-col gap-[40px] bg-indigo-50 rounded-xl py-[20px] px-[10px]">
          <div>
            <div className="text-zinc-700 text-base font-medium leading-[18px] mb-[20px]">
              Tell us how was your booking experience
            </div>
            <Rating rating={rating} setRating={setRating} />
          </div>
          <div>
            <div className="text-zinc-700 text-base font-medium leading-[15px] mb-[14px]">
              Leave us some comments!
            </div>

            <FormInput
              value={reviewComments}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setReviewComments(event.target.value)
              }
              placeholder=""
              test-id="review_comments_input"
              width="inherit"
              type={TEXTAREA_INPUT_TYPE}
              inputClassname="bg-white"
            />
          </div>
          <div className="w-full justify-end items-center flex">
            <Button
              width={138}
              text="Submit"
              onClick={createReview}
              disabled={!isReviewEnabled}
            />
          </div>
        </div>
      ) : (
        <ReviewSuccess />
      )}
    </div>
  ) : (
    <div className="flex flex-col gap-[32px] w-[786px]">
      <div className="text-zinc-700 text-[40px] font-medium  leading-[18px]">
        Enjoy your experience!
      </div>
      <div>
        <span className="text-zinc-700 text-lg font-normal leading-tight">
          Your reservation number is{" "}
        </span>
        <span className="text-zinc-700 text-lg font-medium leading-tight">
          {reservationNumber}
        </span>
        <span className="text-zinc-700 text-lg font-normal  leading-tight">
          <br />
          <br />
          You will receive an email to{" "}
        </span>
        <span className="text-zinc-700 text-lg font-medium leading-tight">
          {user?.email}
        </span>
        <span className="text-zinc-700 text-lg font-normal leading-tight">
          {" "}
          <br />
          with all the necessary information
        </span>
      </div>
      <button
        className="w-[188px] h-10 py-3.5 bg-blue-800 rounded-xl"
        onClick={goToMarketPlace}
      >
        <div className="text-center text-white text-sm font-medium leading-3">
          Return to Homepage
        </div>
      </button>
      {!isReviewCreated ? (
        <div className="flex flex-col gap-[40px] bg-indigo-50 rounded-xl py-[35px] px-[30px]">
          <div>
            <div className="text-zinc-700 text-base font-medium leading-[18px] mb-[20px]">
              Tell us how was your booking experience
            </div>
            <Rating rating={rating} setRating={setRating} />
          </div>
          <div>
            <div className="text-zinc-700 text-base font-medium leading-[15px] mb-[14px]">
              Leave us some comments!
            </div>

            <FormInput
              value={reviewComments}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setReviewComments(event.target.value)
              }
              placeholder=""
              test-id="review_comments_input"
              width="inherit"
              type={TEXTAREA_INPUT_TYPE}
              inputClassname="bg-white"
            />
          </div>
          <div className="w-full justify-end items-center flex">
            <Button
              width={138}
              disabled={!isReviewEnabled}
              text="Submit"
              onClick={createReview}
            />
          </div>
        </div>
      ) : (
        <ReviewSuccess />
      )}
    </div>
  );
};
