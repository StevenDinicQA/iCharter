import { CheckBox } from "../CheckBox";
import { CheckListProps } from "./type";
import { DeleteIcon } from "@/components/shared/general/atoms/icons/DeleteIcon";

export const CheckList = ({
  options,
  selectedOptions,
  setSelected,
  horizontal,
  labelOnTop,
  onDelete,
  selectOne,
  disabled,
}: CheckListProps) => {
  const handleCheckBoxClick = (option: string) => {
    // Only try to update the checkbox state if a
    // `setSelected` function is passed as a prop
    if (!setSelected) return;

    if(selectOne){
      setSelected([option]);
    } else {
      const optionIndex = selectedOptions.indexOf(option);
  
      if (optionIndex === -1) {
        setSelected([...selectedOptions, option]);
        return;
      }
  
      setSelected(
        selectedOptions.filter((innerOption) => option !== innerOption)
      );
    }

  };

  const handleDeselect = (id: string, option: string) => {
    // Only try to update the checkbox state if a
    // `setSelected` function is passed as a prop
    if (!setSelected) return;

    setSelected(
      selectedOptions.filter((innerOption) => option !== innerOption)
    );

    onDelete?.(id);
  };

  return (
    <div>
      <div
        className={`flex ${
          horizontal ? "flex-row gap-[21px]" : "flex-col gap-[14px]"
        }`}
      >
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-[5px]">
            <CheckBox
              label={option.label}
              isChecked={selectedOptions.includes(option.value)}
              disabled={option.disabled || disabled}
              onClick={() => {
                handleCheckBoxClick(option.value);
              }}
              labelTop={labelOnTop}
            />
            {option.deletable && (
              <button
                className="text-[#cccccc] hover:text-red-500 cursor-pointer transition"
                onClick={(event) => {
                  event.preventDefault();

                  handleDeselect(option.id, option.value);
                }}
              >
                <DeleteIcon size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
