import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FormLayout } from "../FormLayout";
import { BoatInformationFormProps, boatTypes } from "./types";
import {
  OptionWithPhoto,
  SelectInput,
  SingleValueWithPhoto,
} from "@/components/shared/forms/atoms/SelectInput";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { CheckList } from "@/components/shared/forms/atoms/CheckList";
import { NumberInput } from "@/components/shared/forms/atoms/NumberInput";
import { TimeInput } from "@/components/shared/forms/atoms/TimeInput";
import { AddOtherBtn } from "@/components/shared/forms/atoms/buttons/AddOtherButton";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import { CheckOption } from "@/components/shared/forms/atoms/CheckList/type";
import { nanoid } from "nanoid";

export const BoatInformationForm = ({
  formData,
  setFormData,
  onSubmit,
  hasBookings,
}: BoatInformationFormProps) => {
  const [facilities, setFacilities] = useState<CheckOption[]>([
    {
      id: nanoid(),
      label: "Wheelchair Accessible",
      value: "Wheelchair Accessible",
    },
    { id: nanoid(), label: "Fridge", value: "Fridge" },
    { id: nanoid(), label: "Toilet", value: "Toilet" },
    { id: nanoid(), label: "Kitchen", value: "Kitchen" },
    { id: nanoid(), label: "Shower", value: "Shower" },
  ]);

  /**
   * formData update functions
   */
  const handleBoatTypeChange = (newValue: any) => {
    setFormData({ ...formData, boatType: newValue });
  };

  const handleBoatDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value.length <= 500) {
      setFormData({ ...formData, boatDescription: event.target.value });
    }
  };

  /**
   * General functions
   */
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.();
  };

  /**
   * useEffects
   */
  useEffect(() => {
    const facilitiesCache = window.localStorage.getItem("facilities");

    if (facilitiesCache) {
      setFacilities(JSON.parse(facilitiesCache));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("facilities", JSON.stringify(facilities));
  }, [facilities]);

  return (
    <FormLayout formTitle="Boat Information" onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-[20px]">
        <FormField className="max-w-[447px]" label="Boat Type" required>
          <SelectInput
            value={formData?.boatType?.value === '' ? null : formData.boatType}
            placeholder="Select Boat Type"
            options={boatTypes.map((boat) => ({
              value: boat.name,
              label: boat.name,
              imageUrl:`/imgs/${boat.img}.svg`,
            }))}
            onChange={handleBoatTypeChange}
            singleValueComponent={SingleValueWithPhoto}
            optionComponent={OptionWithPhoto}
          />
        </FormField>
        <FormField
          className="max-w-[447px]"
          label="Boat Description"
          subLabel="Add features and important information about your boat that could be useful for the customer."
          constrainsLabel={`${formData.boatDescription.length}/500`}
        >
          <FormInput
            testId="boatDescription"
            value={formData.boatDescription}
            onChange={handleBoatDescriptionChange}
            placeholder="Extra comfortable seats, small table..."
            type="textarea"
          />
        </FormField>
        <FormField label="Guest Capacity" required>
          <NumberInput
            value={formData.guestCapacity}
            displayText={`${
              formData.guestCapacity === 1
                ? `${formData.guestCapacity} guest`
                : `${formData.guestCapacity} guests`
            }`}
            placeholder="Select Guest Capacity"
            onLower={() => {
              if (formData.guestCapacity > 0) {
                setFormData({
                  ...formData,
                  guestCapacity: formData.guestCapacity - 1,
                });
              }
            }}
            onRaise={() => {
              setFormData({
                ...formData,
                guestCapacity: formData.guestCapacity + 1,
              });
            }}
            disabled={hasBookings}
          />
        </FormField>
        <FormField className="max-w-[447px]" label="Duration" required>
          <SelectInput
            value={formData.duration}
            options={[
              { label: "Full Day (8 hours)", value: "Full Day" },
              { label: "6 hours", value: "6 hours" },
              { label: "Half Day (4 hours)", value: "Half Day" },
              { label: "2 hours", value: "2 hours" },
            ]}
            onChange={(newValue: any) => {
              setFormData({
                ...formData,
                duration: newValue,
              });
            }}
            placeholder="Select Trip Duration"
            disabled={hasBookings}
          />
        </FormField>
        <FormField label="Departure Time">
          <TimeInput
            value={formData.departureTime}
            onChange={(newTime) => {
              setFormData({ ...formData, departureTime: newTime });
            }}
            disabled={hasBookings}
          />
        </FormField>
        <FormField
          label="Availability"
          subLabel="Select which days is this trip available."
          required
        >
          <CheckList
            options={[
              { id: nanoid(), label: "Mon", value: "mon" },
              { id: nanoid(), label: "Tue", value: "tue" },
              { id: nanoid(), label: "Wed", value: "wed" },
              { id: nanoid(), label: "Thu", value: "thu" },
              { id: nanoid(), label: "Fri", value: "fri" },
              { id: nanoid(), label: "Sat", value: "sat" },
              { id: nanoid(), label: "Sun", value: "sun" },
            ]}
            selectedOptions={formData.availability}
            horizontal
            labelOnTop
            setSelected={(value: string[]) => {
              setFormData({ ...formData, availability: value });
            }}
            disabled={hasBookings}
          />
        </FormField>
        <FormField className="max-w-[447px]" label="Seasonal Experience">
          <SelectInput
            value={formData.seasonalExperience}
            onChange={(newValue: any) => {
              setFormData({
                ...formData,
                seasonalExperience: newValue,
              });
            }}
            options={[
              { label: "Summer (Jun - Aug)", value: "Summer" },
              { label: "Winter (Dec - Feb)", value: "Winter" },
              { label: "Spring (Mar - May)", value: "Spring" },
              { label: "Fall (Sep - Nov)", value: "Fall" },
              { label: "Year round", value: "Year round" },
            ]}
            placeholder="Select Season"
            disabled={hasBookings}
          />
        </FormField>
        <div>
          <FormField
            label="Facilities"
            subLabel="Select what facilities are available on the boat."
          >
            <CheckList
              options={facilities}
              selectedOptions={formData.facilities}
              setSelected={(value: string[]) => {
                setFormData({ ...formData, facilities: value });
              }}
              onDelete={(id) => {
                setFacilities((currentValue) =>
                  currentValue.filter((item) => item.id !== id)
                );
              }}
            />
          </FormField>
          <div className="mt-[14px]">
            <AddOtherBtn
            customPlaceholder="Other facility"
              onCreate={(value: CheckOption) => {
                if (!facilities.includes(value)) {
                  if (!value.value) return;

                  setFacilities([...facilities, value]);

                  setFormData({
                    ...formData,
                    facilities: [...formData.facilities, value.value],
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </FormLayout>
  );
};
