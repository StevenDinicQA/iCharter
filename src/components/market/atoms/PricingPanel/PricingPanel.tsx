import { PricingPanelProps } from "./types";
import { ICHARTER_SERVICE_PORCENTAGE } from "@/utils/constants";

export function PricingPanel({ policy }: PricingPanelProps) {
  return (
    <div className="text-[16px] ext-[#454545]">
      <h4 className="font-[500]">Book with 15% deposit, pay rest to captain</h4>
      <p className="font-[400] mb-[20px]">
        When the captain confirms your trip, iCharter charges your credit card a&nbsp; 
        {ICHARTER_SERVICE_PORCENTAGE}% deposit to guarantee your reservation.
      </p>
      <h4 className="font-[500]">Cancelation policy</h4>
      <p className="font-[400]">{policy}</p>
    </div>
  );
}
