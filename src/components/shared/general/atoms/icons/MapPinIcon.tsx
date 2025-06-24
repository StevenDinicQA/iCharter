import { IconProps } from "./types";

export const MapPinIcon = ({
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
      <g id="map-pin" clipPath="url(#clip0_2407_38833)">
        <path
          id="Vector"
          d="M21.905 10.125C21.905 17.125 12.905 23.125 12.905 23.125C12.905 23.125 3.90503 17.125 3.90503 10.125C3.90503 7.73805 4.85324 5.44887 6.54107 3.76104C8.2289 2.07321 10.5181 1.125 12.905 1.125C15.292 1.125 17.5812 2.07321 19.269 3.76104C20.9568 5.44887 21.905 7.73805 21.905 10.125Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M12.905 13.125C14.5619 13.125 15.905 11.7819 15.905 10.125C15.905 8.46815 14.5619 7.125 12.905 7.125C11.2482 7.125 9.90503 8.46815 9.90503 10.125C9.90503 11.7819 11.2482 13.125 12.905 13.125Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2407_38833">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.905029 0.125)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
