import { FormEventHandler, ReactNode } from "react";

export type FormLayoutProps = {
  formTitle: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  disabled?: boolean;
  isUploading?: boolean;
  children?: ReactNode;
  customNextButtonText?: string;
};
