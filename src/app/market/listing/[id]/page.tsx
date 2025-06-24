"use client";

import { RightArrowIcon } from "@/components/shared/general/atoms/icons/RightArrowIcon";
import {
  AvailableBooking,
  ListingDetailsScreenProps,
  MoreExperiences,
} from "./types";
import { WidthContainer } from "@/components/shared/general/atoms/WidthContainer";
import { ListingOverview } from "@/components/market/molecules/ListingOverview";
import { CaptainOverview } from "@/components/market/atoms/CaptainOverview";
import { MarketListing } from "@/components/market/molecules/MarketListing";
import { useMediaQuery } from "@mui/material";
import { ListingDetails } from "@/components/market/molecules/ListingDetails";
import { useEffect, useState } from "react";
import apiService from "@/services/apiService";
import {
  CharterProfile,
  DayOfWeek,
  Groups,
  Listing,
} from "@/types/listings/listing";
import { listingFactory } from "@/utils/factories/listingFactory";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { usePathname, useRouter } from "next/navigation";
import { GROUPS } from "@/components/onboarding/organisms/CharterProfile/constants";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import DateMenu, {
  CustomRange,
  DEFAULT_DATES,
} from "@/components/home/molecules/SearchBar/DateMenu";

import Cookies from "js-cookie";
import moment, { Moment } from "moment-timezone";
import { CaptainIcon } from "@/components/shared/general/atoms/icons/CaptainIcon";
import { HorizontalDatePicker } from "@/components/home/molecules/SearchBar/HorizontalDatePicker";
import {
  CALENDAR_DEFAULT_FROM_DATE,
  CALENDAR_DEFAULT_TO_DATE,
  DEFAULT_GUEST_NUMBER,
} from "./constants";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";
import ListingService from "./ListingService";
import { Review } from "@/types/reviews/review";
import { ListingReview } from "@/components/market/atoms/ListingReview";

