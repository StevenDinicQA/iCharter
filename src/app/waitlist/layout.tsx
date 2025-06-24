import NavBar from "@/components/home/molecules/NavBar/NavBar";
import { WaitlistLayoutProps } from './types';
import { WidthContainer } from "@/components/shared/general/atoms/WidthContainer";

const WaitlistLayout = ({ children }: WaitlistLayoutProps) => {
  return (
    <div className="w-full min-h-screen pb-[20px] bg-[#F9F9F9] flex flex-col items-center">
      <WidthContainer className="h-full px-[20px] lg:px-[90px]">{children}</WidthContainer>
    </div>
  );
};

export default WaitlistLayout;