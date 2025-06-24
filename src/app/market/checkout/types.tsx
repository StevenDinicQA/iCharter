export enum CheckoutStep {
  CUSTOMER_INFORMATION = "customer_information",
  PAYMENT = "payment",
  REVIEW = "review",
}

export type StepProps = {
  isResponsive: boolean;
};

export interface DiscountTypes {
  veteran: string | null;
  military: string | null;
  firstResponders: string | null;
  minorityOwnedBusiness?: string | null;
}

export interface Discount {
  label: string;
  value: string;
  amount: string;
}

export interface CardState {
  cardNumber: boolean;
  cardExpiry: boolean;
  cardCvc: boolean;
}

export interface StripeElementsReady {
  cardNumber: boolean;
  cardExpiry: boolean;
  cardCvc: boolean;
}

interface StripeCard {
  token: string | undefined;
  lastFour: string | undefined;
}

export interface CreateBookingRequestData {
  seats: number;
  privateGuests?: number;
  starts_at: string;
  ends_at: string;
  comments?: string;
  isHandicap: boolean;
  specialDiscountType?: string | undefined;
  card: StripeCard;
  bidRequestId: string | undefined;
}

export interface CreateReviewRequestBody {
  rating?: string;
  comments?: string;
}
