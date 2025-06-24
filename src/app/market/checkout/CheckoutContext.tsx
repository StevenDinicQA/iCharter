import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CardState,
  CheckoutStep,
  CreateBookingRequestData,
  Discount,
} from "./types";
import { CustomerInformation } from "./CustomerInformation";
import { PaymentInformation } from "./PaymentInformation";
import { ReviewInformation } from "./ReviewInformation";
import apiService from "@/services/apiService";
import { Listing } from "@/types/listings/listing";
import { listingFactory } from "@/utils/factories/listingFactory";
import Cookies from "js-cookie";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DiscountCalculator } from "./DiscountCalculator";
import moment from "moment-timezone";
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from "@stripe/stripe-js";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { DEFAULT_GUEST_NUMBER } from "../listing/[id]/constants";

interface ICheckoutContext {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  mobileNumber: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
  isHandicapped: boolean;
  setIsHandicapped: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: CheckoutStep;
  setCurrentStep: React.Dispatch<React.SetStateAction<CheckoutStep>>;
  getStepComponent: Function;
  isCustomerNextButtonEnabled: boolean;
  listingData: Required<Listing> | undefined | null;
  checkoutDate: string | undefined;
  createBooking: () => {};
  discounts: Discount[];
  selectedDiscount: Discount | null;
  setSelectedDiscount: React.Dispatch<React.SetStateAction<Discount | null>>;
  amountToPayToday: string | null;
  amountToPayLater: string | null;
  handleCardElementOnChange: (
    e:
      | StripeCardNumberElementChangeEvent
      | StripeCardCvcElementChangeEvent
      | StripeCardExpiryElementChangeEvent
  ) => void;
  cardComplete: CardState;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  guestNumber: number;
  increaseGuestNumber: () => void;
  reduceGuestNumber: () => void;
  reservationNumber: string | null;
  showError: boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  isBookingPrivate: boolean;
  bidAmount: string | null;
  setPreviousGuestNumber: React.Dispatch<React.SetStateAction<number | null>>;
  previousGuestNumber: number | null;
  setGuestNumber: React.Dispatch<React.SetStateAction<number>>;
  bookingId: string;
  removeSuccessfulBookingCookies: Function;
}

export const CheckoutContext = React.createContext<
  ICheckoutContext | undefined
>(undefined);

