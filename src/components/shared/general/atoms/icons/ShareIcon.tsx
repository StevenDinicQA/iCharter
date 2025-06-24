import { IconProps } from "./types";

export function ShareIcon({ stroke = "currentColor", size = 25 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M18.8574 8.5C20.5143 8.5 21.8574 7.15685 21.8574 5.5C21.8574 3.84315 20.5143 2.5 18.8574 2.5C17.2006 2.5 15.8574 3.84315 15.8574 5.5C15.8574 7.15685 17.2006 8.5 18.8574 8.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.85742 15.5C8.51428 15.5 9.85742 14.1569 9.85742 12.5C9.85742 10.8431 8.51428 9.5 6.85742 9.5C5.20057 9.5 3.85742 10.8431 3.85742 12.5C3.85742 14.1569 5.20057 15.5 6.85742 15.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.8574 22.5C20.5143 22.5 21.8574 21.1569 21.8574 19.5C21.8574 17.8431 20.5143 16.5 18.8574 16.5C17.2006 16.5 15.8574 17.8431 15.8574 19.5C15.8574 21.1569 17.2006 22.5 18.8574 22.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.44739 14.0117L16.2774 17.9917"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2674 7.01172L9.44739 10.9917"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
