import { RequiredIcon } from "@/components/shared/general/atoms/icons/RequiredIcon";
import { FormLayoutProps } from "./types";
import { FormEvent } from "react";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";

export const FormLayout = ({
  formTitle,
  onSubmit,
  disabled,
  isUploading,
  children,
  customNextButtonText,
}: FormLayoutProps) => {
  const routeParams = new URLSearchParams(window.location.search);
  const isEdit = routeParams.get("edit") === "true" || false;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return; //enter form submit disabled
    if (!disabled && !isUploading) {
      onSubmit(event);
    }
  };

  const onButtonClick = (event: any) => {
    if (!disabled && !isUploading) {
      onSubmit(event);
    }
  };

  return (
    <>
      {isUploading && <ScreenLoading />}
      <form
        className="text-[#454545] flex flex-col"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-[28px] font-[500] leading-[18px] mb-[20px]">
          {!isEdit ? "Create Listing" : "Edit Listing"}
        </h2>
        <div className="mb-[12px] py-[28px] lg:py-[32px] px-[12px] lg:px-[52px] bg-white rounded-[14px]">
          <h3 className="text-[28px] font-[500] leading-[15px] mb-[20px]">
            {formTitle}
          </h3>
          <div className="lg:py-[32px] lg:px-[36px] lg:border border-[#EFEFEF] rounded-[12px]">
            {children}
          </div>
        </div>
        <p className="text-[13px] text-[#BABABA] font-[400] flex items-center gap-[11px] mb-[30px] lg:mb-[9px]">
          <RequiredIcon size={11} />
          Necessary for publishing on the marketplace
        </p>
        <button
          onClick={(event) => onButtonClick(event)}
          type="button"
          className={`${
            disabled
              ? "text-[#BDBDBD] bg-[#E2E2E2] cursor-default"
              : "text-white bg-blue-hover"
          } text-[16px] w-[138px] px-[24px] py-[14px]  rounded-[12px] leading-[12px] self-center lg:self-end`}
        >
          {!customNextButtonText ? "Next" : customNextButtonText}
        </button>
      </form>
    </>
  );
};
