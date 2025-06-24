"use client";
import { useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomAlert from "@/components/shared/general/CustomAlert";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OnboardingStatus } from "@/components/shared/general/molecules/OnboardingStatus";
import { useAuthContext } from "@/context/AuthContext";
import { CheckIcon } from "@/components/shared/general/atoms/icons/CheckIcon";
import apiService from "@/services/apiService";
import { toast } from "react-hot-toast";
import { WidthContainer } from "@/components/shared/general/atoms/WidthContainer";
import ListingsEmptyView from "@/components/listings/EmptyView";
import Image from "next/image";
import { ListingFormData } from "@/types/listings/listing";
import { ListingsTableView } from "@/components/listings/organisms/ListingsTableView";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";

const ListingsScreen = () => {
  const [listings, setListings] = useState<ListingFormData[]>([]);

  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [fetchedUserData, setFetchedUserData] = useState<boolean>(false);
  const [onboardingModal, setOnboardingModal] = useState<boolean>(false);
  const [listingModal, setListingModal] = useState<boolean>(false);
  const [firstListingModal, setFirstListingModal] = useState<boolean>(false);
  const [isCreateListingDisabled, setIsCreateListingDisabled] =
    useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthContext();

  const firstListingParam = searchParams.get("complete");
  const isResponsive = useMediaQuery("(max-width: 1024px)");

  /**
   * Fetchs the current logged-in charter listings and
   * updates the `listings` state
   * @returns
   */

  const handleDeleteListing = (id: string | undefined) => {
    setListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== id)
    );
  };

  const handlePublishListing = (
    id: string | undefined,
    isPublished: boolean
  ) => {
    const updatedListings = listings.map((listing) =>
      listing.id === id ? { ...listing, isPublished } : listing
    );
    setListings(updatedListings);
  };

  const handleDuplicateListing = async (data: ListingFormData) => {
    //setListings(prevListings => [...prevListings, data]);
    await getListings();
  };

  const getListings = async () => {
    // We shouldn’t do anything if for some reason we don’t have
    // the user data, or the user doesn’t have a `charterProfile` yet.
    if (!user || !user?.charterProfile) {
      setIsPageLoading(false);
      setFetchedUserData(true);
      return;
    }

    // Try to fetch the user’s listings and handle both the expected and
    // error scenarios. We should let the user know with a toast if there
    // was any error.
    const { data, error } = await apiService.get(
      `listings?charterProfileId=${user.charterProfile.id}`
    );

    if (error) {
      toast.error(error);
      return;
    }

    const doesntHaveListings = data.length === 0;

    if (doesntHaveListings) {
      setListingModal(true);
    }

    // Regardless of the scenario, we should update the `listings` state
    // and also turn on the `fetchedUserData` flag (this helps us to know
    // that if `listings` is already updated with the user’s data)
    setListings(data || []);
    setFetchedUserData(true);
    setIsPageLoading(false);
  };

  useEffect(() => {
    if (!user?.charterProfile) {
      setIsCreateListingDisabled(true);

      if (user) {
        setOnboardingModal(true);
        setIsPageLoading(false);
        setFetchedUserData(true);
      }

      return;
    }

    setIsCreateListingDisabled(false);
    getListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    // This handles the logic of wether to show the first-listing modal
    // or not.
    if (!firstListingParam || !fetchedUserData || listings.length > 0) return;

    setFirstListingModal(Boolean(firstListingParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstListingParam, fetchedUserData]);

  /**
   * Onboarding status indicator pop-up, to show in which step of the onboarding
   * the current user is.
   */
  const OnboardingStatusIndictaor = (
    <div className="w-full absolute bottom-0 left-0 flex justify-center">
      <WidthContainer className="relative">
        {fetchedUserData && listings.length === 0 && (
          <OnboardingStatus isSecondStep={Boolean(user?.charterProfile)} />
        )}
      </WidthContainer>
    </div>
  );

  /**
   * Modal to be shown when it’s a fresh user without a charterProfile.
   */
  const OnboardingModal = (
    <CustomAlert
      width={530}
      openModal={onboardingModal}
      setOpenModal={setOnboardingModal}
      removeCloseIcon={true}
    >
      <div className="text-[#454545] mb-[25px] text-center flex flex-col items-center">
        <h2 className="text-[20px] font-[700] mb-[8px]">
          Welcome onboard Captain {user?.name}!
        </h2>
        <p className="text-[14px] font-[500] mb-[9px]">
          These are some of the benefits you can find on iCharter.
        </p>
        <Image
          src="/svgs/onboarding.svg"
          width={isResponsive ? 296 : 378}
          height={isResponsive ? 175 : 224}
          alt="A captain driving a ship"
        />
        <ul className="text-[13px] lg:text-[16px] text-left mt-[20px] flex flex-col gap-[16px]">
          <li className="flex items-center gap-[8px]">
            <div className="min-w-[31px] min-h-[31px] rounded-full border border-[#2D3AAF] bg-[#E0E2F0] flex items-center justify-center">
              <CheckIcon stroke="#2D3AAF" size={16} />
            </div>
            <p>Create listings for all kind of experiences</p>
          </li>
          <li className="flex items-center gap-[8px]">
            <div className="min-w-[31px] min-h-[31px] rounded-full border border-[#2D3AAF] bg-[#E0E2F0] flex items-center justify-center">
              <CheckIcon stroke="#2D3AAF" size={16} />
            </div>
            <p>
              Take part of <b>iCharterBid</b> and make the most of your time
            </p>
          </li>
          <li className="flex items-center gap-[8px]">
            <div className="min-w-[31px] min-h-[31px] rounded-full border border-[#2D3AAF] bg-[#E0E2F0] flex items-center justify-center">
              <CheckIcon stroke="#2D3AAF" size={16} />
            </div>
            <p>Manage all your bookings and earnings from one place</p>
          </li>
        </ul>
        <div className="mt-10">
        {
          <Button
            text="Get Started"
            onClick={() => {
              router.push("/home/onboarding");
            }}
          />
        }
        </div>
      </div>
    </CustomAlert>
  );

  /**
   * Modal to be shown when the user already has a `charterProfile` but
   * doesn’t have any listings yet.
   */
  const HalfOnboardingModal = (
    <CustomAlert openModal={listingModal} setOpenModal={setListingModal}>
      <div className="text-[#454545] text-center flex flex-col items-center">
        <h2 className="text-[20px] font-[700] mb-[8px]">
          Your profile is all set up!
        </h2>
        <p className="text-[14px] font-[500] mb-[9px]">
          You have completed your charter profile
        </p>
        <Image
          src="/svgs/onboarding.svg"
          width={isResponsive ? 296 : 378}
          height={isResponsive ? 175 : 224}
          alt="A captain driving a ship"
        />
        <p className="text-[16px] leading-[20px] mt-[20px] mb-[20px]">
          Now create a listing to start selling your experiences on the
          marketplace!
        </p>
        {
          <Button
            text="+ Create Listing"
            onClick={() => {
              router.push("/home/listings/new");
            }}
            disabled={isCreateListingDisabled}
          />
        }
      </div>
    </CustomAlert>
  );

  /**
   * Modal to be shown when the user already has a `charterProfile` and
   * just published a listing.
   */
  const CompleteOnboardingModal = (
    <CustomAlert
      width={438}
      openModal={firstListingModal}
      setOpenModal={setFirstListingModal}
    >
      <div className="text-[#454545] text-center flex flex-col items-center">
        <Image
          src="/svgs/first_listing.svg"
          width={149}
          height={110}
          alt="A captain driving a ship"
        />
        <h2 className="text-[20px] font-[700] mt-[24px] mb-[12px]">
          Congrats you completed your listing!
        </h2>
        <p className="text-[16px] font-[400] leading-[20px] lg:w-[80%] mb-[36px]">
          Your listing is already published on the marketplace.
        </p>
      </div>
    </CustomAlert>
  );

  return (
    <main className="text-[#454545] pt-[20px] lg:pt-[75px] pl-[16px] lg:pl-[85px] pr-[18px] lg:pr-[90px] flex flex-col gap-[20px] lg:gap-[37px]">
      {isPageLoading && <ScreenLoading />}
      {!isPageLoading && (
        <>
          <section className="flex justify-between items-center">
            <h2 className="text-[18px] lg:text-[28px] font-[700]">Listings</h2>
            <Button
              text={isResponsive ? <AddIcon /> : "+ Create Listing"}
              onClick={() => {
                router.push("/home/listings/new");
              }}
              disabled={isCreateListingDisabled}
              iconButton={isResponsive}
            />
          </section>
          <section className="px-4  md:px-10 py-4  bg-white rounded-[12px] flex flex-col items-center justify-center gap-[12px]">
            {listings.length === 0 ? (
              <ListingsEmptyView isDisabled={isCreateListingDisabled} />
            ) : (
              <ListingsTableView
                rows={listings}
                onDelete={handleDeleteListing}
                onPublish={handlePublishListing}
                onDuplicate={handleDuplicateListing}
              />
            )}
          </section>
        </>
      )}
      {/* Modals and Pop-ups */}
      {OnboardingModal}
      {HalfOnboardingModal}
      {CompleteOnboardingModal}
      {!listingModal && !onboardingModal && OnboardingStatusIndictaor}
    </main>
  );
};

export default ListingsScreen;
