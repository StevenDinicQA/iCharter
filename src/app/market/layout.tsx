import NavBar from "@/components/home/molecules/NavBar/NavBar";
import { MarketLayoutProps } from "./types";

const MarketLayout = ({ children }: MarketLayoutProps) => {
  return (
    <div className="w-full bg-[#F9F9F9] flex flex-col items-center">
      <div className="w-full bg-[#2E3BAF] flex justify-center">
        <NavBar />
      </div>
      <div className="w-full flex flex-col items-center">{children}</div>
    </div>
  );
};

export default MarketLayout;
