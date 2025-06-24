import { IconProps } from "./types";

export const HelpIcon = ({ stroke = "#454545", size = 25 }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size - 1}
      viewBox="0 0 25 24"
      fill="none"
    >
      <g id="help-circle" clipPath="url(#clip0_1058_7603)">
        <path
          id="Vector"
          d="M12.5996 22C18.1225 22 22.5996 17.5228 22.5996 12C22.5996 6.47715 18.1225 2 12.5996 2C7.07676 2 2.59961 6.47715 2.59961 12C2.59961 17.5228 7.07676 22 12.5996 22Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M9.68945 8.99959C9.92456 8.33126 10.3886 7.7677 10.9994 7.40873C11.6102 7.04975 12.3283 6.91853 13.0266 7.0383C13.7249 7.15808 14.3583 7.52112 14.8145 8.06312C15.2708 8.60512 15.5205 9.29112 15.5195 9.99959C15.5195 11.9996 12.5195 12.9996 12.5195 12.9996"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M12.5996 17H12.6096"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1058_7603">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.599609)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
