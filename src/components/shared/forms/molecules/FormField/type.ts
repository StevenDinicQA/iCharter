import { ReactNode } from "react";

export type FormFieldProps = {
  label?: string;
  subLabel?: string | ReactNode;
  constrainsLabel?: string;
  required?: boolean;
  className?: string;
  children?: ReactNode;
  errorMessage?: string;
  collapsable?: boolean;
  labelInputGap?: number;
};
