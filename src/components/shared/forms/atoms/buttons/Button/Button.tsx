import Link from "next/link";
import { ButtonProps } from "./types";

export const Button = ({
  text,
  onClick,
  isSecondary,
  disabled,
  iconButton,
  href,
  size = "md",
  className = "",
  width,
  ...props
}: ButtonProps) => {
  const determineStyles = () => {
    let baseStyles = iconButton
      ? ""
      : `${
          size === "md"
            ? "text-[16px] py-[14px] px-[24px]"
            : size === "sm"
            ? "text-[13px] py-[10px] px-[14px]"
            : size === "xs"
            ? ""
            : "text-[24px] py-[14px] px-[24px]"
        } font-[500] leading-[18px] rounded-[12px]`;

    if (iconButton) {
      baseStyles = `${baseStyles} min-w-[40px] min-h-[40px] py-[0px] px-[0px] rounded-full flex justify-center items-center`;
    }

    if (disabled) {
      baseStyles = `${baseStyles} text-[#7575759e] bg-[#E8E8E8]`;
    }

    if (isSecondary && !disabled) {
      baseStyles = `${baseStyles} text-[#454545] bg-[#E2E2E2]`;
    }

    if (!isSecondary && !disabled) {
      baseStyles = `${baseStyles} text-white bg-[#2D3AAF]`;
    }

    return `${baseStyles} ${className}`;
  };

  return href ? (
    <Link
      href={href}
      onClick={(event) => {
        if (disabled) return;

        onClick?.(event);
      }}
      className={determineStyles()}
      {...props}
    >
      {text}
    </Link>
  ) : (
    <button
      style={{ width: `${width}px` }}
      onClick={(event) => {
        if (disabled) return;

        onClick?.(event);
      }}
      disabled={disabled}
      className={determineStyles()}
      {...props}
    >
      {text}
    </button>
  );
};
