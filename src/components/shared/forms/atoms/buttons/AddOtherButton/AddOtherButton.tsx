import { ChangeEvent, KeyboardEvent, useState } from "react";
import { PlusIcon } from "../../../../general/atoms/icons/PlusIcon";
import { AddOtherButtonProps } from "./types";
import { Button } from "../Button";
import { CheckIcon } from "@/components/shared/general/atoms/icons/CheckIcon";
import { nanoid } from "nanoid";

export const AddOtherBtn = ({ onCreate, customPlaceholder }: AddOtherButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex flex-col gap-[10px]">
      {isOpen && (
        <div className="flex items-center gap-[6px]">
          {/* <CheckBox /> */}
          <input
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                // Disable regular behavior to prevent a "onSubmit"
                // event inside a <form />.
                event.preventDefault();
                event.stopPropagation();

                // Trigger the given call-back (if any) with the
                // current value as an argument.
                onCreate?.({
                  id: nanoid(),
                  label: value,
                  value: value.trim(),
                  deletable: true,
                });
                setValue("");
                setIsOpen(false);
              }
            }}
            type="text"
            className="w-[280px] text-[13px] text-[#454545] py-[10px] px-[17px] border border-[#BDBDBD] rounded-[12px]"
            placeholder={customPlaceholder}
          />
          <Button
            text={<CheckIcon size={18} stroke="white" />}
            iconButton
            onClick={(event) => {
              // Disable regular behavior to prevent a "onSubmit"
              // event inside a <form />.
              event.preventDefault();
              event.stopPropagation();

              onCreate?.({
                id: nanoid(),
                label: value,
                value: value.trim(),
                deletable: true,
              });
              setValue("");
              setIsOpen(false);
            }}
          />
        </div>
      )}
      <div
        className="flex items-center gap-[10px] cursor-pointer"
        onClick={() => {
          if (isOpen) {
            onCreate?.({
              id: nanoid(),
              label: value,
              value: value.trim(),
              deletable: true,
            });
            setValue("");
            return;
          }

          setIsOpen(true);
        }}
      >
        <PlusIcon size={25} />
        <p>Add other</p>
      </div>
    </div>
  );
};
