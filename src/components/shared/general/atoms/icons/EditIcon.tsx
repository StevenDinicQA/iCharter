import { IconProps } from "./types";

export const EditIcon = ({ stroke = "#2D3AAF", size = 25 }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size - 1}
      viewBox="0 0 25 24"
      fill="none"
    >
      <g id="edit">
        <path
          id="Vector"
          d="M20.5 14.66V20C20.5 20.5304 20.2893 21.0391 19.9142 21.4142C19.5391 21.7893 19.0304 22 18.5 22H4.5C3.96957 22 3.46086 21.7893 3.08579 21.4142C2.71071 21.0391 2.5 20.5304 2.5 20V6C2.5 5.46957 2.71071 4.96086 3.08579 4.58579C3.46086 4.21071 3.96957 4 4.5 4H9.84"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M18.5 2L22.5 6L12.5 16H8.5V12L18.5 2Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
