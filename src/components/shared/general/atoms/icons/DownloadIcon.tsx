import { IconProps } from "./types";

export const DownloadIcon = ({ fill = "#BCBCBC", size = 49 }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 49 49"
      fill="none"
    >
      <g id="download">
        <path
          id="Union"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.5064 23.844L34.4064 15.944L37.2344 18.772L24.5064 31.5L11.7784 18.772L14.6064 15.944L22.5064 23.844V4.5L26.5064 4.5V23.844ZM8.5 38.5H40.5V24.5H44.5V40.5C44.5 41.0304 44.2893 41.5391 43.9142 41.9142C43.5391 42.2893 43.0304 42.5 42.5 42.5H6.5C5.96957 42.5 5.46086 42.2893 5.08579 41.9142C4.71071 41.5391 4.5 41.0304 4.5 40.5V24.5H8.5V38.5Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};
