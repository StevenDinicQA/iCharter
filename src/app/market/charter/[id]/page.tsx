"use client";

import { RightArrowIcon } from "@/components/shared/general/atoms/icons/RightArrowIcon";
import { CharterDetailsScreenProps } from "./types";
import { WidthContainer } from "@/components/shared/general/atoms/WidthContainer";
import { CaptainOverview } from "@/components/market/atoms/CaptainOverview";
import { MarketListing } from "@/components/market/molecules/MarketListing";
import { useMediaQuery } from "@mui/material";
import { ListingReview } from "@/components/market/atoms/ListingReview";
import { useEffect, useState } from "react";
import apiService from "@/services/apiService";
import { CharterProfile, Listing, Groups } from "@/types/listings/listing";
import { listingFactory } from "@/utils/factories/listingFactory";
import { useRouter } from "next/navigation";
import { charterProfileFactory } from "@/utils/factories/charterProfileFactory";
import { CharterOverview } from "@/components/market/molecules/CharterOverview";
import { CharterProfileHeader } from "@/components/market/molecules/CharterProfileHeader";
import { CaptainIcon } from "@/components/shared/general/atoms/icons/CaptainIcon";
import { GROUPS } from "@/components/onboarding/organisms/CharterProfile/constants";
import { Review } from "@/types/reviews/review";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";

