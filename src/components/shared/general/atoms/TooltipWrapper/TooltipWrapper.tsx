import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TooltipWrapperProps } from "./types";

export const TooltipWrapper = ({ message, children }: TooltipWrapperProps) => {
  const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      color: "black",
      backgroundColor: "#F0F7FE",
      borderRadius: "12px",
      padding: "10px 16px",
      width: 271,
      fontSize: "11px",
      lineHeight: "18px",
    },
  }));

  return <CustomTooltip title={message}>{children}</CustomTooltip>;
};
