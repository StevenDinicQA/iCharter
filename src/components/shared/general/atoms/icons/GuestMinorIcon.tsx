import { IconProps } from "./types";

export const GuestMinorIcon = ({ stroke = "white", size = 18 }: IconProps) => {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 28 28" 
        fill="none"
    >
        <circle cx="13.5972" cy="13.5972" r="12.7731" stroke={stroke} strokeWidth="1.64815"/>
        <path d="M8.24121 14.0093H18.9542" stroke={stroke} strokeWidth="1.64815" strokeLinecap="round"/>
    </svg>
  );
};
