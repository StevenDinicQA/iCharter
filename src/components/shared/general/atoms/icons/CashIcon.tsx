import { IconProps } from "./types";

export function CashIcon({ stroke = "currentColor", size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size + 1}
      viewBox="0 0 24 25"
      fill="none"
    >
      <g clipPath="url(#clip0_1423_41188)">
        <path
          d="M12 1.5V23.5"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 5.5H9.5C8.57174 5.5 7.6815 5.86875 7.02513 6.52513C6.36875 7.1815 6 8.07174 6 9C6 9.92826 6.36875 10.8185 7.02513 11.4749C7.6815 12.1313 8.57174 12.5 9.5 12.5H14.5C15.4283 12.5 16.3185 12.8687 16.9749 13.5251C17.6313 14.1815 18 15.0717 18 16C18 16.9283 17.6313 17.8185 16.9749 18.4749C16.3185 19.1313 15.4283 19.5 14.5 19.5H6"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1423_41188">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
