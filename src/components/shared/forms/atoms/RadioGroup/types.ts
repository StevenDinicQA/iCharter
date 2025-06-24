export type RadioGroupProps = {
  selected?: string;
  options: string[];
  groupName: string;
  onChange?: (option: string) => void;
  disabled?: boolean;
};
