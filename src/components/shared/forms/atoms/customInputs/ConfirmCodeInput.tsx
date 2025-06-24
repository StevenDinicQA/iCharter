import React from "react";

type Props = {
  value: string;
  inputRef: React.MutableRefObject<any>;
  onClick?: Function;
};

function ConfirmCodeInput({ value, inputRef, onClick }: Props) {
  return (
    <input
      value={value}
      className="w-10 h-14 rounded-md shadow-sm text-lg text-center font-medium  stroke-[#EAE8E1] bg-[#E6E6E6] caret-transparent"
      ref={inputRef}
      maxLength={1}
      onFocus={() => onClick?.()}
      onClick={() => onClick?.()}
      required
    />
  );
}

export default ConfirmCodeInput;
