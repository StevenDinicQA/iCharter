import NavBar from "@/components/home/molecules/NavBar/NavBar";
import { FaqsLayoutProps } from "./types";
import { WidthContainer } from "@/components/shared/general/atoms/WidthContainer";

const FaqsLayout = ({ children }: FaqsLayoutProps) => {
  return (
    <div className="w-full min-h-screen pb-[20px] bg-[#F9F9F9] flex flex-col items-center">
      <div className="w-full mb-[35px] bg-white flex justify-center">
        <NavBar />
      </div>
      <WidthContainer className="h-full px-[10px] lg:px-[90px]">{children}</WidthContainer>
    </div>
  );
};

export default FaqsLayout;