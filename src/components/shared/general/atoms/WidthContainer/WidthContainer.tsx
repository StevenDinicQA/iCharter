import { WidthContainerProps } from "./types";

export const WidthContainer = ({
  className = '',
  children,
}: WidthContainerProps) => {
  return <div className={`${className}`}>{children}</div>;
};
