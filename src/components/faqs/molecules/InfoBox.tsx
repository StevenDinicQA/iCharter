import { useState } from 'react';
import { DownArrowIcon } from "@/components/shared/general/atoms/icons/DownArrowIcon";
import { RightArrowIcon } from "@/components/shared/general/atoms/icons/RightArrowIcon";
import { useMediaQuery } from "@mui/material";

interface CustomInfoBoxProps {
    title: string;
    text: string;
}

const InfoBox: React.FC<CustomInfoBoxProps> = ({ title, text }) => {
    const isNotResponsive = useMediaQuery("(min-width: 1024px)");
    const isSmallestDevice = useMediaQuery("(max-width: 320px)");
    const isTablet = useMediaQuery("(min-width: 768px)");
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent((prevShowContent) => !prevShowContent);
  };

  return (
        <div onClick={toggleContent} className={`bg-white cursor-pointer min-h-[58px] px-[12px] md:px-[23px] py-[8px] border border-[#EFEFEF] rounded-xl ${isSmallestDevice && 'w-[300px]'} ${isTablet && 'w-[350px]'} ${isNotResponsive && 'w-[480px]'} `}>
        <div className="flex justify-between items-center gap-2 md:gap-0">
            <div className="font-medium text-base pt-2">
                {title}
            </div>
            <div className={`${showContent ? 'rotate-180 pb-2' : 'pt-2'}`} >
                <DownArrowIcon size={15} fill="black" stroke="black"/>
            </div>
            </div>
        {showContent && (
            <div className="w-full min-h-[100px] font-normal text-base mt-[26px]">
                { text }
            </div>
        )}
    </div>
  );
};

export default InfoBox;