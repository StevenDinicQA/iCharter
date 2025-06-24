"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { useCheckoutContext } from "./CheckoutContext";
import { CheckoutStep, StepProps, StripeElementsReady } from "./types";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  CC_NUMBER_ELEMENT_OPTIONS,
  CVC_ELEMENT_OPTIONS,
  EXPIRATION_DATE_ELEMENT_OPTIONS,
} from "@/helpers/stripe";
import Image from "next/image";

export function PaymentInformation({ isResponsive }: StepProps) {
  const {
    createBooking,
    handleCardElementOnChange,
    cardComplete,
    setIsLoading,
    isLoading,
  } = useCheckoutContext();

  const [stripeElementsReady, setStripeElementsReady] =
    useState<StripeElementsReady>({
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false,
    });

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (Object.values(stripeElementsReady).every(Boolean)) {
      setIsLoading(false);
    }
  }, [stripeElementsReady]);

  return isResponsive ? (
    <div className="w-full flex-col justify-start items-start gap-[21px] flex bg-white rounded-xl py-[20px] px-[10px]">
      <div className="text-zinc-700 text-xl font-bold leading-3">
        Payment Method
      </div>

      <div className="w-full flex-col justify-start items-start gap-5 flex">
        <div className="w-full flex-col gap-2 flex">
          <label className="text-zinc-700 text-base font-medium leading-none">
            Card Number
          </label>
          <div className="rounded-xl border border-neutral-500 h-[48px] px-3 py-3">
            <CardNumberElement
              options={CC_NUMBER_ELEMENT_OPTIONS}
              onChange={handleCardElementOnChange}
              onReady={() =>
                setStripeElementsReady((prevState) => ({
                  ...prevState,
                  cardNumber: true,
                }))
              }
            />
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div className="w-[151px] flex-col gap-2 flex">
            <label className="text-zinc-700 text-base font-medium leading-none">
              Expiration Date
            </label>
            <div className="rounded-xl border border-neutral-500 h-[48px] px-3 py-3">
              <CardExpiryElement
                onChange={handleCardElementOnChange}
                options={EXPIRATION_DATE_ELEMENT_OPTIONS}
                onReady={() =>
                  setStripeElementsReady((prevState) => ({
                    ...prevState,
                    cardExpiry: true,
                  }))
                }
              />
            </div>
          </div>

          <div className="w-[151px] flex-col gap-2 flex">
            <label className="text-zinc-700 text-base font-medium leading-none">
              CVV
            </label>
            <div className="rounded-xl border border-neutral-500 h-[48px] px-3 py-3">
              <CardCvcElement
                onChange={handleCardElementOnChange}
                options={CVC_ELEMENT_OPTIONS}
                onReady={() =>
                  setStripeElementsReady((prevState) => ({
                    ...prevState,
                    cardCvc: true,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div className="w-full justify-end items-center flex">
          <Button
            width={138}
            text="Next"
            disabled={!Object.values(cardComplete).every(Boolean) || isLoading}
            onClick={createBooking}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-[817px] h-[336px] px-[34px] py-[33px] bg-white rounded-xl justify-start items-start gap-2.5 flex">
      <div className="w-full flex-col justify-start items-start gap-[21px] inline-flex">
        <div className="text-zinc-700 text-xl font-bold leading-3">
          Payment Method
        </div>

        <div className="w-full flex-col justify-start items-start gap-5 flex">
          <div className="w-[447px] flex-col gap-2 flex">
            <label className="text-zinc-700 text-base font-medium leading-none">
              Card Number
            </label>
            <div className="rounded-xl border border-neutral-500 h-[48px] px-3 py-3">
              <CardNumberElement
                options={CC_NUMBER_ELEMENT_OPTIONS}
                onChange={handleCardElementOnChange}
                onReady={() =>
                  setStripeElementsReady((prevState) => ({
                    ...prevState,
                    cardNumber: true,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex gap-[32px]">
            <div className="w-[207px] flex-col gap-2 flex">
              <label className="text-zinc-700 text-base font-medium leading-none">
                Expiration Date
              </label>
              <div className="rounded-xl border border-neutral-500 h-[48px] px-3 py-3">
                <CardExpiryElement
                  onChange={handleCardElementOnChange}
                  options={EXPIRATION_DATE_ELEMENT_OPTIONS}
                  onReady={() =>
                    setStripeElementsReady((prevState) => ({
                      ...prevState,
                      cardExpiry: true,
                    }))
                  }
                />
              </div>
            </div>

            <div className="w-[207px] flex-col gap-2 flex">
              <label className="text-zinc-700 text-base font-medium leading-none">
                CVV
              </label>
              <div className="rounded-xl border border-neutral-500 h-[48px] px-3 py-3">
                <CardCvcElement
                  onChange={handleCardElementOnChange}
                  options={CVC_ELEMENT_OPTIONS}
                  onReady={() =>
                    setStripeElementsReady((prevState) => ({
                      ...prevState,
                      cardCvc: true,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center w-full">
            <Image
              src="/svgs/stripe_powered-by.svg"
              alt="Powered by Stripe"
              width={180}
              height={40}
            />
            <Button
              width={138}
              text="Next"
              disabled={
                !Object.values(cardComplete).every(Boolean) || isLoading
              }
              onClick={createBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
