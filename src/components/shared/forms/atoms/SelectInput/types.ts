import {
  MultiValue,
  OptionsOrGroups,
  PropsValue,
  SingleValue,
} from "react-select";

export interface SelectInputProps<T = string> {
  value: PropsValue<T> | undefined;
  options: OptionsOrGroups<T, any>;
  onChange: (newValue: SingleValue<T> | MultiValue<T>) => void;
  placeholder: string;
  singleValueComponent?: any;
  multiValueComponent?: any;
  optionComponent?: any;
  isMulti?: boolean;
  hideValue?: boolean;
  disabled?: boolean;
  styles?: {};
}

export interface RSOption<U = string> {
  label: string;
  value: U;
}

export interface RSOptionWithPhoto extends RSOption {
  imageUrl: string;
}
