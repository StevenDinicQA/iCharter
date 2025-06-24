"use client";

import { SettingsNav } from "@/components/home/molecules/SettingsNav";
import { SettingsScreenLayoutProps } from "./types";

export default function SettingsScreenLayout({
  children,
}: SettingsScreenLayoutProps) {
  return (
    <div className="text-[#454545] mb-[30px]">
      <h2 className="hidden lg:block text-[28px] font-[700] my-[45px]">
        My Account
      </h2>
      <div className="flex items-start gap-[30px]">
        <div className="hidden lg:block w-[20%]">
          <SettingsNav />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
