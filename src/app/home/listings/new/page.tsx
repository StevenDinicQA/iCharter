"use client";
import { Steps } from "@/components/listings/molecules/Steps";
import Close from "@mui/icons-material/Close";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { DEFAULT_STEPS, STEPS } from "./constants";
import { useCreateListingForm } from "./hooks";
import { createListing, AssignFormDataFromListing } from "./utils";
import { EXPERIENCE_TYPE } from "@/components/listings/organisms/GeneralInformationForm/types";
import { useRouter, useSearchParams } from "next/navigation";
import CustomAlert from "@/components/shared/general/CustomAlert";
import Image from "next/image";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { useData } from "@/context/DataContext";
import apiService from "@/services/apiService";
import { toast } from "react-hot-toast";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";

const NewListingScreen = () => {
  const [formData, setFormData] = useCreateListingForm();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [hasFishingSection, setHasFishingSection] = useState<boolean>(false);
  const [hasBookings, setHasBookings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { listingData, setListingData } = useData();

  const handleNextNavigation = async () => {
    if (isUploading) return;

    if (
      currentStep ===
      (hasFishingSection ? DEFAULT_STEPS.length - 3 : STEPS.length - 3)
    ) {
      let setDuration;

      if (formData?.duration?.value === "Full Day") setDuration = 8;
      if (formData?.duration?.value === "6 hours") setDuration = 6;
      if (formData?.duration?.value === "Half Day") setDuration = 4;
      if (formData?.duration?.value === "2 hours") setDuration = 2;

      if (formData?.departureTime?.isPM) {
        const durationTimeSum = setDuration! + formData?.departureTime?.hour;

        if (durationTimeSum === 12 && formData?.departureTime?.minute > 0) {
          toast.error("Duration and time exceeded the day", { duration: 7000 });
          return;
        }

        if (durationTimeSum > 12 && formData?.departureTime?.hour !== 12) {
          toast.error("Duration and time exceeded the day", { duration: 7000 });
          return;
        }
      }
    }

    if (
      currentStep <
      (hasFishingSection ? DEFAULT_STEPS.length - 1 : STEPS.length - 1)
    ) {
      setCurrentStep(currentStep + 1);
      return;
    }

    try {
      setIsUploading(true);
      await createListing(formData, listingData);
      router.replace("/home/listings?complete=true");
      setIsUploading(false);
      setListingData(null);
    } catch (error) {
      setIsUploading(false);
    }
  };

  const handleBackNavigation = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      return;
    }

    router.back();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const determineCurrentStep = () => {
    const CurrentStepComponent = hasFishingSection
      ? DEFAULT_STEPS[currentStep]
      : STEPS[currentStep];

    return (
      <CurrentStepComponent
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleNextNavigation}
        isUploading={isUploading}
        isDisabled={isDisabled}
        hasBookings={hasBookings}
      />
    );
  };

  const handleExitAndDelete = async () => {
    const { status } = await apiService.delete(`listings/${formData.id}`);

    if (status === 409) {
      setIsExitModalOpen(false);
      toast.error(
        "Oh! It looks like this listing has active bookings and can&lsquo;t be deleted"
      );
      return;
    }
    setIsExitModalOpen(false);
    router.replace("/home/listings");
  };

  const handleSaveDraft = async () => {
    router.replace("/home/listings");
  };

  useEffect(() => {
    setIsDisabled(isUploading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploading]);

  useEffect(() => {
    if (
      formData.experienceType.includes(
        EXPERIENCE_TYPE.FISHING_CHARTERS
      ) ||
      formData.experienceType.includes(EXPERIENCE_TYPE.TOURS_DOLPHINS_ISLAND_SUNSET_SUNRISE_SHELLING)
    ) {
      setHasFishingSection(true);
      return;
    }

    setHasFishingSection(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    const updateListingData = async () => {
      const editParam = searchParams.get("edit");
      const finishParam = searchParams.get("finish");

      if (editParam || finishParam) {
        if (listingData) {
          const updatedFormData = await AssignFormDataFromListing(listingData);
          setFormData(updatedFormData);
        }
      }
    };

    updateListingData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const hasBookings = async () => {
      const editParam = searchParams.get("edit");

      if (editParam && formData.id) {
        const { data, error } = await apiService.get(
          `bookings/listing/${formData.id}`
        );

        if (error) {
          toast.error(error);
          return;
        }

        if (data.data.length) {
          setHasBookings(true);
        }
      }
    };

    hasBookings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, formData.id]);

  useEffect(() => {
    const editParam = searchParams.get("edit");
    const finishParam = searchParams.get("finish");

    if (formData?.id && editParam) {
      setLoading(false);
    }

    if (formData?.id && finishParam) {
      setLoading(false);
    }

    if (!editParam && !finishParam) {
      setLoading(false);
    }
  }, [formData]);

  return (
    <>
      {isUploading && <ScreenLoading />}
      {loading && <ScreenLoading />}
      <div className="my-[54px] lg:px-[90px] flex flex-col justify-center items-center">
        <nav className="w-full flex justify-center items-center lg:justify-between">
          <button
            onClick={handleBackNavigation}
            disabled={isDisabled}
            className="absolute m-[12px] ml-[15px] top-0 left-0 lg:relative text-[18px] lg:flex items-center justify-center"
          >
            <ArrowBackIos sx={{ fontSize: 16 }} />
            <p className="hidden lg:block w-max">Go Back</p>
          </button>
          <div id="steps">
            <Steps
              totalSteps={
                hasFishingSection ? DEFAULT_STEPS.length : STEPS.length
              }
              currentStep={currentStep}
            />
          </div>
          <button
            onClick={() => {
              if (currentStep > 0) {
                setIsExitModalOpen(true);
                return;
              }

              router.replace("/home/listings");
            }}
            disabled={isDisabled}
            className="text-[18px] m-[15px] absolute lg:relative top-0 right-0 flex items-center gap-[5px]"
          >
            <Close sx={{ fontSize: 18, marginTop: 0.25 }} />
            <p className="hidden lg:block w-max">Exit</p>
          </button>
        </nav>
        <div className="w-full mt-[31px] px-[7px] lg:px-0 lg:w-4/5 flex flex-col gap-[21px]">
          {determineCurrentStep()}
        </div>
      </div>
      <CustomAlert
        width={446}
        openModal={isExitModalOpen}
        setOpenModal={setIsExitModalOpen}
      >
        <div className="text-[#454545] flex flex-col items-center gap-[24px]">
          <h2 className="text-[20px] font-[700] leading-[31px] text-center">
            Do you want to save this listing for later or delete it?
          </h2>
          <Image
            src="/svgs/draft_image.svg"
            width={179}
            height={116}
            alt="A fish being fished"
          />
          <div className="flex gap-[10px]">
            <Button
              text="Exit and Delete"
              isSecondary
              onClick={handleExitAndDelete}
            />
            <Button
              text={isUploading ? "Saving..." : "Save Draft"}
              onClick={handleSaveDraft}
              disabled={isUploading}
            />
          </div>
        </div>
      </CustomAlert>
    </>
  );
};

export default NewListingScreen;
