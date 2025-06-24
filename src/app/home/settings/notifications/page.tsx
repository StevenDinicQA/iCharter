"use client";

import { CheckBox } from "@/components/shared/forms/atoms/CheckBox";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import { useState } from "react";
import { EmailPreferences } from "./types";

export default function NotificationsSettingsScreen() {
  const [emailPreferences, setEmailPreferences] = useState<EmailPreferences>({
    updates: true,
    reminders: true,
    tips: true,
  });

  const handleCheckboxClick = (field: keyof EmailPreferences) => {
    setEmailPreferences((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <section className="p-[30px] lg:p-[45px] bg-white rounded-[12px] flex flex-col gap-[45px]">
      <h2 className="text-[18px] lg:text-[28px] font-[700]">Notifications</h2>
      <FormField
        label="Account Activity and Updates"
        subLabel="Receive important updates about your account and listing, and our policies."
      >
        <CheckBox
          label="Email"
          isChecked={emailPreferences.updates}
          onClick={() => handleCheckboxClick("updates")}
        />
      </FormField>
      <FormField
        label="Reminders"
        subLabel="Get reminders about your calendar, payouts, and upcoming trips."
      >
        <CheckBox
          label="Email"
          isChecked={emailPreferences.reminders}
          onClick={() => handleCheckboxClick("reminders")}
        />
      </FormField>
      <FormField
        label="Promotion and Tips"
        subLabel="Learn how to maximize your listings potential and earn rewards."
      >
        <CheckBox
          label="Email"
          isChecked={emailPreferences.tips}
          onClick={() => handleCheckboxClick("tips")}
        />
      </FormField>
    </section>
  );
}
