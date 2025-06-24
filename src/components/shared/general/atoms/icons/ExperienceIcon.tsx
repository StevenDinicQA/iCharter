import { IconProps } from "./types";

export const ExperienceIcon = ({ stroke = "white", size = 18 }: IconProps) => {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size}
        height={size} 
        viewBox="0 0 24 25" 
        fill="none"
    >
        <path d="M12 22.7925C17.5228 22.7925 22 18.3153 22 12.7925C22 7.26963 17.5228 2.79248 12 2.79248C6.47715 2.79248 2 7.26963 2 12.7925C2 18.3153 6.47715 22.7925 12 22.7925Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.24 8.55225L14.12 14.9122L7.76001 17.0322L9.88001 10.6722L16.24 8.55225Z" stroke={stroke}strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  );
};
