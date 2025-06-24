import { ReactNode } from "react";

export type CheckBoxProps = {
  label?: ReactNode;
  isChecked?: boolean;
  onClick?: Function;
  labelTop?: boolean;
  disabled?: boolean;
};
