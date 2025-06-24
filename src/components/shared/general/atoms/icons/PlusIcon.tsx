import { IconProps } from "./types";

export const PlusIcon = ({ stroke = "currentcolor", size = 26 }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
    >
      <g id="plus">
        <path
          id="Vector"
          d="M13.0977 5.61035V20.3066"
          stroke={stroke}
          strokeWidth="2.09946"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M5.75 12.958H20.4462"
          stroke={stroke}
          strokeWidth="2.09946"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
