import { IconProps } from "./types";

export const EmailIcon = ({
  stroke = "currentcolor",
  size = 18,
}: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 25 25" fill="none">
        <path d="M4.92139 4.63281H20.9214C22.0214 4.63281 22.9214 5.53281 22.9214 6.63281V18.6328C22.9214 19.7328 22.0214 20.6328 20.9214 20.6328H4.92139C3.82139 20.6328 2.92139 19.7328 2.92139 18.6328V6.63281C2.92139 5.53281 3.82139 4.63281 4.92139 4.63281Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22.9214 6.63281L12.9214 13.6328L2.92139 6.63281" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
