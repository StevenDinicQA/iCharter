import { KeyboardEvent } from "react";
import { MinusIcon } from "../../../general/atoms/icons/MinusIcon";
import { PlusIcon } from "../../../general/atoms/icons/PlusIcon";
import { NumberInputProps } from "./types";

export const NumberInput = ({
  value,
  placeholder,
  displayText,
  onLower,
  onRaise,
  disabled,
}: NumberInputProps) => {
  return (
    <div
      className={`text-[#454545] flex flex-col w-full max-w-[447px] cursor-default`}
    >
      <div
        className={`group py-[8px] px-[12px] border border-[#EFEFEF] rounded-[12px] flex items-center gap-[8px] ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      >
        {displayText && (
          <p
            className={`w-full ${
              !value && "text-[#DCD5D5]"
            } text-[16px] font-[500] leading-[30px] ${
              disabled ? "text-gray-400" : ""
            }`}
          >
            {value ? displayText : placeholder}
          </p>
        )}
        <div className="flex items-center gap-[10px]">
          <button
            onClick={() => {
              if (!value || value === 0 || disabled) return;

              onLower?.();
            }}
            className={`${
              !value || value === 0 || disabled
                ? "text-[#BDBDBD]"
                : "text-[#4C4D4C] cursor-pointer"
            } w-[27px] h-[27px] border border-[currentcolor] rounded-full flex items-center justify-center`}
            tabIndex={0}
          >
            <MinusIcon size={13} />
          </button>
          <p className={`min-w-[10px] ${disabled ? "text-gray-400" : ""}`}>
            {value || 0}
          </p>
          <button
            onClick={() => {
              if (disabled) return;
              onRaise?.();
            }}
            className={`${
              disabled ? "text-[#BDBDBD]" : "text-[#4C4D4C] cursor-pointer"
            } w-[27px] h-[27px] border border-[currentcolor] rounded-full flex items-center justify-center`}
            tabIndex={0}
          >
            <PlusIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
