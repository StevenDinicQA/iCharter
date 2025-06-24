import { ChangeEvent, FormEvent } from "react";
import { FormLayout } from "../FormLayout";
import { PricingFormProps } from "./types";
import { RadioGroup } from "@/components/shared/forms/atoms/RadioGroup";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import { CheckList } from "@/components/shared/forms/atoms/CheckList";
import { CheckBox } from "@/components/shared/forms/atoms/CheckBox";
import { SelectInput } from "@/components/shared/forms/atoms/SelectInput";
import Image from "next/image";
import { Slider, useMediaQuery } from "@mui/material";
import { nanoid } from "nanoid";
import { ICHARTER_SERVICE_PORCENTAGE } from "@/utils/constants";

export const PricingForm = ({
  formData,
  setFormData,
  onSubmit,
  isUploading,
  isDisabled,
  hasBookings,
}: PricingFormProps) => {
  const isResponsive = useMediaQuery("(max-width: 1024px)");

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.();
  };

  const handleIncrementOrDecrement = (command: string, minOrMax: string)  => {  

    if(!command || !minOrMax) return;

    if(minOrMax === 'min') {
      if (command === 'inc') {
        setFormData({ ...formData, bidRange: [formData.bidRange[0] + 1, formData.bidRange[1]]});
      } else {
        setFormData({ ...formData, bidRange: [formData.bidRange[0] - 1, formData.bidRange[1]]});
      }
    }

    if(minOrMax === 'max') {
      if (command === 'inc') {
        setFormData({ ...formData, bidRange: [formData.bidRange[0], formData.bidRange[1] + 1]});
      } else {
        setFormData({ ...formData, bidRange: [formData.bidRange[0], formData.bidRange[1] - 1]});
      }
    }
  }

  return (
    <FormLayout
      formTitle="Pricing"
      onSubmit={handleFormSubmit}
      isUploading={isUploading}
      disabled={isDisabled}
      customNextButtonText="Publish"
    >
      <div className="flex flex-col gap-[20px]">
        <FormField label="Experience Model" required>
          <RadioGroup
            selected={formData.type}
            onChange={(option: string) => {
              setFormData({ ...formData, type: option });
            }}
            options={["Private", "Public"]}
            groupName="experience_model"
            disabled={hasBookings}
          />
        </FormField>
        <FormField
          className="max-w-[447px]"
          label="Price Per Trip"
          subLabel="If is a private trip this price will apply for the whole experience .If is a public trip this price will apply individually for each guest."
          required
        >
          <FormInput
            value={formData.pricePerTrip || ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (Number(event.target.value) >= 0) {
                setFormData({
                  ...formData,
                  pricePerTrip: event.target.value,
                  bidRange: [1, Number(event.target.value)],
                });
              }
            }}
            placeholder="Enter price"
            type="number"
            leftIcon={
              <p className="text-[16px] font-[500] border-r pr-[12px] border-[#EFEFEF] w-[76px]">
                USD $
              </p>
            }
            disabled={hasBookings}
          />
        </FormField>
        <FormField
          label="Special Discount"
          subLabel="Do you want to add a discount for veterans or minorities on your listing?"
        >
          <div className="flex flex-col gap-[14px]">
            <div key={nanoid()} className="flex items-center gap-[10px]">
              <div className="w-[164px]">
                <p>Veteran</p>
              </div>
              <div className="w-full max-w-[280px]">
                <SelectInput
                  value={formData.specialDiscounts.veteran}
                  onChange={(newValue: any) => {
                    setFormData({
                      ...formData,
                      specialDiscounts: {
                        ...formData.specialDiscounts,
                        veteran: newValue,
                      },
                    });
                  }}
                  options={[
                    { label: "0%", value: "0" },
                    { label: "10%", value: "10" },
                    { label: "15%", value: "15" },
                    { label: "20%", value: "20" },
                    { label: "25%", value: "25" },
                  ]}
                  placeholder="Select discount"
                />
              </div>
            </div>
            <div key={nanoid()} className="flex items-center gap-[10px]">
              <div className="w-[164px]">
                <p>Active Military</p>
              </div>
              <div className="w-full max-w-[280px]">
                <SelectInput
                  value={formData.specialDiscounts.military}
                  onChange={(newValue: any) => {
                    setFormData({
                      ...formData,
                      specialDiscounts: {
                        ...formData.specialDiscounts,
                        military: newValue,
                      },
                    });
                  }}
                  options={[
                    { label: "0%", value: "0" },
                    { label: "10%", value: "10" },
                    { label: "15%", value: "15" },
                    { label: "20%", value: "20" },
                    { label: "25%", value: "25" },
                  ]}
                  placeholder="Select discount"
                />
              </div>
            </div>
            <div key={nanoid()} className="flex items-center gap-[10px]">
              <div className="w-[164px]">
                <p>First Responders</p>
              </div>
              <div className="w-full max-w-[280px]">
                <SelectInput
                  value={formData.specialDiscounts.firstResponders}
                  onChange={(newValue: any) => {
                    setFormData({
                      ...formData,
                      specialDiscounts: {
                        ...formData.specialDiscounts,
                        firstResponders: newValue,
                      },
                    });
                  }}
                  options={[
                    { label: "0%", value: "0" },
                    { label: "10%", value: "10" },
                    { label: "15%", value: "15" },
                    { label: "20%", value: "20" },
                    { label: "25%", value: "25" },
                  ]}
                  placeholder="Select discount"
                />
              </div>
            </div>
          </div>
        </FormField>
        <FormField
          label="Payment Method"
          subLabel="Select which payment methods are you going to accept."
          required
        >
          <CheckList
            selectedOptions={formData.paymentMethod}
            options={[
              { id: nanoid(), label: "Cash", value: "Cash" },
              { id: nanoid(), label: "Credit Card", value: "Credit Card" },
              { id: nanoid(), label: "Debit Card", value: "Debit Card" },
              { id: nanoid(), label: "Payment App", value: "Payment App" },
            ]}
            setSelected={(value: string[]) => {
              setFormData({ ...formData, paymentMethod: value });
            }}
            horizontal={!isResponsive}
          />
        </FormField>
        <FormField
          className="max-w-[578px] mt-2"
          label="Cancellation Policy"
          subLabel="Add the rules and guidelines related to canceling the experience. Add applicable fees, timeline and process for requesting a refund."
          constrainsLabel={`${formData.cancelationPolicy.length}/500`}
          required
        >
          <FormInput
            testId="cancellation-rules"
            type="textarea"
            value={formData.cancelationPolicy}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              if (event.target.value.length <= 500) {
                setFormData({
                  ...formData,
                  cancelationPolicy: event.target.value,
                });
              }
            }}
          />
        </FormField>
        <p className="margin-[0px] text-xs text-[#454545] font-medium">
          iCharter always returns {ICHARTER_SERVICE_PORCENTAGE}% deposit in case of cancellation.
        </p>
        <hr className="my-[15px]" />
        <div className="flex items-center gap-[16px] mt-3">
          <FormField
            label="Do you want to participate on iCharterBid?"
            subLabel="iCharterBid is an innovative way to ensure that your boat stays full. Customers with an iCharter profile will have the opportunity to send a bid to Charter Captain enrolled in iCharterBid no more than three times a year and must be submitted no earlier than three days before the requested date but could be same day. The bid might be a little less than your advertised rate. Don’t worry! As a captain, you will be notified of the bid and either accept or decline. This helps to fill open spots on your calendar!"
          >
            <div className="flex flex-col gap-[26px] mt-[20px]">
              <div
                className={`text-[16px] font-[500] flex items-center gap-[24px] ${
                  !formData.hasIcharterBid && "opacity-50 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center">
                  <p>$ 0</p>
                  <div className="flex flex-row gap-1">
                    <div onClick={() => handleIncrementOrDecrement('dec', 'min')} className="bg-[#2D3AAF] w-[24px] h-[24px] flex items-center justify-center rounded-full cursor-pointer">
                      <p className="font-bold text-white">-</p>
                    </div>
                    <div onClick={() => handleIncrementOrDecrement('inc', 'min')} className="bg-[#2D3AAF] w-[24px] h-[24px] flex items-center justify-center rounded-full cursor-pointer">
                      <p className="font-bold text-white">+</p>
                    </div>
                  </div>
                </div>
                <Slider
                  disabled={!formData.pricePerTrip || formData.pricePerTrip == 0}
                  max={Number(formData.pricePerTrip) || 0}
                  min={0}
                  value={formData.bidRange}
                  valueLabelDisplay="on"
                  valueLabelFormat={(arg: number) => `$${arg}`}
                  onChange={(event: any) => {
                    setFormData({ ...formData, bidRange: event.target.value });
                  }}
                  sx={{
                    width: "447px",
                    color: "#0A7AFF",
                    height: 4,
                    padding: "13px 0",
                    "& .MuiSlider-valueLabel": {
                      fontSize: 12,
                      fontWeight: "normal",
                      top: -6,
                      backgroundColor: "unset",
                      color: "currentcolor",
                      "&:before": {
                        display: "none",
                      },
                      "& *": {
                        background: "transparent",
                        color: "#000",
                      },
                    },
                    "& .MuiSlider-thumb": {
                      height: 27,
                      width: 27,
                      backgroundColor: "#fff",
                      boxShadow: "0 0.5px 4px rgba(0, 0, 0, 0.12)",
                      "& .custom-bar": {
                        height: 9,
                        width: 1,
                        backgroundColor: "currentColor",
                        marginLeft: 1,
                        marginRight: 1,
                      },
                    },
                    "& .MuiSlider-track": {
                      height: 4,
                    },
                    "& .MuiSlider-rail": {
                      color: "rgba(60, 60, 67, 0.18)",
                      opacity: 1,
                      height: 4,
                    },
                  }}
                />
                {formData.pricePerTrip ? (
                  <div className="flex flex-col items-center">
                    <p className="whitespace-nowrap pr-[8px]">$ {formData.pricePerTrip}</p>
                    <div className="flex flex-row gap-1">
                    <div onClick={() => handleIncrementOrDecrement('dec', 'max')} className="bg-[#2D3AAF] w-[24px] h-[24px] flex items-center justify-center rounded-full cursor-pointer">
                      <p className="font-bold text-white">-</p>
                    </div>
                    <div onClick={() => handleIncrementOrDecrement('inc', 'max')} className="bg-[#2D3AAF] w-[24px] h-[24px] flex items-center justify-center rounded-full cursor-pointer">
                      <p className="font-bold text-white">+</p>
                    </div>
                  </div>
                  </div>
                ) : (
                  <div>
                    <p>$ 0</p>
                    <div className="flex flex-row gap-1">
                    <div onClick={() => handleIncrementOrDecrement('dec', 'max')} className="bg-[#2D3AAF] w-[24px] h-[24px] flex items-center justify-center rounded-full cursor-pointer">
                      <p className="font-bold text-white">-</p>
                    </div>
                    <div onClick={() => handleIncrementOrDecrement('inc', 'max')} className="bg-[#2D3AAF] w-[24px] h-[24px] flex items-center justify-center rounded-full cursor-pointer">
                      <p className="font-bold text-white">+</p>
                    </div>
                  </div>
                  </div>
                )}
              </div>
              <CheckBox
                isChecked={!formData.hasIcharterBid}
                onClick={() => {
                  setFormData({
                    ...formData,
                    hasIcharterBid: !formData.hasIcharterBid,
                  });
                }}
                label="I don’t want to participate on iCharterBid"
              />
            </div>
          </FormField>
          {!isResponsive && (
            <Image
              src="/svgs/charter_bid.svg"
              width={162}
              height={172}
              alt="Charter Bid icon"
              className="select-none"
            />
          )}
        </div>
      </div>
    </FormLayout>
  );
};
