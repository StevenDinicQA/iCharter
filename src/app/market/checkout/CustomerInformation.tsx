"use client";
import { ChangeEvent } from "react";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { TEXTAREA_INPUT_TYPE } from "@/components/shared/forms/atoms/customInputs/FormInput/types";
import { SelectInput } from "@/components/shared/forms/atoms/SelectInput";
import { CheckBox } from "@/components/shared/forms/atoms/CheckBox";
import { useCheckoutContext } from "./CheckoutContext";
import { CheckoutStep, StepProps } from "./types";
import { RequiredIcon } from "@/components/shared/general/atoms/icons/RequiredIcon";

export function CustomerInformation({ isResponsive }: StepProps) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    comments,
    setComments,
    isHandicapped,
    setIsHandicapped,
    mobileNumber,
    setMobileNumber,
    setCurrentStep,
    isCustomerNextButtonEnabled,
    discounts,
    selectedDiscount,
    setSelectedDiscount,
  } = useCheckoutContext();

  const handleDiscountOnChange = (newValue: any) => {
    if (newValue.value === selectedDiscount?.value) {
      setSelectedDiscount(null);
    } else {
      setSelectedDiscount(newValue);
    }
  };

  return isResponsive ? (
    <div className="w-full flex-col justify-start items-start gap-[21px] flex bg-white rounded-xl py-[20px] px-[10px]">
      <div className="text-zinc-700 text-xl font-bold leading-3">
        Your Information
      </div>

      <div className="w-full flex-col justify-start items-start gap-5 flex">
        <div className="w-full flex-col gap-2 flex">
          <label className="flex gap-1 text-zinc-700 text-base font-medium leading-none">
            First Name
            <RequiredIcon size={11} />
          </label>
          <FormInput
            value={firstName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFirstName(event.target.value)
            }
            placeholder="Enter First Name"
            test-id="firstname_input"
            width="inherit"
          />
        </div>

        <div className="w-full flex-col gap-2 flex">
          <label className="flex gap-1 text-zinc-700 text-base font-medium leading-none">
            Last Name
            <RequiredIcon size={11} />
          </label>
          <FormInput
            value={lastName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setLastName(event.target.value)
            }
            placeholder="Enter Last Name"
            test-id="lastname_input"
            width="inherit"
          />
        </div>

        <div className="w-full flex-col gap-2 flex">
          <label className="flex gap-1 text-zinc-700 text-base font-medium leading-none">
            Email
            <RequiredIcon size={11} />
          </label>
          <FormInput
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            placeholder="Enter Email Address"
            type="email"
            test-id="email_input"
            width="inherit"
          />
        </div>
        <div className="w-full flex-col gap-2 flex">
          <label className="flex gap-1 text-zinc-700 text-base font-medium leading-none">
            Mobile Number
            <RequiredIcon size={11} />
          </label>
          <FormInput
            value={mobileNumber}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setMobileNumber(event.target.value)
            }
            placeholder="Enter Mobile Number"
            test-id="mobile_input"
            width="inherit"
          />
        </div>
        <div className="w-full flex-col gap-2 flex">
          <label className="text-zinc-700 text-base font-medium leading-none">
            Additional Comments to the captain
          </label>
          <div className="w-full text-zinc-700 text-[13px] font-normal leading-[18.40px]">
            Most captains mention the dock, marina, or boat ramp that you use.
            These details will only be shared with customers after they book
            their trip.
          </div>
          <FormInput
            value={comments}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setComments(event.target.value)
            }
            placeholder="Enter Additional Comments"
            test-id="comments_input"
            width="inherit"
            type={TEXTAREA_INPUT_TYPE}
          />
        </div>
        <div className="w-full flex-col  gap-2 flex">
          <label className="text-zinc-700 text-base font-medium leading-none">
            Do any of these groups apply to you?
          </label>
          <div className="w-full text-zinc-700 text-[13px] font-normal leading-[18px]">
            You will be able to match with same captains and enjoy benefits!
          </div>
        </div>
        <div className="w-full">
          <SelectInput
            value={selectedDiscount}
            options={discounts}
            placeholder=""
            onChange={(newValue) => handleDiscountOnChange(newValue)}
          />
        </div>
        <div className="w-full justify-between items-center inline-flex">
          <CheckBox
            label="Disadvantage or Handicap"
            isChecked={isHandicapped}
            onClick={() => setIsHandicapped(!isHandicapped)}
          />
          <Button
            text="Next"
            disabled={!isCustomerNextButtonEnabled}
            onClick={() => setCurrentStep(CheckoutStep.PAYMENT)}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-[817px] px-[34px] py-[33px] bg-white rounded-xl justify-start items-start gap-2.5 flex mb-4">
      <div className="w-full flex-col justify-start items-start gap-[21px] inline-flex">
        <div className="text-zinc-700 text-xl font-bold leading-3">
          Your Information
        </div>

        <div className="w-full flex-col justify-start items-start gap-5 flex">
          <div className="w-[447px] flex-col gap-2 flex">
            <label className="flex gap-1 text-zinc-700 text-base font-medium leading-none">
              First Name
              <RequiredIcon size={11} />
            </label>
            <FormInput
              value={firstName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFirstName(event.target.value)
              }
              placeholder="Enter First Name"
              test-id="firstname_input"
              width="inherit"
            />
          </div>

          <div className="w-[447px] flex-col gap-2 flex">
            <label className="flex gap-1 text-zinc-700 text-base font-medium leading-none">
              Last Name
              <RequiredIcon size={11} />
            </label>
            <FormInput
              value={lastName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setLastName(event.target.value)
              }
              placeholder="Enter Last Name"
              test-id="lastname_input"
              width="inherit"
            />
          </div>

          <div className="w-[447px] flex-col gap-2 flex">
            <label className="flex gap-1 text-zinc-700 text-base font-medium leading-none">
              Email
              <RequiredIcon size={11} />
            </label>
            <FormInput
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              placeholder="Enter Email Address"
              type="email"
              test-id="email_input"
              width="inherit"
            />
          </div>

          <div className="w-[447px] flex-col gap-2 flex">
            <label className="flex gap-1 text-zinc-700 text-base font-medium leading-none">
              Mobile Number
              <RequiredIcon size={11} />
            </label>
            <FormInput
              value={mobileNumber}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setMobileNumber(event.target.value)
              }
              placeholder="Enter Mobile Number"
              test-id="mobile_input"
              width="inherit"
            />
          </div>

          <div className="w-[447px] flex-col gap-2 flex">
            <label className="text-zinc-700 text-base font-medium leading-none">
              Additional Comments to the captain
            </label>
            <div className="w-[581px] h-[34px] text-zinc-700 text-[13px] font-normal leading-[18.40px]">
              Most captains mention the dock, marina, or boat ramp that you use.
              These details will only be shared with customers after they book
              their trip.
            </div>
            <FormInput
              value={comments}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setComments(event.target.value)
              }
              placeholder="Enter Additional Comments"
              test-id="comments_input"
              width="inherit"
              type={TEXTAREA_INPUT_TYPE}
            />
          </div>

          <div className="w-[447px] flex-col  gap-2 flex">
            <label className="text-zinc-700 text-base font-medium leading-none">
              Do any of these groups apply to you?
            </label>
            <div className="w-[581px] text-zinc-700 text-[13px] font-normal leading-[18.40px]">
              You will be able to match with same captains and enjoy benefits!
            </div>
          </div>
          <div className="w-[447px]">
            <SelectInput
              value={selectedDiscount}
              options={discounts}
              placeholder=""
              onChange={(newValue) => handleDiscountOnChange(newValue)}
            />
          </div>
          <div className="w-full justify-between items-center inline-flex">
            <CheckBox
              label="Disadvantage or Handicap"
              isChecked={isHandicapped}
              onClick={() => setIsHandicapped(!isHandicapped)}
            />
            <Button
              width={138}
              text="Next"
              disabled={!isCustomerNextButtonEnabled}
              onClick={() => setCurrentStep(CheckoutStep.PAYMENT)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
