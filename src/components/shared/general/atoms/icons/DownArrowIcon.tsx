import { IconProps } from "./types";

export const DownArrowIcon = ({ stroke = "#030303", size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size - 6}
      viewBox="0 0 13 7"
      fill="none"
    >
      <path
        id="Vector"
        d="M1.83203 1L6.83203 6L11.832 1"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
