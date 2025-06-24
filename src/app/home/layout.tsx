import { WidthContainer } from "@/components/shared/general/atoms/WidthContainer";
import NavBar from "@/components/home/molecules/NavBar/NavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col items-center">
      <NavBar />
      <div className="w-full max-w-[1200px]">{children}</div>
    </div>
  );
};

export default DashboardLayout;
