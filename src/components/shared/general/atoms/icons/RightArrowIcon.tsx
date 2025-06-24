import { IconProps } from "./types";

export const RightArrowIcon = ({ stroke = "currentcolor", size = 26 }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 8 14" fill="none">
        <path d="M1 13L7 7L1 1" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
