import { SelectInputProps } from "./types";
import Select from "react-select";

export function SelectInput<T>({
  value,
  options,
  onChange,
  placeholder,
  singleValueComponent,
  multiValueComponent,
  optionComponent,
  isMulti,
  hideValue,
  disabled,
  styles,
}: SelectInputProps<T>) {
  return (
    <Select
      test-id={value}
      value={value}
      isMulti={isMulti}
      controlShouldRenderValue={!hideValue}
      onChange={onChange}
      isDisabled={disabled}
      components={{
        ...(singleValueComponent && { SingleValue: singleValueComponent }),
        ...(multiValueComponent && { MutiValue: multiValueComponent }),
        ...(optionComponent && { Option: optionComponent }),
      }}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          padding: "4px 12px",
          borderRadius: "12px",
          borderColor: "#EFEFEF",
          ...styles,
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          fontSize: "16px",
          fontWeight: "500",
          color: "#DCD5D5",
          lineHeight: "15px",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderRadius: "12px",
          padding: "10px",
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          padding: "15px",
          borderRadius: "12px",
        }),
      }}
      placeholder={placeholder}
      options={options}
    />
  );
}
