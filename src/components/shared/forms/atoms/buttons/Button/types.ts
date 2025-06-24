import { MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  text: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  isSecondary?: boolean;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  href?: string;
  className?: string;
  icon?: boolean;
  [prop: string]: any;
  width?: number;
};
