import Rating from "@/app/market/checkout/Rating";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { TEXTAREA_INPUT_TYPE } from "@/components/shared/forms/atoms/customInputs/FormInput/types";
import { Modal } from "@/components/shared/general/molecules/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { REVIEW_COMMENTS_MAX_LENGTH } from "./constants";
import { CreateReviewRequestBody } from "./types";
import apiService from "@/services/apiService";
import toast from "react-hot-toast";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";
import { useAuthContext } from "@/context/AuthContext";
import { CharterBooking } from "@/app/home/bookings/types";
import { customerBookingFactory } from "./customerBookingFactory";

function ReviewCharter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthContext();
  const bookingId: string | null = searchParams.get("booking_id");
  const [rating, setRating] = useState<number>(0);
  const [reviewComments, setReviewComments] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [booking, setBooking] = useState<CharterBooking | null>(null);
  const [isCharterReviewModalOpen, setIsCharterReviewModalOpen] =
    useState<boolean>(Boolean(bookingId));

  useEffect(() => {
    getBooking();
  }, [user]);

  const closeModal = (): void => {
    setIsCharterReviewModalOpen(false);
  };

  const reviewCommentsOnChange = (comments: string): void => {
    if (comments.length <= REVIEW_COMMENTS_MAX_LENGTH) {
      setReviewComments(comments);
    }
  };

  const isFormValid = useMemo(() => {
    return rating > 0 || reviewComments.trim() !== "";
  }, [rating, reviewComments]);

  const createReview = async (): Promise<void> => {
    setIsLoading(true);
    const url: string = `bookings/${bookingId}/review/charter`;
    const body: CreateReviewRequestBody = {
      rating: String(rating),
      comments: reviewComments,
    };
    const { error } = await apiService.post(url, body);

    if (error) {
      toast.error(error);
      setIsLoading(false);
      setIsCharterReviewModalOpen(false);
      router.replace("/");
      return;
    }

    setIsLoading(false);
    setIsCharterReviewModalOpen(false);
    toast.success("Thanks for sending your feedback");
    router.replace("/");
  };

  const getBooking = async (): Promise<void> => {
    if (!user || !bookingId) return;

    setIsLoading(true);
    const url: string = `bookings/${bookingId}`;

    const { data, error } = await apiService.get(url);

    if (error) {
      toast.error(error);
      setIsLoading(false);
      setIsCharterReviewModalOpen(false);
      router.replace("/");
      return;
    }
    setBooking(customerBookingFactory(data) as Required<CharterBooking>);
    setIsLoading(false);
  };

  return (
    <Modal
      isVisible={isCharterReviewModalOpen}
      className="h-auto w-[90%] sm:w-[547px] sm:h-[684px] bg-white rounded-xl shadow"
    >
      {isLoading ? <ScreenLoading /> : null}
      <div className="py-[3.25rem] px-[1.875rem] flex flex-col">
        <div className="flex justify-end cursor-pointer" onClick={closeModal}>
          <CloseIcon size={24} />
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-center">
            <Image
              src="/svgs/first_listing.svg"
              alt="Review Icon"
              width={148}
              height={109}
              priority
            />
          </div>
          <div className="text-center text-zinc-700 text-xl font-bold leading-tight">
            We want to know what you think!
          </div>
          <div className="text-center">
            <span className="text-zinc-700 text-base font-normal leading-tight">
              Leave a review to{" "}
            </span>
            <span className="text-zinc-700 text-base font-medium leading-tight">
              {booking?.listing?.charterProfile?.companyName}
            </span>
            <span className="text-zinc-700 text-base font-normal leading-tight">
              {" "}
              about{" "}
            </span>
            <span className="text-zinc-700 text-base font-medium leading-tight">
              {booking?.listing?.experienceName}
            </span>
          </div>

          <div className="flex justify-center">
            <Rating
              rating={rating}
              setRating={setRating}
              includeLabel={false}
            />
          </div>
        </div>
        <div className="text-zinc-700 text-base font-medium leading-[15px] mt-[40px]">
          Tell us how was your experience with{" "}
          {booking?.listing?.charterProfile?.companyName}
        </div>
        <FormInput
          value={reviewComments}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            reviewCommentsOnChange(event.target.value)
          }
          placeholder=""
          test-id="home_review_comments_input"
          width="inherit"
          type={TEXTAREA_INPUT_TYPE}
          inputClassname="bg-white mt-[14px]"
        />
        <div className="text-right text-stone-300 text-[11px] font-normal leading-tight mt-[4px]">
          {reviewComments.length}/{REVIEW_COMMENTS_MAX_LENGTH}
        </div>
        <div className="text-zinc-700 text-[11px] font-normal leading-[15px]">
          Please be careful with your wording.
        </div>
        <div className="flex justify-end mt-[30px]">
          <Button
            text="Submit"
            disabled={!isFormValid}
            type="submit"
            onClick={createReview}
            className="flex items-center justify-center w-[138px] h-10 rounded-xl font-medium leading-3"
          />
        </div>
      </div>
    </Modal>
  );
}

export default ReviewCharter;
