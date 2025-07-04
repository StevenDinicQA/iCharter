import { IconProps } from "./types";

export const DuplicateIcon = ({
  stroke = "currentcolor",
  size = 24,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size + 1}
      viewBox="0 0 24 25"
      fill="none"
    >
      <g id="copy 2">
        <path
          id="Vector"
          d="M20 9.5H11C9.89543 9.5 9 10.3954 9 11.5V20.5C9 21.6046 9.89543 22.5 11 22.5H20C21.1046 22.5 22 21.6046 22 20.5V11.5C22 10.3954 21.1046 9.5 20 9.5Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M5 15.5H4C3.46957 15.5 2.96086 15.2893 2.58579 14.9142C2.21071 14.5391 2 14.0304 2 13.5V4.5C2 3.96957 2.21071 3.46086 2.58579 3.08579C2.96086 2.71071 3.46957 2.5 4 2.5H13C13.5304 2.5 14.0391 2.71071 14.4142 3.08579C14.7893 3.46086 15 3.96957 15 4.5V5.5"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
