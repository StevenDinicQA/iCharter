import { ReactNode } from "react";

export type CheckListProps = {
  options: CheckOption[];
  selectedOptions: string[];
  setSelected?: Function;
  horizontal?: boolean;
  labelOnTop?: boolean;
  onDelete?: (id: string) => void;
  selectOne?:boolean;
  disabled?: boolean;
};

export type CheckOption = {
  id: string;
  label: ReactNode;
  value: string;
  disabled?: boolean;
  deletable?: boolean;
};
