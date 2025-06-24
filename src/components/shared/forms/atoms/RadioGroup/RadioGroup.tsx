import { MouseEvent } from "react";
import { RadioGroupProps } from "./types";
import { nanoid } from "nanoid";

export const RadioGroup = ({
  selected,
  options,
  groupName,
  onChange,
  disabled,
}: RadioGroupProps) => {
  return (
    <div>
      <div className="flex gap-[14px]">
        {options.map((option) => {
          return (
            <div key={nanoid()} className="w-full lg:w-min">
              <label
                htmlFor={option}
                className={`text-[16px] font-[500] leading-[15px] w-full block text-center py-[16px] lg:px-[83px] border border-[#737473] rounded-[12px] ${
                  selected === option
                    ? "text-white bg-[#2D3AAF] border-[transparent]"
                    : "text-[#454545]"
                } cursor-pointer ${
                  disabled
                    ? "cursor-not-allowed text-gray-400 bg-gray-100 border-gray-300"
                    : ""
                }`}
                onClick={(event: MouseEvent<HTMLLabelElement>) => {
                  if(!disabled){
                    onChange?.((event.target as HTMLLabelElement).textContent!);
                  }
                }}
              >
                {option}
              </label>
              <input
                type="radio"
                name={groupName}
                id={option}
                className="hidden"
                checked={selected === option}
                readOnly
                disabled={disabled}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
