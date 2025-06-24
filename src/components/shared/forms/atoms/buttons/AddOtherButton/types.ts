import { CheckOption } from "../../CheckList/type";

export type AddOtherButtonProps = {
  onCreate?: (value: CheckOption) => void;
  customPlaceholder?: string;
};
