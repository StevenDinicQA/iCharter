"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CharterBidListView } from "@/components/market/molecules/CharterBidListview";
import apiService from "@/services/apiService";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";

export default function CharterBidsScreen() {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [acceptedCount, setAcceptedCount] = useState<number>(0);
  const [rowData, setRowData] = useState<any>([]);
  const { user } = useAuthContext();


  async function getBids(userId: string) {
    setIsPageLoading(true);
    const { data, error: getBidsError } = await apiService.get(
      `bid/user/${userId}`
    );

    if (getBidsError) {
      // setCharterProfileData(null);
      return;
    }

    setRowData(data);
    setIsPageLoading(false);

    if(data && data.length > 0){

      const accepteds = data.filter((p: any) => p.status === "accepted");
      if(accepteds){
        setAcceptedCount(accepteds.length);
      }
    }

  }


  useEffect(() => {
    if(user && rowData.length === 0){
      getBids(user?.id)
    }
  }, [])

  return (
    <section className="p-[30px] lg:p-[45px] bg-white rounded-[12px] flex flex-col gap-[45px]">
      {/* {isPageLoading && <ScreenLoading />} */}
      <h2 className="text-[28px] font-[700]">My iCharterBids</h2>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex flex-row w-[300px]">
              <span className="mr-5 font-[700]">{acceptedCount}/3</span>
              <p>iCharterBids 2023</p>
            </div>
            <div className="h-[15px] bg-[#E0E2F0] rounded-full mt-2 max-w-[270px]"></div>
          </div>

          {/* <div className="hidden lg:flex ml-5 w-[400px] h-12 px-[17px] py-3 bg-white rounded-xl border border-zinc-100 gap-[18px]">
            <Image
              width={24}
              height={24}
              src="/svgs/search_icon.svg"
              alt="Search icon"
            />
            <input
              className="w-full outline-none text-base font-medium leading-3"
              placeholder="Search Trip"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div> */}
        </div>
        <div className={`${!(rowData.length > 0) ? "block" : "hidden"} flex justify-center items-center mt-20 flex-col`}>
          {isPageLoading && <ScreenLoading />}
          <Image
            src="/svgs/empty_bid.svg"
            width={179}
            height={116}
            alt="A fish being fished"
          />
          <span className="text-[18px] mt-5 text-center">{"You don't have any iCharterbids yet!"}</span>
          <span className="text-[16px] text-[#BDBDBD]">
            Make some bids on the marketplace
          </span>
        </div>
      </div>
      <div className={`${(rowData.length > 0) ? "block" : "hidden"}`}>
        <CharterBidListView rows={rowData}></CharterBidListView>
      </div>
    </section>
  );
}
