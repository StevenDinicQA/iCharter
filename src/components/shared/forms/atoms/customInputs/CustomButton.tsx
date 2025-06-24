import React, { MouseEventHandler } from "react";

type Props = {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string | null | undefined;
  id?: string;
};

function CustomButton({ title, onClick, className, id }: Props) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`bg-[#FFF] flex items-center h-[34px] py-3 px-3 transition-all duration-300  rounded-xl ${
        className ? className : ""
      }`}
    >
      <p className="text-[#2E3BB0] text-sm font-medium">{title}</p>
    </button>
  );
}

export default CustomButton;
