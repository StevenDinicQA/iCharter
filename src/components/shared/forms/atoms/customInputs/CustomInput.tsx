"use client";

import React from "react";
type Props = {
  label?: string;
  labelProps?: { [prop: string]: any };
  placeholder?: string | null;
  helperText?: string | null;
  type: string;
  value?: any;
  setValue?: Function | null;
  required?: boolean;
  [prop: string]: any;
};

function CustomInput({
  label,
  labelProps,
  type,
  value,
  setValue,
  required,
  placeholder,
  helperText,
  ...props
}: Props) {
  const baseStyle = `w-full border rounded-lg border-black py-2 px-4 mb-4 leading-tight outline-none bg-white`;

  return (
    <div className="flex flex-col w-full">
      <label className="text-base text-[#737473]" {...labelProps}>
        {label}
        {required && "*"}
      </label>

      <input
        placeholder={placeholder ? placeholder : ""}
        className={baseStyle}
        type={type}
        value={value}
        onChange={(e) => (setValue ? setValue(e.target.value) : null)}
        required={required}
        {...props}
      />
      {helperText && (
        <p className="text-[#454545] text-[11px] opacity-50">{helperText}</p>
      )}
    </div>
  );
}

export default CustomInput;
