import { StepStatusProps } from "./types";

export const StepStatus = ({ isActive = false }: StepStatusProps) => {
  return (
    <div
      className={`w-[62px] h-[8px] ${
        isActive ? "bg-blue-hover" : "bg-slate-300"
      } rounded-full`}
    ></div>
  );
};
