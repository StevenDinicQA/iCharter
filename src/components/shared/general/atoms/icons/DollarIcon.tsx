import { IconProps } from "./types";

export const DollarIcon = ({
  stroke = "currentcolor",
  size = 16,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g id="dollar-sign" clipPath="url(#clip0_1750_11099)">
        <path
          id="Vector"
          d="M8 0.666992V15.3337"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M11.3333 3.33301H6.33333C5.71449 3.33301 5.121 3.57884 4.68342 4.01643C4.24583 4.45401 4 5.0475 4 5.66634C4 6.28518 4.24583 6.87867 4.68342 7.31626C5.121 7.75384 5.71449 7.99967 6.33333 7.99967H9.66667C10.2855 7.99967 10.879 8.24551 11.3166 8.68309C11.7542 9.12068 12 9.71417 12 10.333C12 10.9518 11.7542 11.5453 11.3166 11.9829C10.879 12.4205 10.2855 12.6663 9.66667 12.6663H4"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1750_11099">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
