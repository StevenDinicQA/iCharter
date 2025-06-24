import { Step } from "../../atoms/Step";
import { StepsProps } from "./types";

export const Steps = ({ currentStep, totalSteps }: StepsProps) => {
  return (
    <div className="w-full flex items-center gap-[5px]">
      {Array.from({ length: totalSteps }, (value, index) => index).map(
        (step) => (
          <div key={step} className="flex items-center gap-[5px]">
            <Step
              number={step + 1}
              isActive={currentStep === step}
              isComplete={currentStep > step}
            />
            {step < totalSteps - 1 && (
              <div
                className={`w-[30px] lg:w-[40px] h-[1px] ${
                  step < currentStep ? "bg-[#2D3AAF]" : "bg-[#7f7f7f]"
                }`}
              ></div>
            )}
          </div>
        )
      )}
    </div>
  );
};
