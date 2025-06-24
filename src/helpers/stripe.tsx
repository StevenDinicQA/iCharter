import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY || "");

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#454545",
      fontWeight: "500",
      lineHeight: "20px",
      padding: "12px 8px",
      "::placeholder": {
        color: "#DCD5D5",
      },
    },
  },
};

export const CC_NUMBER_ELEMENT_OPTIONS = {
  ...ELEMENT_OPTIONS,
  placeholder: "XXXX XXXX XXXX XXXX",
};

export const CVC_ELEMENT_OPTIONS = {
  ...ELEMENT_OPTIONS,
  placeholder: "XXX",
};

export const EXPIRATION_DATE_ELEMENT_OPTIONS = {
  ...ELEMENT_OPTIONS,
  placeholder: "MM/YY",
};
