import { IconProps } from "./types";

export const GuestPlusIcon = ({ stroke = "white", size = 18 }: IconProps) => {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size}
        height={size}
        viewBox="0 0 29 28" 
        fill="none"
    >
        <circle cx="14.5142" cy="13.5972" r="12.7731" stroke={stroke} strokeWidth="1.64815"/>
        <path d="M8.91602 14.0005H20.4531" stroke={stroke} strokeWidth="1.64815" strokeLinecap="round"/>
        <path d="M14.918 7.99951V19.5365" stroke={stroke} strokeWidth="1.64815" strokeLinecap="round"/>
    </svg>

  );
};
