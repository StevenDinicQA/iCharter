import { SwitchProps } from "./types";

export const Switch = ({ active, onChange, htmlFor, testId }: SwitchProps) => {
  return (
    <div className="flex" test-id={testId}>
      <label
        htmlFor={htmlFor}
        className={`w-[40px] h-[24px] p-[2px] ${
          active ? "bg-green-500" : "bg-gray-200"
        } rounded-full flex items-center justify-start cursor-pointer`}
      >
        <div
          className={`w-[20px] h-[20px] rounded-full bg-white ${
            active && "transform translate-x-[16px]"
          } transition`}
        ></div>
      </label>
      <input
        checked={active}
        type="checkbox"
        id={htmlFor}
        className="hidden"
        onChange={() => {
          onChange?.();
        }}
      />
    </div>
  );
};