export default function ListingDetailsScreen({
  params,
}: ListingDetailsScreenProps) {
  const [listingData, setListingData] = useState<
    Required<Listing> | undefined | null
  >(undefined);
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
  const [showDate, setShowDate] = useState<boolean>(false);
  const [dates, setDates] = useState<CustomRange[]>([DEFAULT_DATES]);
  const [moreListings, setMoreListings] = useState<MoreExperiences>({
    quantity: null,
    experiences: [],
  });
  const [isBookButtonDisabled, setIsBookButtonDisabled] =
    useState<boolean>(true);
  const [_showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [_availableSeats, setAvailableSeats] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableBookings, setAvailableBookings] = useState<
    AvailableBooking[] | null
  >([]);
  const [fromDate, _setFromDate] = useState<Moment>(CALENDAR_DEFAULT_FROM_DATE);
  const [toDate, setToDate] = useState<Moment>(CALENDAR_DEFAULT_TO_DATE);

  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext();

  const isMarketPage = pathname === "/market";

  const dateFrom = Cookies.get("dateFrom");
  const dateTo = Cookies.get("dateTo");
  const guestNumber: number =
    Number(Cookies.get("guest_number")) > 0
      ? Number(Cookies.get("guest_number"))
      : DEFAULT_GUEST_NUMBER;

  useEffect(() => {
    getListing();
    // getAvailableBookings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListingsFromCharter();
  }, [listingData, charterProfileData]);

  useEffect(() => {
    getCharterReviews();
  }, [listingData, charterProfileData, showMore]);

  useEffect(() => {
    setSelectedDatesFromCookies();
  }, []);

  useEffect(() => {
    if (dates && listingData && availableBookings) {
      checkIsBookingEnabled();
    }
  }, [dates, listingData]);

  async function getListing() {
    setIsLoading(true);
    const { listingData, error } = await ListingService.getListing(params.id);

    if (error) {
      setListingData(null);
      setIsLoading(false);
      return;
    }

    setListingData(listingData);
    setIsLoading(false);

    if (listingData) {
      getCharterProfile(listingData.charterProfile.id);
    }
  }

  async function getCharterProfile(charterId: string) {
    setIsLoading(true);
    const { charterProfileData, error } =
      await ListingService.getCharterProfile(charterId);

    if (error) {
      setCharterProfileData(null);
      setIsLoading(false);
      return;
    }

    setCharterProfileData(charterProfileData);
    setIsLoading(false);
  }

  async function getCharterReviews() {
    if (!charterProfileData?.id) {
      setCharterProfileReviews(null);
      setReviewsCount(null);
      return;
    }

    const path = `review/charter/${charterProfileData.id}${
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

  async function getAvailableBookings() {
    setIsLoading(true);
    const { availableBookings, error } =
      await ListingService.getAvailableBookings(
        params.id,
        fromDate.format("YYYY-MM-DDTHH:mm:ssZ"),
        toDate.format("YYYY-MM-DDTHH:mm:ssZ"),
        guestNumber
      );

    if (error) {
      toast.error(error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    if (availableBookings) {
      setAvailableBookings(availableBookings);
    }
  }

  const getListingsFromCharter = () => {
    if (!charterProfileData || !listingData) return;

    const moreListingsToShow = charterProfileData?.listings?.filter(
      (l) => l?.id != listingData?.id
    );

    setMoreListings({
      quantity: moreListingsToShow?.length,
      experiences: moreListingsToShow,
    });
  };

  async function getListingSeats(): Promise<number | undefined> {
    setIsLoading(true);

    try {
      const startDate = moment(dates[0].startDate);
      const isoWithTimeZone: string = moment(startDate)
        .tz("America/New_York", true)
        .format();

      const availableSeats = await ListingService.getListingSeats(
        params.id,
        isoWithTimeZone
      );

      if (listingData?.pricingModel.type === "private") {
        setAvailableSeats(listingData.boat.guestCapacity);
        return listingData.boat.guestCapacity;
      } else {
        setAvailableSeats(availableSeats);
        return availableSeats;
      }
    } catch (error) {
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  }

  const checkAvailableSeats = async () => {
    setIsLoading(true);

    const availableSeats: number | undefined = await getListingSeats();

    if (guestNumber > Number(availableSeats)) {
      setShowErrorAlert(true);
      throw new Error("Not enough seats");
    }
  };

  function groupLabels(groups: Groups): string[] {
    const labels: string[] = [];

    for (const group of GROUPS) {
      if (groups[group.key]) {
        labels.push(group.label);
      }
    }

    return labels;
  }

  const redirectUser = () => {
    if (user) {
      router.push("/market/checkout");
    } else {
      router.push(
        `/auth/sign-in?from=/market/checkout&listingId=${listingData?.id}`
      );
      toast.success("Please login before booking this listing");
    }
  };
  const handleBookButtonClick = async () => {
    try {
      setIsBookButtonDisabled(true);
      setIsLoading(true);

      if (!listingData?.id) return;
      await checkAvailableSeats();

      Cookies.set("checkout_listing_id", listingData?.id);
      Cookies.set(
        "checkout_start_date",
        moment(dates[0].startDate).format("dddd, MMMM D, YYYY")
      );
      redirectUser();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);

      setIsBookButtonDisabled(false);
    }
  };

  const isDateSelectionRange = (_dates: CustomRange[] | null = null) => {
    _dates = _dates || dates;

    return _dates[0].startDate.getTime() < _dates[0].endDate.getTime();
  };

  const needsHydration = (date: Moment): boolean => {
    return date.isAfter(toDate);
  };

  const hydrateCalendar = () => {
    setToDate(toDate.tz("America/New_York").add(1, "month"));
    getAvailableBookings();
  };

  const isDayDisabled = (date: Date): boolean => {
    if (needsHydration(moment(date))) {
      hydrateCalendar();
    }
    const dayOfWeek: DayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    })
      .format(date)
      .toLowerCase() as DayOfWeek;

    const dateTz = moment(date).tz("America/New_York", true);

    const isBookingDisabled: boolean = !availableBookings?.some((booking) => {
      return moment(booking.starts_at)
        .tz("America/New_York", true)
        .isSame(dateTz);
    });

    const isBoatDisabled: boolean = !listingData?.boat.availability[dayOfWeek];
    return isBoatDisabled || isBookingDisabled;
  };

  const setSelectedDatesFromCookies = () => {
    if (dateFrom) {
      setDates([
        {
          startDate: moment(dateFrom, "YYYY-MM-DD").startOf("day").toDate(),
          endDate: moment(dateTo || dateFrom, "YYYY-MM-DD")
            .startOf("day")
            .toDate(),
          key: "selection",
        },
      ]);
    }
  };

  const handleDateChange = (newDateRange: CustomRange[]) => {
    const getNewDate = (): Date => {
      const currentDate: Date = dates[0].startDate;
      const newDate: Date = moment(newDateRange[0].startDate).isSame(
        moment(currentDate)
      )
        ? newDateRange[0].endDate
        : newDateRange[0].startDate;
      return newDate;
    };
    if (isDateSelectionRange(newDateRange)) {
      const newDate: Date = getNewDate();
      newDateRange[0].startDate = newDate;
      newDateRange[0].endDate = newDate;
    }
    Cookies.set(
      "checkout_start_date",
      moment(newDateRange[0].startDate).format("dddd, MMMM D, YYYY")
    );
    setDates(newDateRange);
  };

  const checkIsBookingEnabled = () => {
    if (isDateSelectionRange() || isDayDisabled(dates[0].startDate)) {
      setIsBookButtonDisabled(true);
    } else {
      setIsBookButtonDisabled(false);
    }
  };

  function handleCalendar() {
    getAvailableBookings();

    setShowDate(true);
  }

  return (
    <div className="w-full text-[#454545] flex justify-center mb-[100px]">
      {isLoading ? <ScreenLoading /> : null}
      {listingData && availableBookings && (
        <div className="my-0 xl:my-[45px] flex flex-col items-center xl:gap-[25px] relative w-full">
          <div className="w-full xl:max-w-[calc(100vw-96px)]">
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
          </div>
          <div
            className={`w-full flex gap-[34px] ${
              !isMarketPage && "xl:max-w-[calc(100vw-96px)]"
            }`}
          >
            <div className="w-full flex flex-col flex-[3] gap-[25px]">
              <div>
                <ListingOverview
                  charterId={listingData.charterProfile.id}
                  name={listingData.experienceName}
                  companyName={listingData.charterProfile.companyName}
                  location={listingData.meetingPoint.streetAddresss}
                  description={listingData.description}
                  duration={listingData.boat.duration}
                  rating={listingData.charterProfile.rating}
                  totalRatings={listingData.charterProfile.totalRatings}
                  departureTime={new Date(
                    0,
                    0,
                    0,
                    listingData.boat.departureTime.hour,
                    listingData.boat.departureTime.minute
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                  media={listingData.media}
                />
              </div>
              <div className="w-[calc(100vw-[32px])] mx-4 xl:hidden bg-slate-200/50 rounded-xl grid place-items-center">
                <CaptainOverview
                  charter={false}
                  charterId={listingData.charterProfile.id}
                  experience={listingData.charterProfile.yearsOfExperience}
                  companyName={listingData.charterProfile.companyName}
                  captainName={listingData.captains[0]}
                  captainProfilePictureURL={
                    listingData.charterProfile.profilePictureUrl
                  }
                  groups={groupLabels(listingData.charterProfile.groups)}
                  paymentMethods={listingData.pricingModel.paymentMethod}
                  firstResponderDiscount={"0"}
                  veteranDiscount={"0"}
                  militaryDiscount={"0"}
                  instagram={listingData.charterProfile.instagram}
                  facebook={listingData.charterProfile.facebook}
                  tikTok={listingData.charterProfile.tikTok}
                  yelp={listingData.charterProfile.yelp}
                  experienceType={listingData?.pricingModel?.type}
                />
              </div>

              <ListingDetails
                targetedSpecies={listingData.fishingExperience.targetedSpecies}
                boatInformation={{
                  type: listingData.boat.boatType,
                  numberOfPeople: listingData.boat.guestCapacity,
                  description: listingData.boat.boatDescription!,
                }}
                fishingTechniques={
                  listingData.fishingExperience.fishingTechniques!
                }
                includedInPrice={listingData.fishingExperience.includedInPrice!}
                facilities={listingData.boat.facilities!}
                paymentAndCancellation={
                  listingData.pricingModel.cancelationPolicy
                }
              />

              {moreListings?.experiences?.length > 0 && (
                <div className="mx-4 xl:mx-0">
                  <h3 className="text-[18px] xl:text-[28px] font-[700] mb-[20px]">
                    {`Other experiences from ${listingData?.charterProfile?.companyName}`}
                  </h3>
                  <div className="flex flex-col gap-[12px]">
                    {moreListings?.experiences?.slice(0, 2).map((l) => {
                      return (
                        <MarketListing
                          listingId={l?.id}
                          listingName={l?.experienceName}
                          companyName={listingData?.charterProfile.companyName}
                          rating={listingData?.charterProfile?.rating}
                          totalRatings={
                            listingData?.charterProfile?.totalRatings
                          }
                          location={
                            listingData?.meetingPoint.city
                              ? `${listingData?.meetingPoint.city}, ${listingData?.meetingPoint.state}`
                              : listingData?.meetingPoint.streetAddresss
                          }
                          duration={l?.boat.duration}
                          price={Number(l?.pricingModel.pricePerTrip)}
                          isResponsive={isResponsive}
                          media={l?.media.map((item) => item.fileUrl)}
                          key={l?.id}
                          charterId={charterProfileData?.id}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              {Boolean(charterProfileReviews) && (
                <div id="listing_ratings_section" className="mx-4 xl:mx-0">
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
            <div className="hidden xl:block flex-1">
              <div className="flex justify-center items-center text-[#454545] text-[20px] font-medium w-full p-[10px] bg-[#FFF] rounded-[12px] h-[75px] mb-[18px] gap-[10px]">
                <CaptainIcon size={30} />
                {listingData.captains[0]}
              </div>
              <CaptainOverview
                charter={false}
                charterId={listingData.charterProfile.id}
                experience={listingData.charterProfile.yearsOfExperience}
                companyName={listingData.charterProfile.companyName}
                captainName={listingData.captains[0]}
                captainProfilePictureURL={
                  listingData.charterProfile.profilePictureUrl
                }
                groups={groupLabels(listingData.charterProfile.groups)}
                paymentMethods={listingData.pricingModel.paymentMethod}
                firstResponderDiscount={
                  listingData.pricingModel.specialDiscounts?.firstResponders
                }
                veteranDiscount={
                  listingData.pricingModel.specialDiscounts?.veteran
                }
                militaryDiscount={
                  listingData.pricingModel.specialDiscounts?.military
                }
                instagram={listingData.charterProfile.instagram}
                facebook={listingData.charterProfile.facebook}
                tikTok={listingData.charterProfile.tikTok}
                yelp={listingData.charterProfile.yelp}
                experienceType={listingData?.pricingModel?.type}
              />
              <div className="mt-[25px] hidden xl:flex flex-col gap-[20px]">
                {showDate ? (
                  <>
                    <DateMenu
                      position="inherit"
                      isMarketPlace={false}
                      onDateChange={handleDateChange}
                      dates={dates}
                      isDayDisabled={isDayDisabled}
                      minDate={new Date()}
                      showPreview={false}
                      showDate={showDate}
                      setShowDate={setShowDate}
                    />
                    <Button
                      test-id="btn-book-listing"
                      className="w-full"
                      text={`Book for $${listingData.pricingModel.pricePerTrip}`}
                      onClick={handleBookButtonClick}
                      disabled={isBookButtonDisabled}
                    />
                  </>
                ) : (
                  <Button
                    className="w-full"
                    text="Check availability"
                    onClick={handleCalendar}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="xl:hidden h-[160px]"></div>
          <div className="w-full bg-white p-[20px] xl:hidden gap-[20px] border fixed bottom-0 left-0 z-[999]">
            <div className="flex flex-col">
              <div
                className={`${
                  showDate ? "flex" : "hidden"
                } justify-between items-center`}
              >
                <span className="text-[16px] font-[700]">Select Date</span>
                <button onClick={() => setShowDate(false)}>Close</button>
              </div>
              <div className="flex justify-center items-center text-center">
                {showDate ? (
                  <div className="flex flex-col gap-4">
                    <DateMenu
                      position="inherit"
                      isMarketPlace={false}
                      onMouseLeave={() => setShowDate(false)}
                      onDateChange={handleDateChange}
                      dates={dates}
                      isDayDisabled={isDayDisabled}
                      minDate={new Date()}
                      showPreview={false}
                      showDate={showDate}
                      setShowDate={setShowDate}
                    />
                    <Button
                      test-id="btn-book-listing"
                      className="w-full"
                      text={`Book for $${listingData.pricingModel.pricePerTrip}`}
                      onClick={handleBookButtonClick}
                      disabled={isBookButtonDisabled}
                    />
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    text="Check availability"
                    onClick={handleCalendar}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
