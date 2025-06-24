import { IconProps } from "./types";

export const VectorBotIcon = ({ stroke = "currentcolor", size = 24 }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 10 5" fill="none">
        <path d="M3.58579 3.58579L0 0H10L6.41421 3.58579C5.63316 4.36684 4.36684 4.36684 3.58579 3.58579Z" fill={stroke}/>
    </svg>
  );
};
