export interface OptionsModalProps {
  title: string;
  isVisible?: boolean;
  onClose?: () => void;
  selectedOptions: string[];
  setSelected: (arg: string[]) => void;
  getOptions?: () => Promise<string[] | null>;
  onError?: Function;
}
