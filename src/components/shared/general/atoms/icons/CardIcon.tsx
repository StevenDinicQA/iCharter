import { IconProps } from "./types";

export function CardIcon({ stroke = "currentColor", size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size + 1}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M21 4.5H3C1.89543 4.5 1 5.39543 1 6.5V18.5C1 19.6046 1.89543 20.5 3 20.5H21C22.1046 20.5 23 19.6046 23 18.5V6.5C23 5.39543 22.1046 4.5 21 4.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 10.5H23"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
