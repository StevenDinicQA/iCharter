"use client";

import { FormEvent, useEffect, useState } from "react";
import { ONBOARDING_STEP } from "./enums";
import { usePathname, useRouter } from "next/navigation";
import { StepStatus } from "@/components/onboarding/atoms/StepStatus";
import { CharterMedia } from "@/components/onboarding/organisms/CharterMedia/CharterMedia";
import { CharterProfile } from "@/components/onboarding/organisms/CharterProfile/CharterProfile";
import Link from "next/link";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { CharterProfileFormValues } from "@/components/onboarding/organisms/CharterProfile/types";
import { PHONE_REGEX } from "@/utils/constants";
import apiService from "@/services/apiService";
import { GROUPS } from "@/components/onboarding/organisms/CharterProfile/constants";
import s3Service from "@/services/s3_service";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { CustomFileType } from "@/components/onboarding/organisms/CharterMedia/types";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";
import { mixPannelService } from "@/services/mixpanel-service";

const OnboardingScreen = () => {
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<ONBOARDING_STEP>(
    ONBOARDING_STEP.PROFILE
  );
  const [finishedOnboarding, setFinishedOnboarding] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<ONBOARDING_STEP[]>([]);
  const [formData, setFormData] = useState<CharterProfileFormValues>({
    avatar: null,
    companyName: "",
    captainsNames: [""],
    phoneNumber: "",
    location: "",
    license: [],
    experience: "",
    nationality: "",
    groups: [],
    instagram: "",
    facebook: "",
    tikTok: "",
    yelp: "",
  });
  const [files, setFiles] = useState<CustomFileType[]>([]);
  const pathname = usePathname();
  useEffect(() => {
    if (files.length < 5) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, [files, currentStep]);

  const router = useRouter();
  const { user, refetchUser } = useAuthContext();

  const handleBackNavigation = () => {
    // If there isn’t any completed steps, the return button
    // must go back to the previous screen.
    if (completedSteps.length === 0) {
      router.back();
      return;
    }

    // If there is any completed steps, the return button
    // must go back to the previous completed step.
    setCurrentStep(completedSteps.slice(-1)[0]);
    setCompletedSteps([...completedSteps.slice(0, -1)]);
    setIsNextDisabled(false);
  };

  const handleNextNavigation = () => {
    setCompletedSteps([...completedSteps, currentStep]);

    if (currentStep === ONBOARDING_STEP.PROFILE) {
      setCurrentStep(ONBOARDING_STEP.MEDIA);
      setIsNextDisabled(true);
      return;
    }

    router.replace("/home/listings");
  };

  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, [currentStep]);

  useEffect(() => {
    formData.avatar &&
    formData.experience &&
    formData.captainsNames[0] &&
    formData.license?.length !== 0 &&
    formData.phoneNumber &&
    PHONE_REGEX.test(formData.phoneNumber)
      ? setIsNextDisabled(false)
      : setIsNextDisabled(true);
  }, [formData]);

  useEffect(() => {
    const handleWindowClose = () => {
      if (finishedOnboarding && pathname === "/home/onboarding") return;

      mixPannelService.trackEvent("Charter Onboarding Incomplete", {
        userType: "charter",
        email: user?.email,
      });
    };

    handleWindowClose();
  }, [finishedOnboarding, pathname, user]);

  /*
   * Functions
   */
  const onCharterProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);

    // Call the API to update the Charter profile with
    // the `formData` state
    if (user) {
      if (!formData.license) {
        toast.error(`A license must be provided!`);
        setIsUploading(false);
        return;
      }

      const licensePDFUrl = await s3Service.uploadFileToBucket(
        formData?.license[0]?.file
      );

      if (!licensePDFUrl) {
        toast.error(
          `There was a problem while uploading the license, try again later.`
        );
        setIsUploading(false);
        return;
      }

      let profilePictureUrl: string | null = null;

      if (formData.avatar) {
        profilePictureUrl = await s3Service.uploadFileToBucket(formData.avatar);
      }

      const payload = {
        userId: user.id,
        companyName: formData.companyName,
        captains: formData.captainsNames,
        phoneNumber: formData.phoneNumber,
        email: user.email,
        licensePDFUrl: licensePDFUrl,
        location: formData.location,
        createdAt: new Date().toISOString(),
        profilePictureUrl,
        yearsOfExperience: Number(formData.experience),
        nationality: formData.nationality,
        groups: {
          veteran: formData.groups.includes(GROUPS[0].key),
          military: formData.groups.includes(GROUPS[1].key),
          firstResponders: formData.groups.includes(GROUPS[2].key),
          minorityOwnedBusiness: formData.groups.includes(GROUPS[3].key),
        },
        instagram: formData.instagram,
        facebook: formData.facebook,
        tikTok: formData.tikTok,
        yelp: formData.yelp,
      };

      const {
        data: createCharterProfileResponse,
        error: createCharterProfileError,
      } = await apiService.post("charterProfiles", payload);

      if (
        createCharterProfileError &&
        createCharterProfileError !==
          "A charter profile already exists with this associated user"
      ) {
        toast.error(createCharterProfileError);
        setIsUploading(false);
        return;
      }
      mixPannelService.trackEvent("Charter onboarding completed", payload);
      setFinishedOnboarding(true);
      await refetchUser();
      setIsUploading(false);
      handleNextNavigation();
    }
  };

  const onCharterMediaSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || !user.charterProfile?.id) {
      toast.error(`Couldn’t find the user account. Try again later.`);
      return;
    }

    setIsUploading(true);

    // Upload the media to the bucket and fetch their
    // respective URL
    const bucketUrls = [];

    for (const file of files) {
      const bucketUrl = await s3Service.uploadFileToBucket(file.file);

      if (bucketUrl) {
        bucketUrls.push(bucketUrl);
      }
    }

    // Update the charter profile with the media URLs
    for (const bucketUrl of bucketUrls) {
      await apiService.post(
        `charterProfiles/${user.charterProfile?.id}/media`,
        {
          fileUrl: bucketUrl,
        }
      );
    }

    // If there’s a `onSubmit` callback, call it.
    setIsUploading(false);
    handleNextNavigation();
  };

  return (
    <>
      {isUploading && <ScreenLoading />}
      <div className="px-[7px] py-[52px] lg:px-[90px] flex justify-start items-start gap-[51px]">
        <div className="absolute m-[15px] top-0 left-0 lg:relative text-[18px] lg:flex items-center justify-center">
          <div className="w-[68px]"></div>
        </div>
        <main className="w-full flex flex-col items-center lg:items-start gap-[24px] relative">
          <div className="w-full flex justify-center lg:justify-between items-center">
            <section className="mt-[20px] mb-[15px] flex gap-[14px]">
              <StepStatus
                isActive={
                  completedSteps.includes(ONBOARDING_STEP.PROFILE) ||
                  currentStep === ONBOARDING_STEP.PROFILE
                }
              />
              <StepStatus
                isActive={
                  completedSteps.includes(ONBOARDING_STEP.MEDIA) ||
                  currentStep === ONBOARDING_STEP.MEDIA
                }
              />
            </section>
            {currentStep !== ONBOARDING_STEP.PROFILE && (
              <Link
                className="hidden lg:relative text-[18px] lg:flex items-center justify-center flex"
                href="/home/listings"
              >
                <p className="text-[#454545] text-[18px] w-max">Skip</p>
                <ArrowBackIos
                  sx={{ fontSize: 16, transform: "rotate(180deg)" }}
                />
              </Link>
            )}
          </div>
          {currentStep === ONBOARDING_STEP.PROFILE && (
            <form
              onSubmit={onCharterProfileSubmit}
              className="w-full py-[26px] px-[13px] lg:px-[52px] bg-white rounded-[14px] flex flex-col gap-[30px]"
            >
              <h2 className="text-[28px] font-[500]">Charter Profile</h2>
              <CharterProfile
                formData={formData}
                setFormData={setFormData}
                fromOnboarding={true}
              />
              <div className="w-full flex justify-between">
                <button
                  className="absolute m-[15px] top-[8px] left-0 lg:relative text-[18px] lg:flex items-center justify-center"
                  onClick={handleBackNavigation}
                >
                  <ArrowBackIos sx={{ fontSize: 16 }} />
                  <p className="hidden lg:block w-max pt-[1px]">Go Back</p>
                </button>
                <button
                  type="submit"
                  disabled={isNextDisabled}
                  className={`${
                    isNextDisabled || isUploading
                      ? "text-[#BDBDBD]"
                      : "text-white"
                  } text-[16px] w-[138px] px-[24px] py-[14px] ${
                    isNextDisabled || isUploading
                      ? "bg-[#E2E2E2]"
                      : "bg-blue-hover"
                  } rounded-[12px] leading-[12px] self-center lg:self-end`}
                >
                  Next
                </button>
              </div>
            </form>
          )}
          {currentStep === ONBOARDING_STEP.MEDIA && (
            <form
              onSubmit={onCharterMediaSubmit}
              className="w-full py-[26px] px-[13px] lg:px-[52px] bg-white rounded-[14px] flex flex-col gap-[30px]"
            >
              <h2 className="text-[28px] font-[500]">Charter Profile</h2>
              <CharterMedia
                isUploading={isUploading}
                files={files}
                setFiles={setFiles}
              />
              <div className="w-full flex justify-between">
                <button
                  className="absolute m-[15px] top-[8px] left-0 lg:relative text-[18px] lg:flex items-center justify-center"
                  onClick={handleBackNavigation}
                >
                  <ArrowBackIos sx={{ fontSize: 16 }} />
                  <p className="hidden lg:block w-max pt-[1px]">Go Back</p>
                </button>
                <button
                  type="submit"
                  disabled={isNextDisabled || isUploading}
                  className={`${
                    isNextDisabled || isUploading
                      ? "text-[#BDBDBD]"
                      : "text-white"
                  } text-[16px] w-[138px] px-[24px] py-[14px] ${
                    isNextDisabled || isUploading
                      ? "bg-[#E2E2E2]"
                      : "bg-blue-hover"
                  } rounded-[12px] leading-[12px] self-center lg:self-end`}
                >
                  Next
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </>
  );
};

export default OnboardingScreen;
