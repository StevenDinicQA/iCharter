import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { TimeInputProps } from "./types";

export const TimeInput = ({ onChange, value, disabled }: TimeInputProps) => {
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");
  const [isPM, setIsPM] = useState<boolean>(false);

  useEffect(() => {
    onChange?.({ hour: Number(hour), minute: Number(minute), isPM });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute, isPM]);

  useEffect(() => {
    if (value) {
      setHour(value.hour.toString());
      setMinute(value.minute.toString());
      setIsPM(value.isPM);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`text-[#454545] flex flex-col w-full`}>
      <div className="group flex items-center gap-[8px]">
        <div className="flex items-center gap-[3px]">
          <input
            value={hour}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (
                Number(event.target.value) > 12 ||
                Number(event.target.value) < 0 ||
                disabled
              ) {
                if (!event.target.value) {
                  setHour("");
                }
                return;
              }

              setHour(event.target.value);
            }}
            type="number"
            placeholder="00"
            className={`w-[94px] h-[48px] border border-[#EFEFEF] rounded-[12px] outline-none text-center ${
              disabled ? "cursor-not-allowed text-gray-400" : "cursor-text"
            }`}
            disabled={disabled}
          />
          <p>:</p>
          <input
            value={minute}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (
                Number(event.target.value) > 59 ||
                Number(event.target.value) < 0 ||
                disabled
              ) {
                if (!event.target.value) {
                  setHour("");
                }
                return;
              }

              setMinute(event.target.value);
            }}
            type="number"
            placeholder="00"
            className={`w-[94px] h-[48px] border border-[#EFEFEF] rounded-[12px] outline-none text-center ${
              disabled ? "cursor-not-allowed text-gray-400" : "cursor-text"
            }`}
            disabled={disabled}
          />
        </div>
        <div
          onClick={() => {
            if(disabled) return;
            setIsPM(!isPM);
          }}
          tabIndex={0}
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Enter" && !disabled) {
              setIsPM((current) => !current);
            }
          }}
          className={`py-[9px] px-[8px] bg-[#F9F9F9] rounded-[12px] flex items-center cursor-pointer ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <p
            className={`select-none text-[16px] font-[500] leading-[15px] py-[9px] px-[8px] rounded-[6px] ${
              !isPM ? "text-[#2D3AAF] bg-[#E0E2F0]" : "text-[#DCD5D5]"
            }`}
          >
            AM
          </p>
          <p
            className={`select-none text-[16px] font-[500] leading-[15px] py-[9px] px-[8px] rounded-[6px] ${
              isPM ? "text-[#2D3AAF] bg-[#E0E2F0]" : "text-[#DCD5D5]"
            }`}
          >
            PM
          </p>
        </div>
      </div>
    </div>
  );
};
