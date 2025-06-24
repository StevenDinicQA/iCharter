import { ReactElement, ReactNode } from "react";

export type TooltipWrapperProps = {
  message: string | ReactNode;
  children: ReactElement<any, any>;
};
