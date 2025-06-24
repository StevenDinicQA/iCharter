import { CheckBox } from "@/components/shared/forms/atoms/CheckBox";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import { Modal } from "@/components/shared/general/molecules/Modal";
import { useEffect, useState } from "react";
import { OptionsModalProps } from "./types";

/**
 * Modal for displaying all the Fishing Techniques that are currently present
 * in the listings.
 * @returns
 */
export function OptionsModal({
  title,
  isVisible,
  onClose,
  selectedOptions,
  setSelected,
  getOptions,
  onError,
}: OptionsModalProps) {
  const [options, setOptions] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const fetchOptions = async () => {
      const result = await getOptions?.();

      if (!result) {
        onError?.();
        return;
      }

      setOptions(result);
    };

    fetchOptions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxClick = (item: string) => {
    const itemIndex = selectedOptions.findIndex(
      (technique) => technique === item
    );

    itemIndex === -1
      ? setSelected([...selectedOptions, item])
      : setSelected(
          (() => {
            const newArray = [...selectedOptions];
            newArray.splice(itemIndex, 1);

            return newArray;
          })()
        );
  };

  return (
    <Modal isVisible={isVisible} onOutsideClick={onClose}>
      <div className="p-[30px]">
        <div className="mb-[20px] flex items-center justify-between">
          <h2 className="text-[20px] font-[500]">{title}</h2>
          <div className="cursor-pointer" onClick={onClose}>
            <CloseIcon size={24} />
          </div>
        </div>
        {!options && <p>Loading...</p>}
        {options && options.length === 0 && (
          <p>Oops, there seems to be none options available!</p>
        )}
        <div className="grid grid-cols-2 gap-[14px]">
          {options &&
            options.map((option) => (
              <CheckBox
                key={option}
                label={option}
                onClick={() => {
                  handleCheckboxClick(option);
                }}
                isChecked={selectedOptions.includes(option)}
              />
            ))}
        </div>
      </div>
    </Modal>
  );
}
