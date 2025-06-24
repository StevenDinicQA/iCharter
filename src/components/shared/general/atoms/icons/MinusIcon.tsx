import { IconProps } from "./types";

export const MinusIcon = ({
  stroke = "currentcolor",
  size = 13,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size - 11}
      viewBox="0 0 13 2"
      fill="none"
    >
      <path
        d="M1.24219 1.00879H11.9552"
        stroke={stroke}
        strokeWidth="1.64815"
        strokeLinecap="round"
      />
    </svg>
  );
};