export default function CheckoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState<string>(user?.email || "");
  const [firstName, setFirstName] = useState<string>(user?.name || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [guestNumber, setGuestNumber] = useState<number>(
    Number(Cookies.get("guest_number")) || 1
  );
  const [previousGuestNumber, setPreviousGuestNumber] = useState<number | null>(
    null
  );
  const [comments, setComments] = useState<string>("");
  const [isHandicapped, setIsHandicapped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const [cardComplete, setCardComplete] = useState<CardState>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.CUSTOMER_INFORMATION
  );
  const [listingAvailableSeats, setListingAvailableSeats] = useState<
    number | null
  >(null);
  const [isCustomerNextButtonEnabled, setIsCustomerNextButtonEnabled] =
    useState(false);

  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(
    null
  );
  const [amountToPayToday, setAmountToPayToday] = useState<string | null>(null);
  const [amountToPayLater, setAmountToPayLater] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState<string | null>(null);
  const [reservationNumber, setReservationNumber] = useState<string | null>(
    null
  );
  const [bookingId, setBookingId] = useState<string>("");

  const [listingData, setListingData] = useState<
    Required<Listing> | undefined | null
  >(undefined);

  const listingId = Cookies.get("checkout_listing_id");
  const checkoutDate = Cookies.get("checkout_start_date");
  const checkout_first_name = Cookies.get("checkout_first_name");
  const checkout_last_name = Cookies.get("checkout_last_name");
  const checkout_email = Cookies.get("checkout_email");
  const checkout_mobile = Cookies.get("checkout_mobile");
  const checkout_bid_amount = Cookies.get("checkout_bid_amount");
  const checkout_bid_request_id = Cookies.get("checkout_bid_request_id");
  const checkout_user_id = Cookies.get("checkout_user_id");
  const checkoutOrderId = Cookies.get("checkout_order_id");
  const checkoutBookingId = Cookies.get("checkout_booking_id");

  useEffect(() => {
    if (!listingId || !checkoutDate) {
      router.push("/market");
    } else if (checkoutOrderId && checkoutBookingId) {
      setCurrentStep(CheckoutStep.REVIEW);
      getListing(listingId);
      setReservationNumber(checkoutOrderId);
      setBookingId(checkoutBookingId);
    } else {
      getListing(listingId);
      getListingSeats();
    }
  }, []);

  useEffect(() => {
    if (listingData) {
      applyDiscounts();
    }
  }, [listingData, guestNumber, selectedDiscount]);

  useEffect(() => {
    if (user) {
      setFirstName(user.name);
      setLastName(user.lastName);
      setEmail(user.email);
    } else {
      if (checkout_first_name) {
        setFirstName(checkout_first_name);
      }

      if (checkout_last_name) {
        setLastName(checkout_last_name);
      }

      if (checkout_email) {
        setEmail(checkout_email);
      }

      if (checkout_mobile) {
        setMobileNumber(checkout_mobile);
      }

      if (checkout_bid_amount) {
        setBidAmount(checkout_bid_amount);
      }
      return;
    }
  }, [user]);

  useEffect(() => {
    const areFieldsFilled: boolean = Boolean(
      firstName && lastName && email && mobileNumber
    );

    setIsCustomerNextButtonEnabled(areFieldsFilled);
  }, [firstName, email, mobileNumber]);

  async function getListing(listingId: string) {
    const { data, error: listingError } = await apiService.get(
      `listings/${listingId}`
    );

    if (listingError) {
      setListingData(null);
      return;
    }

    setListingData(listingFactory(data) as Required<Listing>);
  }

  const isBookingPrivate = useMemo(() => {
    return listingData?.pricingModel.type === "private";
  }, [listingData]);

  const getStepComponent = (isResponsive: boolean): React.ReactNode => {
    switch (currentStep) {
      case CheckoutStep.CUSTOMER_INFORMATION:
        return <CustomerInformation isResponsive={isResponsive} />;
      case CheckoutStep.PAYMENT:
        return <PaymentInformation isResponsive={isResponsive} />;
      case CheckoutStep.REVIEW:
        return <ReviewInformation isResponsive={isResponsive} />;
      default:
        return null;
    }
  };

  function calculateStartsAndEnds(): {
    starts_at: string;
    ends_at: string;
  } {
    let duration: number = 0;
    if (listingData?.boat.duration === "Full Day") duration = 8;
    if (listingData?.boat.duration === "6 hours") duration = 6;
    if (listingData?.boat.duration === "Half Day") duration = 4;
    if (listingData?.boat.duration === "2 hours") duration = 2;
    const inputDate = moment(checkoutDate, "dddd, MMMM DD, YYYY");

    const startsAt = moment(inputDate);

    startsAt.set({
      hour: listingData?.boat.departureTime.hour,
      minute: listingData?.boat.departureTime.minute,
      second: 0,
      millisecond: 0,
    });

    const endsAt = moment(startsAt).add(duration, "hours");

    return {
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
    };
  }

  async function createBooking() {
    setIsLoading(true);
    const userId = checkout_user_id || user?.id;
    const url = `bookings/create/${userId}/listing/${listingData?.id}`;
    const bookingDate = calculateStartsAndEnds();

    if (!stripe || !elements) {
      toast.error("Credit card service is not running");
      return;
    }

    const card = elements.getElement(CardNumberElement);

    if (card == null) {
      return;
    }

    const stripeCard = await stripe.createToken(card);

    if (stripeCard.error) {
      console.log("[error]", stripeCard.error);
      toast.error(
        stripeCard.error.message ||
          "Credit card is Invalid, please check your information and try again"
      );
    }

    const requestData: CreateBookingRequestData = {
      seats: isBookingPrivate ? DEFAULT_GUEST_NUMBER : guestNumber,
      privateGuests: isBookingPrivate ? guestNumber : undefined,
      isHandicap: Boolean(isHandicapped),
      comments: comments,
      starts_at: moment(bookingDate.starts_at)
        .tz("America/New_York", true)
        .format(),
      ends_at: moment(bookingDate.ends_at)
        .tz("America/New_York", true)
        .format(),
      card: {
        lastFour: stripeCard.token?.card?.last4,
        token: stripeCard.token?.id,
      },
      specialDiscountType: selectedDiscount?.value,
      bidRequestId: checkout_bid_request_id || "",
    };

    try {
      const { error, data, status } = await apiService.post(url, requestData);

      if (error) {
        if (status === 400) {
          router.push(`listing/${listingData?.id}`);
          toast.error(
            "The booking is no longer available, please choose a different date to continue"
          );
          return;
        }
        toast.error(error || "An error has occurred, please try again later");
      } else {
        const reservationNumber: string = data[0].metadata.orderId;
        const bookingId: string = data[0].id;

        setReservationNumber(reservationNumber);
        setBookingId(bookingId);
        Cookies.set("checkout_order_id", reservationNumber);
        Cookies.set("checkout_booking_id", bookingId);

        setCurrentStep(CheckoutStep.REVIEW);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getListingSeats() {
    const startDate = moment(checkoutDate);
    const isoWithTimeZone = startDate.tz("America/New_York", true).format();

    const { data, error } = await apiService.get(
      `bookings/listing/${listingId}/availability?date=${isoWithTimeZone}`
    );

    if (error) {
      toast.error("There was an error checking this booking availability");
      return;
    }
    setListingAvailableSeats(data.availableSeats);
  }

  async function increaseGuestNumber() {
    if (!listingAvailableSeats || !listingData?.boat?.guestCapacity) return;
    const _listingAvailableSeats: number = isBookingPrivate
      ? listingData?.boat?.guestCapacity
      : listingAvailableSeats;
    if (guestNumber + 1 > _listingAvailableSeats) {
      setError("This booking cannot include more guests");
      setShowError(true);
      return;
    }
    setGuestNumber(guestNumber + 1);
  }

  function reduceGuestNumber() {
    if (guestNumber === 1) {
      return;
    }
    setGuestNumber(guestNumber - 1);
  }

  const applyDiscounts = () => {
    const updateSelectedDiscount = (_discounts: Discount[]) => {
      if (selectedDiscount) {
        const newDiscount: Discount | undefined = _discounts.find(
          (discount) => discount.value === selectedDiscount.value
        );

        if (newDiscount && newDiscount?.amount !== selectedDiscount.amount) {
          setSelectedDiscount(newDiscount);
        }
      }
    };

    let discountCalculator: DiscountCalculator | null = null;
    if (listingData?.pricingModel.specialDiscounts) {
      discountCalculator = new DiscountCalculator(
        listingData.pricingModel.specialDiscounts
      );
      const guestNumberForPricing: number = isBookingPrivate ? 1 : guestNumber;
      const discounts = discountCalculator?.getActiveDiscountType(
        bidAmount
          ? Number(bidAmount)
          : Number(listingData.pricingModel.pricePerTrip),
        guestNumberForPricing
      );
      setDiscounts(discounts);

      const price = bidAmount
        ? Number(bidAmount)
        : Number(listingData.pricingModel.pricePerTrip);
      setAmountToPayToday(
        discountCalculator.amountToPayToday(price, guestNumberForPricing)
      );
      setAmountToPayLater(
        discountCalculator?.payToCaptainLater(
          price,
          selectedDiscount?.value,
          guestNumberForPricing
        )
      );
      updateSelectedDiscount(discounts);
      return;
    }
    setDiscounts([]);
  };

  function handleCardElementOnChange(
    e:
      | StripeCardNumberElementChangeEvent
      | StripeCardCvcElementChangeEvent
      | StripeCardExpiryElementChangeEvent
  ) {
    setCardComplete({ ...cardComplete, [e.elementType]: e.complete });
  }

  const removeSuccessfulBookingCookies = () => {
    Cookies.remove("checkout_order_id");
    Cookies.remove("checkout_booking_id");
  };

  return (
    <CheckoutContext.Provider
      value={{
        email,
        setEmail,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        mobileNumber,
        setMobileNumber,
        comments,
        setComments,
        isHandicapped,
        setIsHandicapped,
        currentStep,
        setCurrentStep,
        getStepComponent,
        isCustomerNextButtonEnabled,
        listingData,
        checkoutDate,
        createBooking,
        discounts,
        selectedDiscount,
        setSelectedDiscount,
        amountToPayToday,
        amountToPayLater,
        handleCardElementOnChange,
        cardComplete,
        isLoading,
        setIsLoading,
        guestNumber,
        increaseGuestNumber,
        reduceGuestNumber,
        reservationNumber,
        error,
        setError,
        showError,
        setShowError,
        isBookingPrivate,
        bidAmount,
        setPreviousGuestNumber,
        previousGuestNumber,
        setGuestNumber,
        bookingId,
        removeSuccessfulBookingCookies,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckoutContext = () => {
  const context = React.useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutProvider"
    );
  }
  return context;
};