export default function ChartersDetailScreen({
  params,
}: CharterDetailsScreenProps) {
  const [charterProfileData, setCharterProfileData] = useState<
    Required<CharterProfile> | undefined | null
  >(undefined);
  const [charterProfileReviews, setCharterProfileReviews] = useState<
    Required<Review[]> | undefined | null
  >(undefined);
  const [reviewsCount, setReviewsCount] = useState<number | undefined | null>(
    undefined
  );
  const [showMore, setShowMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const router = useRouter();

  async function getCharterProfile() {

    setLoading(true);

    const { data, error: charterProfileError } = await apiService.get(
      `charterProfiles/${params.id}?showExperiences=true&showTrips=true`
    );

    if (charterProfileError) {
      setCharterProfileData(null);
      setLoading(false);
      return;
    }
    setCharterProfileData(
      charterProfileFactory(data) as Required<CharterProfile>
    );

    setLoading(false);
  }

  async function getCharterReviews() {
    const path = `review/charter/${params.id}${
      showMore ? "?showMore=true" : ""
    }`;
    const { data, error: charterReviewsError } = await apiService.get(path);

    if (charterReviewsError) {
      setCharterProfileReviews(null);
      setReviewsCount(null);
      return;
    }
    setCharterProfileReviews(data.reviews);
    setReviewsCount(data.totalCount);
  }

  function groupLabels(groups: Groups): string[] {
    const labels: string[] = [];

    if (groups) {
      for (const group of GROUPS) {
        if (groups[group.key]) {
          labels.push(group.label);
        }
      }
    }

    return labels;
  }

  useEffect(() => {
    getCharterProfile();
  }, []);

  useEffect(() => {
    getCharterReviews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charterProfileData, showMore]);

  return (
    <div className="w-full text-[#454545] flex justify-center">
      {loading &&  <ScreenLoading />}
      {charterProfileData && (
        <WidthContainer className="my-0 xl:my-[45px] p-8 flex flex-col gap-[25px] relative">
          <button
            className="flex text-[#454545] text-[18px] font-[500] items-center gap-[5px] absolute top-0 left-0 m-[15px] xl:m-0 xl:relative"
            onClick={() => {
              router.back();
            }}
          >
            <div className="w-[27px] h-[27px] grid place-items-center rounded-full xl:w-min xl:h-auto transform rotate-[180deg] bg-white xl:bg-transparent z-10">
              <RightArrowIcon size={12} />
            </div>
            <span className="hidden xl:inline">Go Back</span>
          </button>
          <div className="w-full flex flex-col">
            <h3 className="text-[18px] xl:text-[28px] font-[700] mb-4 mt-6">
              {charterProfileData.companyName}
            </h3>
            <CharterProfileHeader
              isResponsive={isResponsive}
              profilePictureUrl={charterProfileData.profilePictureUrl}
              rating={charterProfileData.rating}
              tripsCount={charterProfileData.trips}
              listingsCount={charterProfileData.listingsPublished}
            />
          </div>
          <div className="w-full flex gap-[25px]">
            <div className="w-full flex flex-col flex-[3] gap-[25px]">
              <div>
                <CharterOverview media={charterProfileData.media} />
              </div>
              <div className="w-full xl:hidden bg-slate-200/50 rounded-xl grid place-items-center">
                <CaptainOverview
                  charter={true}
                  location={charterProfileData.location}
                  phone={charterProfileData.phoneNumber}
                  email={charterProfileData.email}
                  license={charterProfileData.licensePDFUrl}
                  experience={charterProfileData.yearsOfExperience}
                  companyName={charterProfileData.companyName}
                  captainProfilePictureURL={
                    charterProfileData.profilePictureUrl
                  }
                  groups={groupLabels(charterProfileData.groups)}
                  paymentMethods={
                    charterProfileData.pricingModel?.paymentMethod || ["-"]
                  }
                  firstResponderDiscount={"0"}
                  veteranDiscount={"0"}
                  militaryDiscount={"0"}
                  instagram={charterProfileData.instagram}
                  facebook={charterProfileData.facebook}
                  tikTok={charterProfileData.tikTok}
                  yelp={charterProfileData.yelp}
                />
                {charterProfileData.captains.map((captain, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center text-[#454545] text-[20px] font-medium w-full p-[10px] bg-[#FFF] rounded-[12px] h-[75px] mt-[18px] gap-[10px]"
                  >
                    <CaptainIcon size={30} />
                    {captain}
                  </div>
                ))}
              </div>
              {charterProfileData?.listings?.length > 0 ? (
                <div>
                  <h3 className="text-[18px] xl:text-[28px] font-[700] mb-[20px]">
                    Experiences from {charterProfileData.companyName}
                  </h3>
                  <div className="flex flex-col gap-[12px]">
                    {charterProfileData.listings.map((listing, index) => (
                      <MarketListing
                        key={index}
                        listingId={listing.id}
                        listingName={listing.experienceName}
                        companyName={charterProfileData.companyName}
                        rating={charterProfileData.rating}
                        totalRatings={charterProfileData.totalRatings}
                        location={listing?.meetingPoint.city ? `${listing?.meetingPoint.city}, ${listing?.meetingPoint.state}` : listing.meetingPoint.streetAddresss}
                        duration={listing.boat.duration}
                        price={Number(listing.pricingModel.pricePerTrip)}
                        isResponsive={isResponsive}
                        media={listing.media.map((item) => item.fileUrl)}
                        charterId={charterProfileData?.id}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {Boolean(charterProfileReviews) && (
                <div id="listing_ratings_section">
                  <h3 className="text-[18px] xl:text-[28px] font-[700] mb-[25px]">
                    See what other people think
                  </h3>
                  <div className="flex flex-col gap-[20px]">
                    {charterProfileReviews?.map((review: any) => (
                      <ListingReview
                        key={review.id}
                        rating={review.rating}
                        date={review.createdAt}
                        comment={review.comments}
                        customersName={
                          review.user.name + " " + review.user.lastName
                        }
                        experienceName={review.listing.experienceName}
                      />
                    ))}
                  </div>
                  <button
                    className="mx-auto block xl:inline px-[24px] py-[14px] rounded-[12px] border border-[#454545] mt-[12px] text-[#454545] text-[14px] font-medium"
                    onClick={() => {
                      setShowMore((prevShowMore) => !prevShowMore);
                    }}
                  >
                    {showMore
                      ? "Show Less"
                      : `Show all ${reviewsCount} reviews`}
                  </button>
                </div>
              )}
            </div>
            <div className="hidden xl:block flex-1 mt-10">
              <CaptainOverview
                charter={true}
                location={charterProfileData.location}
                phone={charterProfileData.phoneNumber}
                email={charterProfileData.email}
                // license={charterProfileData.licensePDFUrl}
                experience={charterProfileData.yearsOfExperience}
                companyName={charterProfileData.companyName}
                captainProfilePictureURL={charterProfileData.profilePictureUrl}
                groups={groupLabels(charterProfileData.groups)}
                paymentMethods={
                  charterProfileData.pricingModel?.paymentMethod || ["-"]
                }
                firstResponderDiscount={"0"}
                veteranDiscount={"0"}
                militaryDiscount={"0"}
                instagram={charterProfileData.instagram}
                facebook={charterProfileData.facebook}
                tikTok={charterProfileData.tikTok}
                yelp={charterProfileData.yelp}
              />
              {charterProfileData.captains.map((captain, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center text-[#454545] text-[20px] font-medium w-full p-[10px] bg-[#FFF] rounded-[12px] h-[75px] mt-[18px] gap-[10px]"
                >
                  <CaptainIcon size={30} />
                  {captain}
                </div>
              ))}
            </div>
          </div>
        </WidthContainer>
      )}
    </div>
  );
}
