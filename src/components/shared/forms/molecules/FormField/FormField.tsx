import { MouseEventHandler, useState } from "react";
import { RequiredIcon } from "../../../general/atoms/icons/RequiredIcon";
import { FormFieldProps } from "./type";
import { DownArrowIcon } from "@/components/shared/general/atoms/icons/DownArrowIcon";

/**
 * A high-order component that let you add the style of a form field to
 * any other component. It was made to be used with components in the
 * `shared/forms` atoms.
 */
export const FormField = ({
  label,
  subLabel,
  constrainsLabel,
  required,
  className,
  children,
  errorMessage,
  collapsable = false,
  labelInputGap,
}: FormFieldProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsable);

  const handleCollapseToggle: MouseEventHandler<HTMLDivElement> = () => {
    if (collapsable) {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <div
      className={`text-[#454545] w-full flex flex-col select-none ${className} border-y border-[#EFEFEF]`}
    >
      <div
        className={`flex items-center justify-between my-5`}
        onClick={handleCollapseToggle}
      >
        {label && (
          <div className="flex flex-col justify-center gap-[4px]">
            <label
              htmlFor={label}
              className="text-[20px] font-[500] leading-[25px] lg:leading-[15px] flex items-start gap-[2px]"
            >
              {label}
              {required && <RequiredIcon size={11} />}
            </label>
            {subLabel && (
              <p className="text-[13px] font-[400] leading-[18px]">
                {subLabel}
              </p>
            )}
          </div>
        )}
        {collapsable && (
          <div className={`${!isCollapsed && "rotate-[-90deg]"}`}>
            <DownArrowIcon size={14} />
          </div>
        )}
      </div>
      {!isCollapsed && (
        <>
          <div>{children}</div>
          <div className="flex items-center justify-between">
            <small className="text-[11px] min-h-[15px] font-[400] text-red-500 block leading-[15px] mt-[5px]">
              {errorMessage && errorMessage}
            </small>
            {constrainsLabel && (
              <small className="text-[#A2A2A2] text-[11px] font-[400] mt-[8px] self-end">
                {constrainsLabel}
              </small>
            )}
          </div>
        </>
      )}
    </div>
  );
};
