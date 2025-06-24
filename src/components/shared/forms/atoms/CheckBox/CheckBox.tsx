import { ChangeEvent, KeyboardEvent, useState } from "react";
import { CheckIcon } from "../../../general/atoms/icons/CheckIcon";
import { CheckBoxProps } from "./types";

export const CheckBox = ({
  label,
  isChecked,
  onClick,
  labelTop,
  disabled,
}: CheckBoxProps) => {
  return (
    <div
      className={`flex gap-[8px] items-center ${
        labelTop && "flex-col-reverse"
      } ${disabled && "opacity-50 pointer-events-none"}`}
    >
      <div
        test-id={label}
        onKeyDown={(event) => {
          event.preventDefault();

          if (disabled) return;

          if (event.key === "Enter") {
            onClick?.();
          }
        }}
        onClick={() => {
          if (disabled) return;

          onClick?.();
        }}
        className={`w-[28px] h-[28px] rounded-[5px] flex justify-center items-center cursor-pointer ${
          isChecked
            ? "bg-blue-hover border-0"
            : "border-2 border-[#D1D1D1] hover:border-blue-hover"
        } transition`}
      >
        <CheckIcon size={18} stroke="white" />
      </div>
      <div className="text-[13px] select-none">{label}</div>
    </div>
  );
};
