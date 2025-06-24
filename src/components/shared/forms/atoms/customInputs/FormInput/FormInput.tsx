import { MouseEvent, useState } from "react";
import {
  FormInputProps,
  PASSWORD_INPUT_TYPE,
  TEXTAREA_INPUT_TYPE,
  TEXT_INPUT_TYPE,
} from "./types";
import { EyeIcon } from "@/components/shared/general/atoms/icons/EyeIcon";
import { EyeOffIcon } from "@/components/shared/general/atoms/icons/EyeOffIcon";
import Image from "next/image";

export const FormInput = ({
  value,
  onChange,
  type = TEXT_INPUT_TYPE,
  placeholder,
  leftIcon,
  isInvalid,
  dissableToggle,
  disabled,
  withIcon,
  iconUrl,
  inputClassname = '',
  containerClass = '',
  testId = '',
  ...props
}: FormInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);

  function togglePasswordView(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    inputType === PASSWORD_INPUT_TYPE
      ? setInputType(TEXT_INPUT_TYPE)
      : setInputType(PASSWORD_INPUT_TYPE);
  }

  const inputClasses = `group py-3 px-2 w-full border bg-white ${
    isFocused ? "border-[#2D3AAF]" : "border-[#EFEFEF]"
  } rounded-[12px] flex items-center gap-[8px] ${isInvalid && "border-red-500"} ${
    disabled ? "bg-gray-100 cursor-not-allowed" : ""
  } ${inputClassname}`;

  const inputTextClasses = `font-medium text-sm flex-1 text-start placeholder:text-[#CCC5C5] outline-none ${
    disabled ? "text-gray-400" : ""
  }`;

  return (
    <div className={`relative ${containerClass} flex-1 w-full`}>
      <div
        className={inputClasses}
      >
        {!withIcon
        ? null
        : (<div className="w-[21px] h-[21px] flex items-center justify-center">
            <Image src={!iconUrl ? `` : iconUrl} width={21} height={21} alt="social-media-logo"/>
          </div>)
        }
        {leftIcon}
        {inputType !== TEXTAREA_INPUT_TYPE ? (
          <input
            test-id={testId}
            disabled={disabled}
            value={value}
            onChange={onChange}
            type={inputType}
            placeholder={placeholder}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            onWheel={(event) => {
              (event.target as HTMLInputElement).blur();
            }}
            className={inputTextClasses}
            {...props}
          />
        ) : (
          <textarea
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            test-id={testId}
            className="w-full text-[16px] placeholder:text-[#CCC5C5] font-[500] leading-[30px] h-[132px] outline-none"
          ></textarea>
        )}
        {type === PASSWORD_INPUT_TYPE && !dissableToggle && (
          <button
            className={`cursor-pointer ${disabled ? "pointer-events-none" : ""}`}
            type="button"
            onClick={togglePasswordView}
          >
            {inputType === PASSWORD_INPUT_TYPE ? (
              <EyeIcon size={24} />
            ) : (
              <EyeOffIcon size={24} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
