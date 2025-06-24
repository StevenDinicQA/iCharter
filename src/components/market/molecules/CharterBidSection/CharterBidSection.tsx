import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { Listing } from "@/types/listings/listing";
import { CheckIcon } from "@/components/shared/general/atoms/icons/CheckIcon";
import { useMediaQuery } from "@mui/material";
import apiService from "@/services/apiService";
import { useEffect, useState } from "react";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";
import { useAuthContext } from "@/context/AuthContext";
import { Modal } from "@/components/shared/general/molecules/Modal";
import Image from "next/image";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import moment from "moment";

let isMounted: boolean = false;
import Tooltip from "@/components/shared/general/Tooltip";
import { useMarketPlaceContext } from "@/context/MarketPlaceContext";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {
  onRefresh: (listings: Listing[]) => void;
  onCancel: () => void;
  isMapView?: boolean;
}

export const CharterBidSection = ({
  onRefresh,
  onCancel,
  isMapView
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const listingsCountParam: number = Number(searchParams.get("listings_count"));
  const amountParam: number = Number(searchParams.get("bid_amount"));

  const [amount, setAmount] = useState<number>(amountParam);
  const [listingsCount, setListingsCount] =
    useState<number>(listingsCountParam);
  const [successfulBidsCount, setSuccessfulBidsCount] = useState<number>(0);
  const [charterProfilesCount, setCharterProfilesCount] = useState<number>(0);
  const [listings, setListings] = useState<any>([]);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);
  const [toggleiCharterBid, setToggleiCharterBid] = useState<boolean>(false);

  const isTablet = useMediaQuery("(min-width: 768px)");

  const { user } = useAuthContext();
  const {
    selectedDateRange,
    selectedLocation,
    selectedExperience,
    guestsCounter,
    marketPlaceListing,
  } = useMarketPlaceContext();

  async function getBulkListings(amount: number) {
    setIsPageLoading(true);

    const dateRange = selectedDateRange;
    const dateRangeParts = dateRange?.split(" - ");
    let dateFrom = "";
    let dateTo = "";

    if (dateRangeParts && dateRangeParts.length === 2) {
      dateFrom = moment(dateRangeParts[0], "DD MMM").format("YYYY-MM-DD");
      dateTo = moment(dateRangeParts[1], "DD MMM").format("YYYY-MM-DD");
    } else if (
      dateRangeParts &&
      dateRangeParts.length === 1 &&
      dateRangeParts[0].trim() !== ""
    ) {
      dateFrom = moment(dateRangeParts[0], "DD MMM").format("YYYY-MM-DD");
    }

    const params = {
      location: selectedLocation,
      ...(dateFrom !== "" && { dateFrom }),
      ...(dateTo !== "" && { dateTo }),
      experienceType: selectedExperience ? [selectedExperience] : [],
      guests: guestsCounter,
      bidAmount: amount,
    };

    const { data, error: getBulkListingsError } = await apiService.get(
      "bid/bulk",
      params
    );
    if (getBulkListingsError) {
      return;
    }

    if (data.listingsCount > 0) {
      setListingsCount(parseInt(data.listingsCount));
      setListings(data.listingsForBulkBid);

      onRefresh(data.listingsForBulkBid);
    } else {
      toast.error("Sorry, there are no bids available");
      onRefresh(marketPlaceListing);
    }

    setIsPageLoading(false);
  }

  async function postBulkListings() {
    if (user && listings.length > 0) {
      setIsPageLoading(true);
      const { data, error: postBulkListingsError } = await apiService.post(
        `bid/bulk`,
        {
          userId: user?.id,
          bids: listings,
        }
      );

      setIsPageLoading(false);

      if (postBulkListingsError) {
        setIsErrorModalVisible(true);
        return;
      }

      if (data.successfulBidsCount) {
        setSuccessfulBidsCount(data.successfulBidsCount);
      }

      if (data.charterProfilesCount) {
        setCharterProfilesCount(data.charterProfilesCount);
      }

      setIsModalVisible(true);
    }
  }

  const onAmountChange = (value: string) => {
    try {
      if (listingsCount > 0) {
        setListingsCount(0);
      }
      var val = parseInt(value.toString());
      setAmount(val);
    } catch (err) {}
  };

  const onModalClose = () => {
    setIsModalVisible(false);
    setIsErrorModalVisible(false);
    setListingsCount(0);
    setAmount(0);
    setListings([]);
  };

  const onSubmit = () => {
    if (!user) {
      toast.success("Please login before continuing");
      router.replace(`/auth/sign-in?from=/market&bid_amount=${amount}`);
      return;
    }

    if (amount && !listingsCount) {
      getBulkListings(amount);
    }

    if (amount && listingsCount) {
      postBulkListings();
    }
  };

  const onCancelBid = () => {
    setListingsCount(0);
    onCancel();
  };

  useEffect(() => {
    if (!isMounted && user && amount && listingsCount) {
      getBulkListings(amount);
      isMounted = true;
    }
  }, [user, listings.length, amount, listingsCount]);

  const sendBid = () => {
    if (amount && listingsCount && !user) {
      router.replace(
        `/auth/sign-in?from=/market&bid_amount=${amount}&listings_count=${listingsCount}`
      );
    } else {
      onSubmit();
    }
  };

  return (
    <section className={`flex justify-center my-3 md:h-[104px] rounded-2xl text-base font-bold text-white mx-4 lg:mx-0 ${toggleiCharterBid ? "bg-gradient-to-l from-[#05060F] to-[#272F75]" : "bg-[#2E3BAF]"} ${isTablet && "bg-gradient-to-l from-[#05060F] to-[#272F75]"}`}>
      {!toggleiCharterBid && !isTablet ? (
        <button
          onClick={() => setToggleiCharterBid(true)}
          className="w-full h-[52px] p-4"
        >
          Place an iCharterBid™
        </button>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
          <div className="flex flex-col gap-1 p-4">
            <div className="flex flex-row gap-2">
              <h3 className="text-base lg:text-xl font-medium leading-[18px]">
                Do you want to place an iCharterBid?
              </h3>
              {/* <Tooltip
                wrapWords
                tooltipStyles="absolute top-6 -left-3 w-[200px] lg:w-[300px]"
                text="iCharterBid™ is an innovative way to book last minute charters in the next three days! After creating a profile, you can submit up to three iCharterBids™. Just bid what you can pay and you will be matched with Charters who might accept. This helps Charters fill their boats at the last minute and get you on the water!"
              >
                <p className="text-xs text-white cursor-pointer whitespace-nowrap">
                  Learn more
                </p>
              </Tooltip> */}
            </div>
            {user ? (
              <p className="text-[13px] max-w-[506px] font-normal leading-[18px]">
                Enter the price you can pay. Your search will update with the
                Captains accepting bids. Submit the Bid!
              </p>
            ) : (
              <p className="text-[13px] max-w-[506px] font-normal leading-[18px]">
                Simply{" "}
                <Link href="/auth/sign-up" test-id="nav_list-waitlist">
                  <span className="underline">signup</span>
                </Link>
                , enter the price you can pay. Your search will update with the
                Captains accepting bids. Submit the Bid!
              </p>
            )}
          </div>
          <div className="flex md:items-center md:w-full md:max-w-96 mx-4 mb-4 md:mb-0 gap-2">
            <div
              className={`${
                listingsCount > 0 ? "" : ""
              } px-[17px] text-black bg-white rounded-xl border border-[#EFEFEF] flex gap-[10px] items-center w-full md:max-w-[258px] h-10`}
            >
              <span className="flex items-center text-sm h-full font-medium pr-2.5 md:pr-[17px] border-r">
                USD
              </span>
              <input
                type="number"
                className="text-sm lg:text-sm font-medium bg-transparent touch-none outline-none w-full pl-2"
                placeholder="Enter Bid"
                value={!amount ? "" : amount}
                onChange={(e) => onAmountChange(e.target.value)}
              />
            </div>

            <Button
              disabled={!amount}
              text={listingsCount > 0 ? `Submit Bid (${listingsCount})` : <CheckIcon size={16} />}
              iconButton={!listingsCount}
              size="xs"
              onClick={sendBid}
              className={
                listingsCount > 0
                  ? "flex justify-center items-center rounded-xl text-sm font-medium w-full max-w-36 h-10"
                  : "flex justify-center items-center rounded-xl text-sm font-medium w-full max-w-36 h-10"
              }
            />
            {listingsCount > 0 && (
              <Button
                // disabled={true}
                text={<CloseIcon size={16} />}
                iconButton={!listingsCount}
                size="sm"
                onClick={() => onCancelBid()}
                className={"bg-[#2D3AAF] flex justify-center items-center rounded-xl text-sm font-medium h-10"}
              />
            )}
            {isPageLoading && <ScreenLoading />}
            <Modal
              isVisible={isModalVisible}
              transparent
              className="text-[#454545] text-center w-full max-w-[450px] bg-white shadow-lg rounded-[12px] border border-[rgba(0,0,0,0.05)] flex flex-col items-center gap-[25px]"
            >
              <div
                className="w-full flex justify-end cursor-pointer pt-[16px] pr-[16px]"
                onClick={onModalClose}
              >
                <CloseIcon size={24} />
              </div>
              <div className="py-2 px-1 flex flex-col items-center justify-center gap-[20px]">
                <Image
                  src="/svgs/success.svg"
                  width={106}
                  height={86}
                  alt="check"
                />
              </div>

              <div className="flex flex-col px-2 justify-center items-center">
                <span className="font-[700]">
                  You just made an iCharterBid!
                </span>
                <span className="font-[700]">
                  {charterProfilesCount} charters through {successfulBidsCount}{" "}
                  experiences were notified.
                </span>
                <p className="mt-2 text-sm">
                  We will let you know if they accept or decline your bid. Stay
                  onboard! You will receive an email soon.
                </p>
                <Button
                  className="max-w-[250px] mt-3 mb-8"
                  size="md"
                  text={"Continue Browsing"}
                  onClick={onModalClose}
                ></Button>
              </div>
            </Modal>

            <Modal
              isVisible={isErrorModalVisible}
              transparent
              className="text-[#454545] text-center w-full max-w-[450px] bg-white shadow-lg rounded-[12px] border border-[rgba(0,0,0,0.05)] flex flex-col items-center gap-[25px]"
            >
              <div
                className="w-full flex justify-end cursor-pointer pt-[16px] pr-[16px]"
                onClick={onModalClose}
              >
                <CloseIcon size={24} />
              </div>
              <div className="py-2 px-1 flex flex-col items-center justify-center gap-[20px]">
                <Image
                  src="/svgs/dead_fish.svg"
                  width={106}
                  height={86}
                  alt="a dead fish"
                />
              </div>

              <div className="flex flex-col px-2 justify-center items-center">
                <span className="font-[700]">
                  {"Ups you don't have any iCharterBids available!"}
                </span>
                <p className="mt-2 text-sm">
                  {
                    "You already used the 3 iCharterBid opportunities that each account has"
                  }
                </p>
                <Button
                  className="max-w-[250px] mt-3 mb-8"
                  size="md"
                  text={"Continue Browsing"}
                  onClick={onModalClose}
                ></Button>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </section>
  );
};
