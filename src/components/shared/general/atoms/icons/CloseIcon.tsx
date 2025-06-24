import { IconProps } from "./types";

export const CloseIcon = ({
  stroke = "currentcolor",
  size = 25,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <g id="x">
        <path
          id="Vector"
          d="M18.5 6.30078L6.5 18.3008"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M6.5 6.30078L18.5 18.3008"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
