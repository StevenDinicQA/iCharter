import { ChangeEventHandler, ReactNode } from "react";

export type FormInputProps = {
  value: string | number | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: string;
  placeholder?: string;
  leftIcon?: ReactNode | null;
  isInvalid?: boolean;
  disabled?: boolean;
  dissableToggle?: boolean;
  withIcon?: boolean;
  iconUrl?: string;
  [props: string]: any;
  inputClassname?: string;
  containerClass?: string;
  testId?:string;
};

export const PASSWORD_INPUT_TYPE = "password";
export const TEXT_INPUT_TYPE = "text";
export const TEXTAREA_INPUT_TYPE = "textarea";
