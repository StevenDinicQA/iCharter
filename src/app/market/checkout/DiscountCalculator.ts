import { ICHARTER_SERVICE_PORCENTAGE } from "@/utils/constants";
import { DiscountTypes } from "./types";

export class DiscountCalculator {
  discounts: DiscountTypes;
  constructor(discounts: DiscountTypes) {
    this.discounts = discounts;
  }

  // Apply discount based on the discount type and value
  applyDiscount(price: number, discountType: string | undefined) {
    const { veteran, military, firstResponders, minorityOwnedBusiness } =
      this.discounts;

    let discountValue = 0;

    // Determine the discount value based on the discount type
    if (discountType === "veteran" && veteran !== null) {
      discountValue = Number(veteran);
    } else if (discountType === "military" && military !== null) {
      discountValue = Number(military);
    } else if (discountType === "firstResponders" && firstResponders !== null) {
      discountValue = Number(firstResponders);
    } else if (
      discountType === "minorityOwnedBusiness" &&
      minorityOwnedBusiness !== null
    ) {
      discountValue = Number(minorityOwnedBusiness);
    }

    // Apply the discount if the discount value is greater than 0
    if (discountValue > 0) {
      const totalDiscount = discountValue / 100;
      const discountedPrice = price * (1 - totalDiscount);
      return discountedPrice;
    } else {
      return price;
    }
  }

  // Get active discount types along with the amount to be discounted
  getActiveDiscountType(price: number, guestNumber: number) {
    const { veteran, military, firstResponders, minorityOwnedBusiness } =
      this.discounts;

    const activeDiscounts = [];
    // const priceToPayLater = price * ( 1 -(ICHARTER_SERVICE_PORCENTAGE / 100))

    if (veteran !== null && Number(veteran) > 0) {
      activeDiscounts.push({
        label: "Veteran",
        value: "veteran",
        amount: ((Number(veteran) / 100) * price * guestNumber).toFixed(2),
      });
    }

    if (military !== null && Number(military) > 0) {
      activeDiscounts.push({
        label: "Active Military",
        value: "military",
        amount: ((Number(military) / 100) * price * guestNumber).toFixed(2),
      });
    }

    if (firstResponders !== null && Number(firstResponders) > 0) {
      activeDiscounts.push({
        label: "First Responders",
        value: "firstResponders",
        amount: ((Number(firstResponders) / 100) * price * guestNumber).toFixed(
          2
        ),
      });
    }

    if (minorityOwnedBusiness !== null && Number(minorityOwnedBusiness) > 0) {
      activeDiscounts.push({
        label: "Minority Owned Businness",
        value: "minorityOwnedBusiness",
        amount: (
          (Number(minorityOwnedBusiness) / 100) *
          price *
          guestNumber
        ).toFixed(2),
      });
    }

    return activeDiscounts;
  }

  // Calculate the amount to pay today
  amountToPayToday(price: number, guestNumber: number) {
    return (price * (ICHARTER_SERVICE_PORCENTAGE / 100) * guestNumber).toFixed(
      2
    );
  }

  // Calculate the amount to pay to the captain later after applying discount
  payToCaptainLater(
    price: number,
    discountType: string | undefined,
    guestNumber: number
  ) {
    const discountedPrice = this.applyDiscount(price, discountType);
    
    const discount = price - discountedPrice;
  
    const amountToPayLater = price * (1 - ICHARTER_SERVICE_PORCENTAGE / 100) - discount * guestNumber;
  
    return amountToPayLater.toFixed(2);
  }  
}
