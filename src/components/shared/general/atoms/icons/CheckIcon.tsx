import { IconProps } from "./types";

export const CheckIcon = ({
  stroke = "currentcolor",
  size = 18,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
    >
      <g id="check">
        <path
          id="Vector"
          d="M14.8409 4.62109L6.81174 12.6503L3.16211 9.00066"
          stroke={stroke}
          strokeWidth="1.5707"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
