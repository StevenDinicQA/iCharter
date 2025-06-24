import React, { useState } from 'react';
import { VectorBotIcon } from "@/components/shared/general/atoms/icons/VectorBotIcon";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  tooltipStyles?: string;
  wrapWords?: boolean;
  testId?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, tooltipStyles, wrapWords = false, testId }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div test-id={testId} className="relative inline-block mb-2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
        {isTooltipVisible && (
            <div>
                <div className={`absolute bg-[#454545] text-white font-medium rounded px-2 py-1 text-xs top-[calc(-136%)] left-1/2 transform translate-x-[-50%] ${wrapWords
                 ? '' : 'whitespace-nowrap'} ${tooltipStyles}`}>
                    {text}
                </div>
                <div className="absolute top-[-50%] left-1/2 transform translate-x-[-50%] whitespace-nowrap">
                    <VectorBotIcon size={10}/>
                </div>
            </div> 
        )}
    </div>
  );
};

export default Tooltip;